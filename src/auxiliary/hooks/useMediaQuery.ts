import { useState, useEffect } from 'react';

export const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
} as const;

type BreakpointKey = keyof typeof breakpoints;

export const useBreakpoint = (key: BreakpointKey): boolean => {
  const query = `(min-width: ${breakpoints[key]})`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export const useBreakpointDown = (key: BreakpointKey): boolean => {
  const breakpointValue = parseInt(breakpoints[key], 10);
  const query = `(max-width: ${breakpointValue - 1}px)`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};
