import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const OtherDetails: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 5.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Other Details</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Gross Up provision<span className="text-red-500 text-xs align-super ml-1">*</span>
            </label>
            <select
              name="grossUpProvision"
              value={form.grossUpProvision || 'Gross Up'}
              onChange={(e) => onChange('grossUpProvision', e.target.value)}
              className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            >
              <option value="Gross Up">Gross Up</option>
              <option value="Standalone">Standalone</option>
              <option value="Refer to Facility Agreement">Refer to Facility Agreement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              VAT provision<span className="text-red-500 text-xs align-super ml-1">*</span>
            </label>
            <select
              name="vatProvision"
              value={form.vatProvision || 'VAT'}
              onChange={(e) => onChange('vatProvision', e.target.value)}
              className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            >
              <option value="VAT">VAT</option>
              <option value="Standalone">Standalone</option>
              <option value="Refer to Facility Agreement">Refer to Facility Agreement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Jurisdiction provision<span className="text-red-500 text-xs align-super ml-1">*</span>
            </label>
            <select
              name="jurisdictionProvision"
              value={form.jurisdictionProvision || 'Jurisdiction'}
              onChange={(e) => onChange('jurisdictionProvision', e.target.value)}
              className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            >
              <option value="Jurisdiction">Jurisdiction</option>
              <option value="Standalone">Standalone</option>
              <option value="Refer to Facility Agreement">Refer to Facility Agreement</option>
            </select>
          </div>
          <div>
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
        </div>
        <div className="flex gap-4">
          <div className="w-2/3">
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="facilityAgreementUpload"
              name="facilityAgreementUpload"
              checked={form.facilityAgreementUpload}
              onChange={(e) => onChange('facilityAgreementUpload', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-[#191919] border-[#454545] rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="facilityAgreementUpload" className="ml-2 text-sm text-white">
              Include Facility Agreement
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
