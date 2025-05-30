import { JSX } from 'react';

interface ButtonProps {
  label: string | JSX.Element;
  onClick?: () => void;
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'danger'
    | 'warning'
    | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'default',
  size = 'default',
  style,
  ref,
}) => {
  const variants = {
    default: 'bg-primary text-muted hover:bg-primary-hover',
    secondary: 'bg-secondary hover:bg-secondary-hover',
    outline: 'border border-input bg-background hover:bg-accent/80',
    ghost: 'hover:bg-accent hover:text-foreground',
    link: 'text-primary underline-offset-4 hover:underline hover:border border-primary/25',
    danger: 'bg-danger hover:bg-danger/80 hover:text-muted',
    warning: 'bg-warning hover:bg-warning/80 hover:text-muted',
    success: 'bg-success hover:bg-success/80 hover:text-muted',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={`base-button ${variants[variant]} ${sizes[size]} ${style}`}
      onClick={onClick}
      ref={ref}
    >
      {label}
    </button>
  );
};

export default Button;
