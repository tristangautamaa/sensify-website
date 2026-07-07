// API-compatible implementation of the React Bits PixelTrail component.
// Pointer movement is written into a trail texture and rendered as a grid of
// hard-edged pixels through a fullscreen shader, optionally fused together by
// an SVG gooey filter.
//
// The trail texture is implemented inline (adapted from drei's TrailTexture)
// rather than via drei's useTrailTexture hook: the hook's internal update
// loop and the touch-receiving instance can diverge under React StrictMode's
// double-mount, which left the texture permanently black. Owning the instance
// keeps addTouch, update() and the sampled texture on one object.
import { useCallback, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import './PixelTrail.css';

const easeCircleOut = (t) => Math.sqrt(1 - Math.pow(t - 1, 2));

class TrailTextureImpl {
  constructor({
    size = 512,
    maxAge = 750,
    radius = 0.3,
    intensity = 0.2,
    interpolate = 0,
    minForce = 0.3,
    ease = easeCircleOut
  } = {}) {
    this.size = size;
    this.maxAge = maxAge;
    this.radius = radius;
    this.intensity = intensity;
    this.interpolate = interpolate;
    this.minForce = minForce;
    this.ease = ease;
    this.trail = [];
    this.force = 0;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, size, size);

    this.texture = new THREE.Texture(this.canvas);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
  }

  addTouch(point) {
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      const force = Math.max(this.minForce, Math.min(dd * 10000, 1));
      this.force = force;
      if (this.interpolate) {
        const lines = Math.ceil(dd / Math.pow((this.radius * 0.5) / this.interpolate, 2));
        if (lines > 1) {
          for (let i = 1; i < lines; i++) {
            this.trail.push({
              x: last.x - (dx / lines) * i,
              y: last.y - (dy / lines) * i,
              age: 0,
              force
            });
          }
        }
      }
    }
    this.trail.push({ x: point.x, y: point.y, age: 0, force: this.force });
  }

  update(delta) {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.size, this.size);

    // Clamp the aging step: on slow frames (heavy load, software GL) a raw
    // delta can exceed maxAge, killing every point before its first draw.
    const step = Math.min(delta, 0.05) * 1000;
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].age += step;
      if (this.trail[i].age > this.maxAge) this.trail.splice(i, 1);
    }
    if (!this.trail.length) this.force = 0;
    // Guard against unbounded growth when frames are slow but input is fast.
    if (this.trail.length > 400) this.trail.splice(0, this.trail.length - 400);

    this.ctx.globalCompositeOperation = 'screen';
    for (const point of this.trail) this.drawTouch(point);
    this.texture.needsUpdate = true;
  }

  drawTouch(point) {
    const pos = { x: point.x * this.size, y: (1 - point.y) * this.size };
    let intensity;
    if (point.age < this.maxAge * 0.3) {
      intensity = this.ease(point.age / (this.maxAge * 0.3));
    } else {
      intensity = this.ease(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7));
    }
    intensity *= point.force;

    const radius = Math.max(0, this.size * this.radius * intensity);
    if (radius < 1) return;
    const grd = this.ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);
    grd.addColorStop(0, `rgba(255, 255, 255, ${this.intensity})`);
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

function GooeyFilter({ id = 'goo-filter', strength = 10 }) {
  return (
    <svg className="goo-filter-container" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

class DotMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        resolution: { value: new THREE.Vector2(1, 1) },
        mouseTrail: { value: null },
        gridSize: { value: 40 },
        pixelColor: { value: new THREE.Color(1, 1, 1) }
      },
      vertexShader: /* glsl */ `
        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec2 resolution;
        uniform sampler2D mouseTrail;
        uniform float gridSize;
        uniform vec3 pixelColor;

        vec2 coverUv(vec2 uv) {
          vec2 s = resolution.xy / max(resolution.x, resolution.y);
          return (uv - 0.5) * s + 0.5;
        }

        void main() {
          vec2 screenUv = gl_FragCoord.xy / resolution;
          vec2 uv = coverUv(screenUv);

          // Sample the trail at the centre of the nearest grid cell so whole
          // pixels light up instead of a smooth blob.
          vec2 gridCenter = (floor(uv * gridSize) + 0.5) / gridSize;
          float trail = texture2D(mouseTrail, clamp(gridCenter, 0.0, 1.0)).r;

          float alpha = smoothstep(0.02, 0.5, trail);
          if (alpha < 0.01) discard;

          gl_FragColor = vec4(pixelColor, alpha);
        }
      `
    });
  }
}

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const gl = useThree((s) => s.gl);

  const dotMaterial = useMemo(() => new DotMaterial(), []);

  const trail = useMemo(
    () =>
      new TrailTextureImpl({
        size: 512,
        radius: trailSize,
        maxAge,
        interpolate,
        intensity: 0.5,
        ease: easingFunction
      }),
    [trailSize, maxAge, interpolate, easingFunction]
  );

  useEffect(() => {
    return () => trail.texture.dispose();
  }, [trail]);

  const onMove = useCallback((e) => trail.addTouch(e.uv), [trail]);

  // Higher layers (hero copy, CTAs, ticker) sit above the canvas and swallow
  // its pointer events, so forward window moves into the trail as well —
  // skipping events the mesh raycast already handled.
  useEffect(() => {
    const canvas = gl.domElement;
    const uv = { x: 0, y: 0 };
    const handleMove = (e) => {
      if (e.target === canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      uv.x = (e.clientX - rect.left) / rect.width;
      uv.y = 1 - (e.clientY - rect.top) / rect.height;
      if (uv.x < 0 || uv.x > 1 || uv.y < 0 || uv.y > 1) return;
      onMove({ uv });
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [gl, onMove]);

  useFrame((_, delta) => {
    trail.update(delta);
    const dpr = gl.getPixelRatio ? gl.getPixelRatio() : window.devicePixelRatio || 1;
    dotMaterial.uniforms.resolution.value.set(size.width * dpr, size.height * dpr);
    dotMaterial.uniforms.gridSize.value = gridSize;
    dotMaterial.uniforms.mouseTrail.value = trail.texture;
    // three stores parsed colors in linear space while the raw shader writes
    // straight to an sRGB framebuffer — convert back for the exact brand color.
    dotMaterial.uniforms.pixelColor.value.set(pixelColor).convertLinearToSRGB();
  });

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} attach="material" />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = easeCircleOut,
  color = '#ffffff',
  gooeyFilter,
  className = '',
  canvasProps = {},
  glProps = { antialias: false, alpha: true }
}) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        dpr={[1, 1.5]}
        className={`pixel-canvas ${className}`.trim()}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
          ...(canvasProps.style || {})
        }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
