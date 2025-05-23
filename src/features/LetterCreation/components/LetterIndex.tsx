import React from 'react';
import { useLetterContext } from '../context/LetterContext';

const DROPDOWN_OPTIONS = [
  'Definitions and Interpretation',
  'Construction',
  'Rights of Third Parties',
  'Tax Gross Up and Indemnities',
  'VAT',
  'Governing Law',
  'Enforcement',
];

const LetterIndex: React.FC = () => {
  const { letterIndexSelections, setLetterIndexSelections } = useLetterContext();

  // Helper: get all selected titles except for the current row
  const getSelectedTitles = (excludeIdx: number) =>
    letterIndexSelections.map((sel, idx) => (idx !== excludeIdx && sel ? sel.title : null)).filter(Boolean) as string[];

  const handleSelect = (idx: number, value: string) => {
    const updated = [...letterIndexSelections];
    if (value === '') {
      updated[idx] = null;
    } else {
      updated[idx] = { clause: idx + 1, title: value };
    }
    setLetterIndexSelections(updated);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#232323] rounded-xl p-8 shadow-lg mt-12">
      <h2 className="text-xl font-bold mb-8 text-white text-center">Index</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#454545] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#333] text-white">
              <th className="px-4 py-2 text-left font-semibold">Clause</th>
              <th className="px-4 py-2 text-left font-semibold">Title</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 24 }).map((_, idx) => {
              const selectedTitles = getSelectedTitles(idx);
              return (
                <tr key={idx} className="border-b border-[#454545] hover:bg-[#2a2a2a]">
                  <td className="px-4 py-2 text-white w-16">{idx + 1}</td>
                  <td className="px-4 py-2">
                    <select
                      className="w-full px-3 py-2 border border-[#454545] rounded-md bg-[#191919] text-[#FBFBFB] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={letterIndexSelections[idx]?.title || ''}
                      onChange={(e) => handleSelect(idx, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {DROPDOWN_OPTIONS.filter(
                        (option) => !selectedTitles.includes(option) || letterIndexSelections[idx]?.title === option
                      ).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* For demonstration: show the current selection array */}
      {/* <pre className="text-xs text-gray-400 mt-4">{JSON.stringify(selections.filter(Boolean), null, 2)}</pre> */}
    </div>
  );
};

export default LetterIndex;
