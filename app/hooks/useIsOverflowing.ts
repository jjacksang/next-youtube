import { useEffect, useRef, useState } from 'react';

export function useIsOverflowing<T extends HTMLElement>(maxLines = 3) {
  const ref = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * maxLines;

    if (el.scrollHeight > maxHeight) {
      setIsOverflowing(true);
    }
  }, []);

  return { ref, isOverflowing };
}
