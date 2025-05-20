import React from 'react';
import { FeeLetterData } from '../../../types/feeLetterTypes';
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';

interface FeeLetterOutputProps {
  data: FeeLetterData;
  isGenerating: boolean;
  hasGenerated: boolean;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({ data, isGenerating, hasGenerated }) => {
  const handleCopy = () => {
    const text = generateFeeLetterText(data);
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      {hasGenerated && (
        <div className="flex justify-end">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
      <div className="relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Generating Fee Letter...</p>
            </div>
          </div>
        ) : null}
        <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[500px]">
          {hasGenerated ? generateFeeLetterText(data) : 'Click Generate to create the fee letter'}
        </div>
      </div>
    </div>
  );
};

export default FeeLetterOutput;
