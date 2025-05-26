import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const PaymentModalities: React.FC<IFeeTypesProps> = ({ form, onChange, screenIndex }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step {screenIndex}.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Payment Modalities</h2>
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Payment Schedule
          <span className="text-red-500 text-xs align-super ml-1">*</span>
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center text-white">
            <input
              type="radio"
              name="paymentModality"
              value="annual"
              checked={form.paymentModality === 'annual'}
              onChange={(e) => onChange('paymentModality', e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-white">Annual</span>
          </label>

          <label className="inline-flex items-center text-white">
            <input
              type="radio"
              name="paymentModality"
              value="semiannual"
              checked={form.paymentModality === 'semiannual'}
              onChange={(e) => onChange('paymentModality', e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-white">Semi-Annual</span>
          </label>

          <label className="inline-flex items-center text-white">
            <input
              type="radio"
              name="paymentModality"
              value="quarterly"
              checked={form.paymentModality === 'quarterly'}
              onChange={(e) => onChange('paymentModality', e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-white">Quarterly</span>
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="businessDays" className="block text-sm font-medium text-white mb-1">
          Business Days For Payment
          <span className="text-red-500 text-xs align-super ml-1">*</span>
        </label>
        <input
          type="text"
          id="businessDays"
          name="businessDays"
          value={form.businessDays}
          onChange={(e) => onChange('businessDays', e.target.value)}
          className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
          placeholder="Enter business days"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="governingLaw" className="block text-sm font-medium text-white mb-1">
          Governing Law
          <span className="text-red-500 text-xs align-super ml-1">*</span>
        </label>
        <select
          id="governingLaw"
          name="governingLaw"
          value={form.governingLaw}
          onChange={(e) => onChange('governingLaw', e.target.value)}
          className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
        >
          <option value="">Select Governing Law</option>
          <option value="English">English</option>
          <option value="New York">New York</option>
          <option value="Singapore">Singapore</option>
          <option value="Hong Kong">Hong Kong</option>
        </select>
      </div>
    </div>
  );
};

export default PaymentModalities;
