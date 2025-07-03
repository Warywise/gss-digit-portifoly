import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'outline' | 'secondary' | 'danger' | 'warning' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, size = 'default', style, variant = 'default' }) => {
  const variants = {
    default: 'border-transparent bg-primary/80 text-muted hover:bg-primary-hover/80',
    secondary: 'border-transparent bg-secondary/80 hover:bg-secondary-hover/80',
    danger: 'border-danger/80 text-danger bg-destructive hover:bg-danger/80 hover:text-muted',
    warning: 'border-warning/80 text-warning bg-warning hover:bg-warning/80 hover:text-muted',
    success:
      'border-success/80 bg-success hover:bg-success/80 hover:bg-success/80 hover:text-muted',
    outline: 'text-text border-border bg-border/20',
  };

  const sizes = {
    default: 'h-8 px-4 py-2',
    sm: 'h-min px-2',
    lg: 'h-10 px-8',
    icon: 'h-10 w-10',
  };

  return <div className={`base-badge ${variants[variant]} ${sizes[size]} ${style}`}>{label}</div>;
};

export default Badge;
