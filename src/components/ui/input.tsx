import React from 'react';

const Input = ({
  ref,
  style,
  ...props
}: {
  ref?: React.Ref<HTMLInputElement>;
  style?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'>) => (
  <input className={`custom-input ${style}`} ref={ref} {...props} />
);

export default Input;
