import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';

interface IScroll {
  scrollX: number;
  scrollY: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  hasScrollbar: boolean;
}

export default function useElementScroll(
  elementRef: RefObject<HTMLDivElement>
): IScroll {
  const [scroll, setScroll] = useState<IScroll>({
    scrollX: 0,
    scrollY: 0,
    isAtTop: true,
    isAtBottom: false,
    hasScrollbar: false,
  });

  const handleScroll = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const isAtTop = scrollTop <= 0;
    const clientHeight = target.clientHeight;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;
    const hasScrollbar = scrollHeight > clientHeight;

    setScroll({
      scrollX: target.scrollLeft,
      scrollY: target.scrollTop,
      isAtTop,
      isAtBottom,
      hasScrollbar,
    });
  }, []);

  useEventListener('scroll', handleScroll, elementRef);

  return scroll;
}
