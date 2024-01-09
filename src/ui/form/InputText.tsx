import { Input, type InputProps } from '@nextui-org/react';

export function InputText({ type = 'txext', id, ...otherProps }: InputProps) {
  return <Input type={type} label={id} name={id} id={id} variant="flat" {...otherProps} />;
}
