import { ReactNode } from 'react';

interface IProps {
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
}

export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: IProps) {
  return condition ? wrapper(children) : children;
}
