'use client';

import { ReactNode, RefObject, useRef } from 'react';
import { NAME_SPACE } from '../../constants/core';
import useOutsideClick from '../../hooks/useOutsideClick';
import ConditionalWrapper from './ConditionalWrapper';
import Portal from './Portal';

interface IProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  withPortal: boolean;
  children: ReactNode;
  inputRef: RefObject<HTMLDivElement>;
}

function Layer({
  isVisible,
  setIsVisible,
  withPortal,
  children,
  inputRef,
}: IProps) {
  const layer = useRef(null);

  useOutsideClick(layer, (e) => {
    setTimeout(() => {
      const target = e.target as HTMLElement;
      if (inputRef.current && !inputRef.current.contains(target)) {
        setIsVisible(false);
      }
    }, 1);
  });

  return (
    <>
      {isVisible && (
        <ConditionalWrapper
          condition={withPortal}
          wrapper={(children) => (
            <Portal selector="body">
              <div className={`${NAME_SPACE}__portal`}>{children}</div>
            </Portal>
          )}
        >
          <div className={`${NAME_SPACE}__layer`} ref={layer}>
            {children}
          </div>
        </ConditionalWrapper>
      )}
    </>
  );
}

export default Layer;
