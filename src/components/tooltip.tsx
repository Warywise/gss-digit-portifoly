import React, { JSX } from 'react';

interface TooltipProps {
  children: string | JSX.Element;
  title: string | JSX.Element;
  fill?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, fill }) => {
  return (
    <div className="tooltip-container">
      <div className={`tooltip-trigger ${fill ? 'bg-foreground text-background' : ''}`}>
        {children}
      </div>
      <div className="tooltip">{title}</div>
    </div>
  );
};

export default Tooltip;
