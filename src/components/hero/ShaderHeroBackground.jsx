import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

// Animated cinematic gradient behind the whole hero, in the logo-matched
// palette (light neutral / primary blue / CTA orange). The .shader-bg element
// carries a layered CSS radial-gradient fallback in the same palette, so the
// page still reads correctly while WebGL warms up (or if it fails).
export default function ShaderHeroBackground() {
  return (
    <div className="shader-bg" aria-hidden="true">
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
        pixelDensity={1}
        fov={45}
        pointerEvents="none"
      >
        <ShaderGradient
          animate="on"
          axesHelper="off"
          brightness={0.8}
          cAzimuthAngle={270}
          cDistance={0.5}
          cPolarAngle={180}
          cameraZoom={15}
          color1="#F5F7FA"
          color2="#0C447C"
          color3="#D85A30"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="on"
          lightType="env"
          pixelDensity={1}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.4}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          shader="defaults"
          type="sphere"
          uAmplitude={3.2}
          uDensity={0.8}
          uFrequency={5.5}
          uSpeed={0.3}
          uStrength={0.3}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      <div className="shader-vignette" />
    </div>
  );
}
