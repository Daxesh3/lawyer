import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import React from 'react';
import { IFeeLetterData } from '../../../types/feeLetterTypes';
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';

interface FeeLetterOutputProps {
  data: IFeeLetterData;
  isGenerating: boolean;
  hasGenerated: boolean;
  setHasGenerated: (hasGenerated: boolean) => void;
  facilityUploadDetails: IFacilityUploadDetails;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({
  data,
  isGenerating,
  hasGenerated,
  setHasGenerated,
  facilityUploadDetails,
}) => {
  const handleCopy = () => {
    const text = generateFeeLetterText(data, facilityUploadDetails);
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleDownload = async () => {
    try {
      const content = document.getElementById('fee-letter-content');
      if (!content) return;

      // Split content into paragraphs and create document sections
      const paragraphs = content.textContent?.split('\n').filter((line) => line.trim()) || [];

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs.map(
              (text) =>
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 200,
                    line: 360, // 1.5 line spacing
                  },
                  children: [
                    new TextRun({
                      text: text.trim(),
                      size: 24, // 12pt
                      font: 'Calibri',
                    }),
                  ],
                })
            ),
          },
        ],
      });

      // Generate and save the document
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'Fee_Letter.docx');
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

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
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Generating Fee Letter...</p>
            </div>
          </div>
        ) : null}
        <div
          id="fee-letter-content"
          className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[500px] mx-5 max-w-4xl"
        >
          {hasGenerated
            ? generateFeeLetterText(data, facilityUploadDetails)
            : 'Click Generate to create the fee letter'}
        </div>
      </div>
    </div>
  );
};

export default FeeLetterOutput;
