import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const PaymentModalities: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b pb-2">Payment Modalities</h3>
      <h3 className="text-blue-400 font-semibold mb-1">Step 4.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Payment Modalities</h2>
      <div>
        <label className="block text-sm font-medium text-white mb-2">Payment Schedule</label>
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

      <div>
        <label htmlFor="businessDays" className="block text-sm font-medium text-white mb-1">
          Q.12 Business Days Prior Notice
        </label>
        <input
          type="text"
          id="businessDays"
          name="businessDays"
          value={form.businessDays}
          onChange={(e) => onChange('businessDays', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter business days"
        />
      </div>
    </div>
  );
};

export default PaymentModalities;
