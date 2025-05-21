import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const OtherDetails: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 6.</h3>
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
      </div>
    </div>
  );
};

export default OtherDetails;
