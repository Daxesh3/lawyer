import React, { useState } from 'react';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';
import { API_VITE_API_FACILITY_FILE_UPLOAD, formatToUSD, numberFields } from '../../../shared/constants/constant';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';

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
  const { formData, updateFormField } = useLetterContext();
  const [facilityAgreementDetails, setFacilityAgreementDetails] = useState(false);
  const [isUpload, setIsUploading] = useState(false);

  // Helper: get all selected titles except for the current row
  const getSelectedTitles = (excludeIdx: number) =>
    formData.indexClauses
      .map((sel: any, idx: number) => (idx !== excludeIdx && sel ? sel.title : null))
      .filter(Boolean) as string[];

  const handleFacilityAgreementUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(API_VITE_API_FACILITY_FILE_UPLOAD, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      setFacilityAgreementDetails(true);
      const data: IFacilityUploadDetails = await response.json();
      updateFormField('indexClauses', data?.indexClauses || []);
      updateFormField('definitions', data?.definitions || []);
      updateFormField('variations', data?.variations || {});
      setIsUploading(false);

      // Optionally update form state with uploaded file info here
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const handleSelect = (idx: number, value: string) => {
    const updated = [...formData.indexClauses];
    if (value === '') {
      updated[idx] = null;
    } else {
      updated[idx] = { clause: idx + 1, title: value };
    }
    updateFormField('indexClauses', updated);
  };

  const handleFormChange = (
    fieldOrEvent: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: string | boolean | number | File | null
  ) => {
    // If called as an event handler
    if (typeof fieldOrEvent !== 'string') {
      const e = fieldOrEvent;
      const { name, type } = e.target;
      if (type === 'checkbox') {
        const isChecked = (e.target as HTMLInputElement).checked;
        updateFormField(name, isChecked);
      } else {
        const isNumField = numberFields.includes(name);
        updateFormField(name, isNumField ? formatToUSD(e.target.value) : e.target.value);
      }
    } else {
      const isNumField = numberFields.includes(fieldOrEvent);
      // If called directly with field and value
      updateFormField(fieldOrEvent, (isNumField ? formatToUSD(value as string) : value) ?? null);
    }
  };

  const getClauseValue = (idx: number) => {
    const clauseVal = formData.indexClauses.filter((clauseData: any) => clauseData?.clause == idx + 1)?.[0] || '';
    return clauseVal;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          accept=".docx,.pdf"
          id="facilityAgreementUpload"
          className="hidden"
          disabled={isUpload}
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              const allowedTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ];
              if (!allowedTypes.includes(file.type)) {
                handleFormChange('facilityAgreementUpload', null);
                e.target.value = '';
                return;
              }
              handleFacilityAgreementUpload(file);
            }
          }}
        />
        <label
          htmlFor="facilityAgreementUpload"
          className="flex w-fit items-center bg-blue-400 text-[#FBFBFB] p-2 rounded-md border border-[#454545] cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors !ml-0"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {!isUpload ? 'Upload Facility Agreement' : 'Uploading Facility Agreement... '}
        </label>
        {formData.facilityAgreementUpload && (
          <div className="flex items-center mt-2">
            <p className="text-[#FBFBFB] text-xs underline truncate max-w-[240px] opacity-80 ml-2">
              {formData.facilityAgreementUpload}
            </p>
          </div>
        )}
      </div>
      {!!facilityAgreementDetails && (
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
                {formData.indexClauses.length > 0 &&
                  Array.from({ length: 24 }).map((_, idx) => {
                    const selectedTitles = getSelectedTitles(idx);
                    return (
                      <tr key={idx} className="border-b border-[#454545] hover:bg-[#2a2a2a]">
                        <td className="px-4 py-2 text-white w-16">{idx + 1}</td>
                        <td className="px-4 py-2">
                          <select
                            className="w-full px-3 py-2 border border-[#454545] rounded-md bg-[#191919] text-[#FBFBFB] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={getClauseValue(idx)?.title || ''}
                            onChange={(e) => handleSelect(idx, e.target.value)}
                          >
                            <option value="">Select clause...</option>
                            {DROPDOWN_OPTIONS.filter(
                              (option) => !selectedTitles.includes(option) || getClauseValue(idx)?.title === option
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
      )}
    </>
  );
};

export default LetterIndex;
