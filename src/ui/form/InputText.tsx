import { Input, type InputProps } from '@nextui-org/react';

export function InputText({ type = 'text', id, errorMessage, ...otherProps }: InputProps) {
  return (
    <Input
      type={type}
      label={id}
      name={id}
      id={id}
      variant={errorMessage ? 'bordered' : 'flat'}
      {...otherProps}
    />
  );
}
