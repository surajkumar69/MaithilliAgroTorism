import React from 'react';

interface CurveDividerProps {
  fillColor?: string;
  flipY?: boolean;
  className?: string;
}

export const CurveDivider: React.FC<CurveDividerProps> = ({
  fillColor = '#faf8f5',
  flipY = false,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flipY ? 'rotate-180' : ''
      } ${className}`}
    >
      <svg
        className="relative block w-full h-12 md:h-20 lg:h-24"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        ></path>
      </svg>
    </div>
  );
};
