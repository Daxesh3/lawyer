import React from 'react';
import { CURRENCIES } from '../constants/Letter.constants';
import { IFeeTypesProps } from '../interface/Letter.interface';

const BasicInformation: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 1.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Basic Information</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Borrower Name</label>
          <input
            className="w-full border border-[#454545] rounded-md px-3 py-2 text-[#FBFBFB] bg-[#191919] placeholder-gray-400 focus:outline-none focus:border-blue-400"
            placeholder="Enter borrower name"
            value={form.borrowerName}
            onChange={(e) => onChange('borrowerName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Facility Agent Name</label>
          <input
            className="w-full border border-[#454545] rounded-md px-3 py-2 text-[#FBFBFB] bg-[#191919] placeholder-gray-400 focus:outline-none focus:border-blue-400"
            placeholder="Enter facility agent name"
            value={form.facilityAgentName}
            onChange={(e) => onChange('facilityAgentName', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Currency</label>
          <select
            className="w-full border border-[#454545] rounded-md px-3 py-2 text-[#FBFBFB] bg-[#191919] focus:outline-none focus:border-blue-400"
            value={form.currency}
            onChange={(e) => onChange('currency', e.target.value)}
          >
            {CURRENCIES.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Amount</label>
          <input
            className="w-full border border-[#454545] rounded-md px-3 py-2 text-[#FBFBFB] bg-[#191919] placeholder-gray-400 focus:outline-none focus:border-blue-400"
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) => onChange('amount', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Type of Facility</label>
          <input
            className="w-full border border-[#454545] rounded-md px-3 py-2 text-[#FBFBFB] bg-[#191919] placeholder-gray-400 focus:outline-none focus:border-blue-400"
            placeholder="E.g., Single Currency"
            value={form.facilityType}
            onChange={(e) => onChange('facilityType', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
