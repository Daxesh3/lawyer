import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const FeeTypes: React.FC<IFeeTypesProps> = ({ form, onChange }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 2.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Fee Types</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.facilityAgentFee"
              name="feeTypes.facilityAgentFee"
              checked={form.feeTypes.facilityAgentFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.facilityAgentFee" className="ml-2 block text-sm text-white">
              Facility Agent Fee
            </label>
          </div>

          {form.feeTypes.facilityAgentFee && (
            <div>
              <label htmlFor="facilityAgentFeeAmount" className="block text-sm font-medium text-white mb-1">
                Facility Agent Fee Amount
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                id="facilityAgentFeeAmount"
                name="facilityAgentFeeAmount"
                value={form.facilityAgentFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919] outline-none"
                placeholder="Enter amount"
              />
            </div>
          )}

          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.securityAgentFee"
              name="feeTypes.securityAgentFee"
              checked={form.feeTypes.securityAgentFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.securityAgentFee" className="ml-2 block text-sm text-white">
              Security Agent Fee
            </label>
          </div> */}

          {form.feeTypes.securityAgentFee && (
            <div>
              <label htmlFor="securityAgentFeeAmount" className="block text-sm font-medium text-white mb-1">
                Security Agent Fee Amount
              </label>
              <input
                type="text"
                id="securityAgentFeeAmount"
                name="securityAgentFeeAmount"
                value={form.securityAgentFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasFacilityAgentOptions"
              name="hasFacilityAgentOptions"
              checked={form.hasFacilityAgentOptions}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasFacilityAgentOptions" className="ml-2 block text-sm text-white">
              Include Setup Fee, Increase Fee & Debtdomain Fee
            </label>
          </div>
        </div>

        {form.hasFacilityAgentOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-blue-100">
            <div>
              <label htmlFor="setupFeeAmount" className="block text-sm font-medium text-white mb-1">
                Setup Fee Amount
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                id="setupFeeAmount"
                name="setupFeeAmount"
                value={form.setupFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label htmlFor="increaseFeeAmount" className="block text-sm font-medium text-white mb-1">
                Increase Fee Amount
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                id="increaseFeeAmount"
                name="increaseFeeAmount"
                value={form.increaseFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label htmlFor="debtdomainFeeAmount" className="block text-sm font-medium text-white mb-1">
                Debtdomain Fee Amount
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                id="debtdomainFeeAmount"
                name="debtdomainFeeAmount"
                value={form.debtdomainFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label htmlFor="increaseCount" className="block text-sm font-medium text-white mb-1">
                Increase Count
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                id="increaseCount"
                name="increaseCount"
                value={form.increaseCount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter count"
              />
            </div>
          </div>
        )}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.globalCoordinatorFee"
              name="feeTypes.globalCoordinatorFee"
              checked={form.feeTypes.globalCoordinatorFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.globalCoordinatorFee" className="ml-2 block text-sm text-white">
              Global Coordinator Fee
            </label>
          </div>

          {form.feeTypes.globalCoordinatorFee && (
            <div>
              <label htmlFor="globalCoordinatorFeeAmount" className="block text-sm font-medium text-white mb-1">
                Global Coordinator Fee Amount
              </label>
              <input
                type="text"
                id="globalCoordinatorFeeAmount"
                name="globalCoordinatorFeeAmount"
                value={form.globalCoordinatorFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.coordinatingBankFee"
              name="feeTypes.coordinatingBankFee"
              checked={form.feeTypes.coordinatingBankFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.coordinatingBankFee" className="ml-2 block text-sm text-white">
              Coordinating Bank Fee
            </label>
          </div>

          {form.feeTypes.coordinatingBankFee && (
            <div>
              <label htmlFor="coordinatingBankFeeAmount" className="block text-sm font-medium text-white mb-1">
                Coordinating Bank Fee Amount
              </label>
              <input
                type="text"
                id="coordinatingBankFeeAmount"
                name="coordinatingBankFeeAmount"
                value={form.coordinatingBankFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.upfrontFee"
              name="feeTypes.upfrontFee"
              checked={form.feeTypes.upfrontFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.upfrontFee" className="ml-2 block text-sm text-white">
              Upfront Fee
            </label>
          </div>

          {form.feeTypes.upfrontFee && (
            <div>
              <label htmlFor="upfrontFeeAmount" className="block text-sm font-medium text-white mb-1">
                Upfront Fee Amount
              </label>
              <input
                type="text"
                id="upfrontFeeAmount"
                name="upfrontFeeAmount"
                value={form.upfrontFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.mandatedLeadArrangerFee"
              name="feeTypes.mandatedLeadArrangerFee"
              checked={form.feeTypes.mandatedLeadArrangerFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.mandatedLeadArrangerFee" className="ml-2 block text-sm text-white">
              Mandated Lead Arranger Fee
            </label>
          </div>

          {form.feeTypes.mandatedLeadArrangerFee && (
            <div>
              <label htmlFor="mandatedLeadArrangerFeeAmount" className="block text-sm font-medium text-white mb-1">
                Mandated Lead Arranger Fee Amount
              </label>
              <input
                type="text"
                id="mandatedLeadArrangerFeeAmount"
                name="mandatedLeadArrangerFeeAmount"
                value={form.mandatedLeadArrangerFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="feeTypes.arrangerFee"
              name="feeTypes.arrangerFee"
              checked={form.feeTypes.arrangerFee}
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="feeTypes.arrangerFee" className="ml-2 block text-sm text-white">
              Arranger Fee
            </label>
          </div>

          {form.feeTypes.arrangerFee && (
            <div>
              <label htmlFor="arrangerFeeAmount" className="block text-sm font-medium text-white mb-1">
                Arranger Fee Amount
              </label>
              <input
                type="text"
                id="arrangerFeeAmount"
                name="arrangerFeeAmount"
                value={form.arrangerFeeAmount}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#454545] text-[#FBFBFB] bg-[#191919]"
                placeholder="Enter amount"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeTypes;
