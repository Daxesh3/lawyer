import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';
import { useLetterContext } from '../context/LetterContext';

const BankDetails: React.FC<IFeeTypesProps> = ({ form, onChange, screenIndex }) => {
  const { coverFormData } = useLetterContext();
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step {screenIndex}.</h3>
      <h2 className="text-xl font-bold mb-6 text-white space-y-4">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bankDetails.accountBank" className="block text-sm font-medium text-white mb-1">
            Account Bank
            <span className="text-red-500 text-xs align-super ml-1">*</span>
          </label>
          <input
            type="text"
            id="bankDetails.accountBank"
            name="bankDetails.accountBank"
            value={form.bankDetails.accountBank}
            onChange={(e) => onChange('bankDetails.accountBank', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter account bank"
          />
        </div>
        <div>
          <label htmlFor="bankDetails.accountHolder" className="block text-sm font-medium text-white mb-1">
            Account Holder (if different from Facility Agent Name)
            <span className="text-red-500 text-xs align-super ml-1">*</span>
          </label>
          <input
            type="text"
            id="bankDetails.accountHolder"
            name="bankDetails.accountHolder"
            value={form.bankDetails.accountHolder}
            onChange={(e) => onChange('bankDetails.accountHolder', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter account holder"
          />
        </div>
        <div>
          <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-white mb-1">
            Account Number
            <span className="text-red-500 text-xs align-super ml-1">*</span>
          </label>
          <input
            type="text"
            id="bankDetails.accountNumber"
            name="bankDetails.accountNumber"
            value={form.bankDetails.accountNumber}
            onChange={(e) => onChange('bankDetails.accountNumber', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter account number"
          />
        </div>
        <div>
          <label htmlFor="bankDetails.sortCode" className="block text-sm font-medium text-white mb-1">
            Sort Code
            <span className="text-red-500 text-xs align-super ml-1">*</span>
          </label>
          <input
            type="text"
            id="bankDetails.sortCode"
            name="bankDetails.sortCode"
            value={form.bankDetails.sortCode}
            onChange={(e) => onChange('bankDetails.sortCode', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter sort code"
          />
        </div>
        <div>
          <label htmlFor="bankDetails.iban" className="block text-sm font-medium text-white mb-1">
            IBAN
            <span className="text-red-500 text-xs align-super ml-1">*</span>
          </label>
          <input
            type="text"
            id="bankDetails.iban"
            name="bankDetails.iban"
            value={form.bankDetails.iban}
            onChange={(e) => onChange('bankDetails.iban', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter IBAN"
          />
        </div>
        <div>
          <label htmlFor="bankDetails.reference" className="block text-sm font-medium text-white mb-1">
            Reference
          </label>
          <input
            type="text"
            id="bankDetails.reference"
            name="bankDetails.reference"
            readOnly
            value={`${coverFormData.borrowerName} - ${coverFormData.currency} ${coverFormData.amount} ${coverFormData.facilityType} Facility Agreement`}
            defaultValue={`${coverFormData.borrowerName} - ${coverFormData.currency} ${coverFormData.amount} ${coverFormData.facilityType} Facility Agreement`}
            onChange={(e) => onChange('bankDetails.reference', e.target.value)}
            className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
            placeholder="Enter reference"
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
