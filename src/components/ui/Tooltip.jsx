import React from 'react';
import { cn } from '../../utils/cn';

const Tooltip = ({ children, content, className, ...props }) => {
  return (
    <div className="relative flex items-center group" {...props}>
      {children}
      <div className={cn(
        "absolute bottom-full mb-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700",
        className
      )}>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
