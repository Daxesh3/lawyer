import React, { useState } from 'react';
import { FeeLetterData } from '../types/feeLetterTypes';
import { Copy, Check } from 'lucide-react';
import { generateFeeLetterText } from '../utils/feeLetterGenerator';

interface FeeLetterOutputProps {
  data: FeeLetterData;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const generatedText = generateFeeLetterText(data);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleCopyToClipboard}
          className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-300 max-h-[70vh] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
          {generatedText}
        </pre>
      </div>
    </div>
  );
};

export default FeeLetterOutput;