interface IProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}

export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: IProps) {
  return condition ? wrapper(children) : children;
}
