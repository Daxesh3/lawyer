import React from 'react';
import { IFeeTypesProps } from '../interface/Letter.interface';

const feeLetterMapping: Record<string, string> = {
  'Facility Agent Fee Letter': 'facilityAgent',
  'Security Agent Fee Letter': 'securityAgent',
  'Global Coordinator Fee Letter': 'globalCoordinator',
  'Mandated Lead Arrange Fee Letter': 'mandatedLeadArranger',
  'Upfront Fee Letter': 'upfront',
};

const FeeLetterSelection: React.FC<IFeeTypesProps> = ({ form, onChange, screenIndex }) => {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step {screenIndex}.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Fee Letter Type</h2>
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          What kind of Fee Letter do you want to Draft?
          <span className="text-red-500 text-xs align-super ml-1">*</span>
        </label>
        <div className="my-2">
          {Object.entries(feeLetterMapping).map(([label, value]) => (
            <label key={value} className="block text-white mr-4 mb-4 cursor-pointer">
              <input
                type="radio"
                name="letterType"
                value={value}
                checked={form.letterType === value}
                onChange={(e) => onChange('letterType', e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-white">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeLetterSelection;
