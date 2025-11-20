import React from 'react';
import { AspectRatio } from '../types';

interface ControlsProps {
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
  disabled: boolean;
}

const RATIO_LABELS: Record<AspectRatio, string> = {
  [AspectRatio.Square]: 'Square (1:1)',
  [AspectRatio.Portrait_3_4]: 'Portrait (3:4)',
  [AspectRatio.Portrait_9_16]: 'Story (9:16)',
  [AspectRatio.Landscape_4_3]: 'Landscape (4:3)',
  [AspectRatio.Landscape_16_9]: 'Cinematic (16:9)',
};

export const Controls: React.FC<ControlsProps> = ({ selectedRatio, onRatioChange, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {Object.values(AspectRatio).map((ratio) => (
        <button
          key={ratio}
          onClick={() => onRatioChange(ratio)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
            ${
              selectedRatio === ratio
                ? 'bg-brand-600 border-brand-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                : 'bg-dark-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {RATIO_LABELS[ratio]}
        </button>
      ))}
    </div>
  );
};