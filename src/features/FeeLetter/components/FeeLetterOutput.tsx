import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Lottie from 'lottie-react';
import React from 'react';
import letterGeneration from '../../../assets/Json/LetterGenerate.json';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';

enum AlignmentType {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

interface FeeLetterOutputProps {
  isGenerating: boolean;
  hasGenerated: boolean;
  setHasGenerated: (hasGenerated: boolean) => void;
  facilityUploadDetails: IFacilityUploadDetails;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({
  isGenerating,
  hasGenerated,
  setHasGenerated,
  facilityUploadDetails,
}) => {
  const { formData, coverFormData, letterIndexSelections } = useLetterContext();

  const handleCopy = () => {
    const text = generateFeeLetterText(
      { ...formData, ...coverFormData, indexClauses: letterIndexSelections.filter(Boolean) },
      facilityUploadDetails
    );
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleDownload = async () => {
    try {
      const contentElement = document.getElementById('fee-letter-content');
      if (!contentElement) return;

      const htmlContent = contentElement.innerHTML;

      // Function to parse HTML and create DOCX elements
      const parseHtmlToDocx = (html: string): Paragraph[] => {
        const docxElements: Paragraph[] = [];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Helper function to determine styles from parent elements
        const getStylesFromAncestors = (node: Node): { bold: boolean; italics: boolean } => {
          let bold = false;
          let italics = false;
          let currentNode = node.parentNode;
          while (currentNode && currentNode !== tempDiv) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
              const element = currentNode as HTMLElement;
              if (element.tagName === 'B' || element.tagName === 'STRONG') bold = true;
              if (element.tagName === 'I' || element.tagName === 'EM') italics = true;
            }
            currentNode = currentNode.parentNode;
          }
          return { bold, italics };
        };

        let currentParagraphRuns: TextRun[] = [];
        let currentParagraphAlignment = AlignmentType.Left;

        const createParagraph = (runs: TextRun[], alignment: AlignmentType): Paragraph | null => {
          if (runs.length === 0) return null;
          return new Paragraph({
            spacing: {
              before: 200,
              after: 200,
              line: 360, // 1.5 line spacing
            },
            children: runs,
            alignment: alignment,
          });
        };

        const processNode = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent) {
            const styles = getStylesFromAncestors(node);
            const segments = node.textContent.split('\n');

            segments.forEach((segment, index) => {
              if (segment) {
                currentParagraphRuns.push(
                  new TextRun({ text: segment, bold: styles.bold, italics: styles.italics, size: 24 })
                );
              }
              if (index < segments.length - 1) {
                currentParagraphRuns.push(new TextRun({ break: 1 }));
              }
            });
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            if (element.tagName === 'BR') {
              currentParagraphRuns.push(new TextRun({ break: 1 }));
            } else if (element.tagName === 'P' || element.tagName === 'DIV') {
              const paragraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
              if (paragraph) docxElements.push(paragraph);

              currentParagraphRuns = [];
              currentParagraphAlignment =
                element.style.textAlign === 'center' ? AlignmentType.Center : AlignmentType.Left;

              element.childNodes.forEach((childNode) => processNode(childNode));

              const blockParagraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
              if (blockParagraph) docxElements.push(blockParagraph);

              currentParagraphRuns = [];
              currentParagraphAlignment = AlignmentType.Left;
            } else {
              element.childNodes.forEach((childNode) => processNode(childNode));
            }
          }
        };

        // Start processing from the top-level children of the temporary div
        tempDiv.childNodes.forEach((node) => processNode(node));

        // Push any remaining runs as the last paragraph
        const lastParagraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
        if (lastParagraph) docxElements.push(lastParagraph);

        return docxElements;
      };

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: parseHtmlToDocx(htmlContent),
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
            <Lottie animationData={letterGeneration} loop={true} />
          </div>
        ) : null}
        <div
          id="fee-letter-content"
          className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg min-h-[500px] mx-5 max-w-4xl"
        >
          {hasGenerated ? (
            <div
              dangerouslySetInnerHTML={{
                __html: generateFeeLetterText(
                  { ...formData, ...coverFormData, indexClauses: letterIndexSelections.filter(Boolean) },
                  facilityUploadDetails
                ),
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
