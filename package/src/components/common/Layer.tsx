'use client';

import * as React from 'react';
import { useRef } from 'react';
import { NAME_SPACE } from '../../constants/core';
import useOutsideClick from '../../hooks/useOutsideClick';
import ConditionalWrapper from './ConditionalWrapper';
import Portal from './Portal';

interface IProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  withPortal: boolean;
  children: React.ReactNode;
}

function Layer({ isVisible, setIsVisible, withPortal, children }: IProps) {
  const layer = useRef(null);

  useOutsideClick(layer, () => {
    setIsVisible(false);
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
