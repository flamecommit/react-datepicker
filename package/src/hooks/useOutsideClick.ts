import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  targetRef: RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (targetRef.current && !targetRef.current.contains(target)) {
        callback(e);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [targetRef, callback]);
};

export default useOutsideClick;
