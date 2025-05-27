import Lottie from 'lottie-react';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import letterGeneration from '../../../assets/Json/LetterGenerate.json';
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';

interface FeeLetterOutputProps {
  isGenerating: boolean;
  hasGenerated: boolean;
  setHasGenerated: (hasGenerated: boolean) => void;
  facilityUploadDetails: IFacilityUploadDetails;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({ isGenerating, hasGenerated, setHasGenerated }) => {
  const { formData, coverFormData, letterIndexSelections } = useLetterContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const text = generateFeeLetterText({
      ...formData,
      ...coverFormData,
      indexClauses: letterIndexSelections.filter(Boolean),
    });
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleDownload = async () => {
    reactToPrintFn();
  };

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="space-y-4 mt-12">
      {hasGenerated && (
        <div className="flex justify-between">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold ml-4"
            onClick={() => setHasGenerated(false)}
          >
            Edit Fee Letter
          </button>
          <div className="flex">
            <button className="main-button primary-button max-w-fit mr-5" onClick={handleDownload}>
              Download
            </button>
            <button onClick={handleCopy} className="main-button primary-button max-w-fit mr-5">
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
      <div className="relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Lottie animationData={letterGeneration} loop={true} />
          </div>
        ) : null}
        <div
          id="fee-letter-content"
          ref={contentRef}
          className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[500px] mx-5 max-w-4xl"
        >
          {hasGenerated ? (
            <div
              dangerouslySetInnerHTML={{
                __html: generateFeeLetterText({
                  ...formData,
                  ...coverFormData,
                  indexClauses: letterIndexSelections.filter(Boolean),
                }),
              }}
            />
          ) : (
            'Click Generate to create the fee letter'
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeLetterOutput;
