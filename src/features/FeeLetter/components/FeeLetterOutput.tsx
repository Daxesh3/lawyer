import { Document, Packer, Paragraph, TabStopType, TextRun } from 'docx';
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

      const parseHtmlToDocx = (html: string): Paragraph[] => {
        const docxElements: Paragraph[] = [];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

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
            line: 360,
          };

          spacingOptions.after = afterSpacing !== undefined ? afterSpacing : 200;

          return new Paragraph({
            spacing: spacingOptions,
            children: runs,
            alignment: alignment,
            indent: indent,
            tabStops: tabStops,
          });
        };

        const processNode = (node: Node, inheritedRunStyles: IRunStyles = {}, depth = 0) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const styles = getStylesFromAncestors(node);
            const finalRunStyles: IRunStyles = { ...styles, ...inheritedRunStyles };

            currentParagraphRuns.push(
              new TextRun({
                text: node.textContent.replace(/\t/g, '\u0009'),
                bold: finalRunStyles.bold,
                italics: finalRunStyles.italics,
                size: 24,
              })
            );
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const classList = Array.from(element.classList);

            const isBlock =
              element.tagName === 'P' ||
              element.tagName === 'DIV' ||
              element.tagName === 'LI' ||
              element.tagName === 'UL';

            const isInline =
              element.tagName === 'B' ||
              element.tagName === 'STRONG' ||
              element.tagName === 'I' ||
              element.tagName === 'EM' ||
              element.tagName === 'SPAN';

            if (isBlock) {
              const precedingParagraph = createParagraph(currentParagraphRuns, currentParagraphAlignment);
              if (precedingParagraph) docxElements.push(precedingParagraph);

              currentParagraphRuns = [];
              currentParagraphAlignment =
                element.style.textAlign === 'center' ? AlignmentType.Center : AlignmentType.Left;

              let paragraphIndent: { left?: number; hanging?: number } | undefined = undefined;
              let paragraphTabStops: ITabStop[] | undefined = undefined;
              let paragraphAfterSpacing: number | undefined = undefined;

              const firstChild = element.firstChild;

              if (classList.includes('text-index')) {
                paragraphIndent = { left: 720, hanging: 360 };
                paragraphTabStops = [{ type: TabStopType.LEFT, position: 720 }];
                paragraphAfterSpacing = 200;

                const firstChild = element.firstChild;

                if (firstChild?.nodeType === Node.TEXT_NODE && firstChild.textContent) {
                  // Match markers like: 1., 1), (1), a., a), (a)
                  const match = firstChild.textContent.trim().match(/^(\(?[a-z0-9]+\)?[.)]?)\s+(.*)/i);
                  if (match) {
                    const [, marker, rest] = match;

                    // Add bold marker and tab
                    currentParagraphRuns.push(
                      new TextRun({ text: marker, bold: true, size: 24 }),
                      new TextRun({ text: '\t', size: 24 }),
                      new TextRun({ text: rest, size: 24 }) // Include the rest of the content after the marker
                    );

                    // Process remaining siblings (if any)
                    const remainingNodes = Array.from(element.childNodes).slice(1);
                    remainingNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, depth));

                    // Create the paragraph
                    const paragraph = createParagraph(
                      currentParagraphRuns,
                      AlignmentType.JUSTIFIED,
                      paragraphIndent,
                      paragraphTabStops,
                      paragraphAfterSpacing
                    );
                    if (paragraph) docxElements.push(paragraph);

                    currentParagraphRuns = [];
                    return;
                  }
                }

                // If no marker matched, process as normal paragraph
                element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, depth));

                const paragraph = createParagraph(
                  currentParagraphRuns,
                  AlignmentType.JUSTIFIED,
                  paragraphIndent,
                  paragraphTabStops,
                  paragraphAfterSpacing
                );
                if (paragraph) docxElements.push(paragraph);
                currentParagraphRuns = [];
              }

              if (classList.includes('fee-sublist-item')) {
                paragraphIndent = { left: 1080, hanging: 360 };
                paragraphTabStops = [{ type: TabStopType.LEFT, position: 1080 }];
                paragraphAfterSpacing = 200;

                if (firstChild?.nodeType === Node.TEXT_NODE && firstChild.textContent) {
                  const match = firstChild.textContent.trim().match(/^([a-z0-9]+\.)\s+(.*)/i);

                  if (match) {
                    const [, marker, rest] = match;

                    currentParagraphRuns.push(
                      new TextRun({ text: marker, bold: true, size: 24 }),
                      new TextRun({ text: '\t', size: 24 })
                    );

                    firstChild.textContent = rest;
                    element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, depth));

                    const paragraph = createParagraph(
                      currentParagraphRuns,
                      AlignmentType.JUSTIFIED,
                      paragraphIndent,
                      paragraphTabStops,
                      paragraphAfterSpacing
                    );
                    if (paragraph) docxElements.push(paragraph);
                    currentParagraphRuns = [];
                    return;
                  }
                }
              }

              if (classList.includes('fee-sublist-level2')) {
                paragraphIndent = { left: 1500, hanging: 360 };
                paragraphTabStops = [{ type: TabStopType.LEFT, position: 1500 }];
                paragraphAfterSpacing = 200;

                if (firstChild?.nodeType === Node.TEXT_NODE && firstChild.textContent) {
                  const match = firstChild.textContent.trim().match(/^(\(?[a-z]+\.\)?)\s+(.*)/i);
                  if (match) {
                    const [, marker, rest] = match;

                    currentParagraphRuns.push(
                      new TextRun({ text: marker, bold: true, size: 24 }),
                      new TextRun({ text: '\t', size: 24 })
                    );

                    firstChild.textContent = rest;
                    element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, depth));

                    const paragraph = createParagraph(
                      currentParagraphRuns,
                      AlignmentType.JUSTIFIED,
                      paragraphIndent,
                      paragraphTabStops,
                      paragraphAfterSpacing
                    );
                    if (paragraph) docxElements.push(paragraph);
                    currentParagraphRuns = [];
                    return;
                  }
                }
              }

              // For generic blocks
              const newDepth = element.tagName === 'UL' || element.tagName === 'OL' ? depth + 1 : depth;

              element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, newDepth));

              const blockParagraph = createParagraph(
                currentParagraphRuns,
                currentParagraphAlignment,
                paragraphIndent,
                paragraphTabStops,
                paragraphAfterSpacing
              );
              if (blockParagraph) docxElements.push(blockParagraph);

              currentParagraphRuns = [];
              currentParagraphAlignment = AlignmentType.Left;
            } else if (isInline) {
              const isBold = element.tagName === 'B' || element.tagName === 'STRONG';
              const isItalic = element.tagName === 'I' || element.tagName === 'EM';

              const combinedStyles: IRunStyles = {
                ...inheritedRunStyles,
                bold: inheritedRunStyles.bold || isBold,
                italics: inheritedRunStyles.italics || isItalic,
              };

              element.childNodes.forEach((childNode) => processNode(childNode, combinedStyles, depth));
            } else {
              element.childNodes.forEach((childNode) => processNode(childNode, inheritedRunStyles, depth));
            }
          }
        };

        tempDiv.childNodes.forEach((node) => processNode(node));

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
