import { useEffect, useState } from 'react';

/**
 * Reactive media-query flag. Initializes synchronously from matchMedia so
 * the first render already knows the viewport class (no mobile flash of a
 * desktop-only section), then tracks live changes (rotation, resize).
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, [query]);

  return matches;
}
