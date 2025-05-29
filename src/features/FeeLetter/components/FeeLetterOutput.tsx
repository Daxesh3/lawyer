import Lottie from 'lottie-react';
import React, { useCallback, useRef, useState } from 'react';
import letterGeneration from '../../../assets/Json/LetterGenerate.json';
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';
import { API_VITE_API_HTML_TO_DOC } from '../../../shared/constants/constant';
import { finalGenerateFeeLetterText } from '../../../utils/finalFeeLetterGenerator';
import { useReactToPrint } from 'react-to-print';

interface FeeLetterOutputProps {
  isGenerating: boolean;
  hasGenerated: boolean;
  setHasGenerated: (hasGenerated: boolean) => void;
  facilityUploadDetails: IFacilityUploadDetails;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({ isGenerating, hasGenerated, setHasGenerated }) => {
  const { formData, coverFormData, letterIndexSelections } = useLetterContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerateDoc, setIsGenerateDoc] = useState(false);

  // const handleCopy = () => {
  //   const htmlText = generateFeeLetterText({
  //     ...formData,
  //     ...coverFormData,
  //     indexClauses: letterIndexSelections.filter(Boolean),
  //   });

  //   if (htmlText) {
  //     const blob = new Blob([htmlText], { type: 'text/html' });
  //     const data = [new ClipboardItem({ 'text/html': blob })];
  //     navigator.clipboard.write(data);
  //   }
  // };

  const handleDownload = useCallback(async () => {
    try {
      setIsGenerateDoc(true);
      const content = finalGenerateFeeLetterText({
        ...formData,
        ...coverFormData,
        indexClauses: letterIndexSelections.filter(Boolean),
      });

      // Convert HTML content to string with line breaks
      const htmlContent = content
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n');
      console.log('htmlContent:---', htmlContent);
      const response = await fetch(API_VITE_API_HTML_TO_DOC, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Fee Letter</title>
  <style>
              p {
            margin: 0;
            text-align:justify;
          }
            div {
             text-align:justify;
            }
          .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            text-decoration: underline;
          }
          .numbered-item {
            display: flex;
            margin-left: 2em;
            margin-bottom: 1em;
            text-align:justify;
          }
          .numbered-item p:first-child {
            width: 25px;
            margin-right: 15px;
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
          }
          .indent {
            margin-left: 4.5em;
          }
          .account-details {
            margin-left: 4em;
            margin-top: 0.5em;
          }
          .signature-block {
            margin-top: 3em;
          }
          .signature-line {
            margin: 2em 0;
          }
          .flex {
            display: flex;
          }
          .flex-col {
            display: flex;
            flex-direction: column;
          }
          .ml-16 {
            margin-left: 64px;
          }
            .mb-6 {
            margin-bottom: 12px;
          }
          </style>
</head>
<body>
  ${contentRef?.current?.innerHTML}
</body>
</html>`,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fee-Letter.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setIsGenerateDoc(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
      setIsGenerateDoc(false);
    }
  }, [formData, coverFormData, letterIndexSelections]);

  const handlePDFDownload = async () => {
    reactToPrintFn();
  };

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="space-y-4 mt-12">
      {isGenerateDoc && (
        <div className="absolute inset-0 flex items-center justify-center z-50 min-h-screen">
          <div className="absolute inset-0 bg-black/50" />
          <Lottie animationData={letterGeneration} loop={true} />
        </div>
      )}
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
              Download Document
            </button>
            <button className="main-button primary-button max-w-fit mr-5" onClick={handlePDFDownload}>
              Download PDF
            </button>
            {/* <button onClick={handleCopy} className="main-button primary-button max-w-fit mr-5">
              Copy to Clipboard
            </button> */}
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
          className={`whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[500px] mx-5 max-w-4xl ${
            isGenerateDoc ? 'blur-sm' : ''
          }`}
        >
          {hasGenerated ? (
            <div
              className="letter-wrapper"
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
