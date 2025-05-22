import React, { useState } from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const OtherDetails: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  const [fileError, setFileError] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 5.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Other Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Should a standalone Gross Up provision be included or should cross reference be made to the Facility
            Agreement?
          </label>
          <input
            type="text"
            name="grossUpProvision"
            value={form.grossUpProvision || ''}
            onChange={(e) => onChange('grossUpProvision', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter Gross Up provision"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Should a standalone VAT provision be included or should cross reference be made to the Facility Agreement?
          </label>
          <input
            type="text"
            name="vatProvision"
            value={form.vatProvision || ''}
            onChange={(e) => onChange('vatProvision', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter VAT provision"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Governing Law</label>
          <input
            type="text"
            id="governingLaw"
            name="governingLaw"
            value={form.governingLaw}
            onChange={(e) => onChange('governingLaw', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter governing law"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Should a standalone Jurisdiction provision be included or should cross reference be made to the Facility
            Agreement?
          </label>
          <input
            type="text"
            name="jurisdictionProvision"
            value={form.jurisdictionProvision || ''}
            onChange={(e) => onChange('jurisdictionProvision', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter Jurisdiction provision"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-white mb-1">
              Nature of Document
              <span className="text-red-500 text-xs align-super ml-1">*</span>
            </label>
            <select
              name="natureOfDocument"
              value={form.natureOfDocument || 'neutral'}
              onChange={(e) => onChange('natureOfDocument', e.target.value)}
              className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            >
              <option value="neutral">Neutral</option>
              <option value="bankFriendly">Bank Friendly</option>
              <option value="borrowerFriendly">Borrower Friendly</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-white mb-1">
              Upload Facility Agreement
              <span className="text-red-500 text-xs align-super ml-1">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept=".docx,.pdf"
                id="facilityAgreementUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    const allowedTypes = [
                      'application/pdf',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ];
                    if (!allowedTypes.includes(file.type)) {
                      setFileError('Only .pdf and .docx files are allowed.');
                      onChange('facilityAgreementFile', null);
                      e.target.value = '';
                      return;
                    }
                    setFileError(null);
                    onChange('facilityAgreementFile', file);
                    onChange('facilityAgreementUpload', file.name);
                  }
                }}
              />
              <label
                htmlFor="facilityAgreementUpload"
                className="inline-flex items-center bg-[#191919] text-[#FBFBFB] px-4 py-2 rounded-md border border-[#454545] cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors !ml-0"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Upload File
              </label>
              {form.facilityAgreementUpload && (
                <div className="flex items-center">
                  <span className="text-[#FBFBFB] text-xs underline truncate max-w-[240px] opacity-80">
                    {form.facilityAgreementUpload}
                  </span>
                </div>
              )}
            </div>
            {fileError && (
              <div className="text-red-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {fileError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
