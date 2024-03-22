import { useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface ISize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  T | null,
  (node: T | null) => void,
  ISize,
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<ISize>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    console.log('handleSize');
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [ref, setRef, size];
}
