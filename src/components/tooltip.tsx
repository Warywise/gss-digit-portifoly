import React, { JSX, useLayoutEffect, useRef, useState } from 'react';

interface TooltipProps {
  children: string | JSX.Element;
  title: string | JSX.Element;
  fill?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, fill }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const height = tooltipRef.current.offsetHeight;
      setOffset(height + 4);
    }
  }, [title]);

  return (
    <div className="tooltip-container">
      <div className={`tooltip-trigger ${fill ? 'bg-foreground text-background' : ''}`}>
        {children}
      </div>
      <div ref={tooltipRef} className="tooltip" style={{ top: `-${offset}px` }}>
        {title}
      </div>
    </div>
  );
};

export default Tooltip;
