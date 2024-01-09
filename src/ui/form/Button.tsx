import { Button as ButtonNext, type ButtonProps } from '@nextui-org/react';

export function Button({ type = 'button', children, ...otherProps }: ButtonProps) {
  return (
    <ButtonNext type={type} {...otherProps}>
      {children}
    </ButtonNext>
  );
}
