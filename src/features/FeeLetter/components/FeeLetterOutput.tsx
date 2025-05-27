import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Lottie from 'lottie-react';
import React from 'react';
import letterGeneration from '../../../assets/Json/LetterGenerate.json';
// import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface'; // Removed unused import
import { generateFeeLetterText } from '../../../utils/feeLetterGenerator';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';
// The CSS import is for browser display and not used by docx generation
// import '../../../index.css';

enum AlignmentType {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

interface IRunStyles {
  bold?: boolean;
  italics?: boolean;
  // Add other inline style properties here as needed (e.g., size, color)
}

// Define a simple interface for TabStop to satisfy the linter
// Based on the error, the type should be a string union
interface ITabStop {
  type: 'left' | 'center' | 'right' | 'start' | 'end' | 'bar' | 'clear' | 'decimal' | 'num';
  position: number;
}

interface FeeLetterOutputProps {
  isGenerating: boolean;
  hasGenerated: boolean;
  setHasGenerated: (hasGenerated: boolean) => void;
}

const FeeLetterOutput: React.FC<FeeLetterOutputProps> = ({ isGenerating, hasGenerated, setHasGenerated }) => {
  const { formData, coverFormData, letterIndexSelections } = useLetterContext();

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

        // Corrected function signature for createParagraph
        const createParagraph = (
          runs: TextRun[],
          alignment: AlignmentType,
          indent?: { left?: number; hanging?: number },
          tabStops?: ITabStop[],
          afterSpacing?: number
        ): Paragraph | null => {
          if (runs.length === 0) return null;

          const spacingOptions: { before?: number; after?: number; line?: number } = {
            before: 200,
            line: 360, // 1.5 line spacing
          };

          // Use the passed afterSpacing if provided, otherwise use a default or none
          if (afterSpacing !== undefined) {
            spacingOptions.after = afterSpacing;
          } else {
            spacingOptions.after = 200; // Default after spacing if not specified by class
          }

          return new Paragraph({
            spacing: spacingOptions,
            children: runs,
            alignment: alignment,
            indent: indent, // Apply passed indent
            tabStops: tabStops, // Apply passed tab stops
          });
        };

        // Modified processNode to accept inherited run styles and handle classes
        const processNode = (node: Node, inheritedRunStyles: IRunStyles = {}, depth = 0) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent) {
            const styles = getStylesFromAncestors(node);
            // Combine styles from ancestors and inherited styles
            const finalRunStyles: IRunStyles = { ...styles, ...inheritedRunStyles };

            currentParagraphRuns.push(
              new TextRun({
                text: node.textContent.replace(/\t/g, '\u0009'), // Replace \t with Unicode tab character for docx
                bold: finalRunStyles.bold, // Apply combined bold style
                italics: finalRunStyles.italics, // Apply combined italics style
                size: 24, // Base size
                // Add other run properties here if needed (e.g., color, underline)
              })
            );
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const classList = Array.from(element.classList);

            // const elementRunStyles: IRunStyles = { ...inheritedRunStyles };
            // if (element.tagName === 'B' || element.tagName === 'STRONG') inheritedRunStyles.bold = true;
            // ... existing code ...

            if (
              element.tagName === 'P' ||
              element.tagName === 'DIV' ||
              element.tagName === 'LI' ||
              element.tagName === 'UL'
            ) {
              // Finalize any current runs as a paragraph before starting a new block element
              const precedingParagraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
              if (precedingParagraph) docxElements.push(precedingParagraph);

              currentParagraphRuns = [];
              currentParagraphAlignment =
                element.style.textAlign === 'center' ? AlignmentType.Center : AlignmentType.Left;

              // Determine styling based on element type and classes
              let paragraphIndent: { left?: number; hanging?: number } | undefined = undefined;
              let paragraphTabStops: ITabStop[] | undefined = undefined;
              let paragraphAfterSpacing: number | undefined = undefined;

              if (classList.includes('fee-paragraph')) {
                paragraphAfterSpacing = 200;
                paragraphIndent = { left: 0 };
              } else if (classList.includes('fee-list-item')) {
                // Main list items (level 1)
                paragraphIndent = { left: 720, hanging: 400 };
                paragraphTabStops = [{ type: 'left', position: 760 }];
                paragraphAfterSpacing = 200;
              } else if (classList.includes('fee-sublist-item')) {
                // Sublist items (level 2)
                paragraphIndent = { left: 1080, hanging: 400 };
                paragraphTabStops = [{ type: 'left', position: 1120 }];
                paragraphAfterSpacing = 200;
              } else if (classList.includes('fee-sublist-level2')) {
                // Sublist level 2 items (level 3)
                paragraphIndent = { left: 1440, hanging: 400 };
                paragraphTabStops = [{ type: 'left', position: 1480 }];
                paragraphAfterSpacing = 200;
              } else if (classList.includes('fee-indent')) {
                paragraphIndent = { left: 720 + depth * 360 };
              }

              // Process children with increased depth if this is a list container
              const newDepth = element.tagName === 'UL' || (element.tagName as any) === 'OL' ? depth + 1 : depth;

              // Process children of the block element, passing down the combined run styles
              element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, newDepth));

              // After processing children, finalize runs within this block element as a paragraph
              const blockParagraph = createParagraph(
                currentParagraphRuns,
                currentParagraphAlignment,
                paragraphIndent,
                paragraphTabStops,
                paragraphAfterSpacing
              );
              if (blockParagraph) {
                docxElements.push(blockParagraph);
              }

              currentParagraphRuns = []; // Reset runs for content after this block element
              currentParagraphAlignment = AlignmentType.Left; // Reset alignment
            } else {
              // For other elements, process their children and pass down the combined run styles
              // Ensure current runs are added before processing children of non-block elements
              if (currentParagraphRuns.length > 0) {
                const paragraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
                if (paragraph) docxElements.push(paragraph);
                currentParagraphRuns = []; // Clear runs
                currentParagraphAlignment = AlignmentType.Left; // Reset alignment
              }
              element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles));
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
