import React, { useState } from 'react';
import FeeLetterForm from './FeeLetterForm';
import FeeLetterOutput from './FeeLetterOutput';
import { IFeeLetterData } from '../../../types/feeLetterTypes';
import { IFacilityUploadDetails } from '../../LetterCreation/interface/Letter.interface';

const FeeLetter: React.FC = () => {
  const [feeLetterData, setFeeLetterData] = useState<IFeeLetterData>({
    borrowerName: '',
    facilityAgentName: '',
    securityAgentName: '',
    globalCoordinatorName: '',
    coordinatingBankName: '',
    currency: 'USD',
    amount: '',
    facilityType: '',
    currentYear: new Date().getFullYear().toString(),
    letterType: 'facilityAgent',
    feeTypes: {
      facilityAgentFee: true,
      securityAgentFee: false,
      globalCoordinatorFee: false,
      coordinatingBankFee: false,
      upfrontFee: false,
      mandatedLeadArrangerFee: false,
      arrangerFee: false,
    },
    paymentModality: 'annual',
    businessDays: '3',
    governingLaw: 'English',
    facilityAgentFeeAmount: '',
    securityAgentFeeAmount: '',
    globalCoordinatorFeeAmount: '',
    coordinatingBankFeeAmount: '',
    upfrontFeeAmount: '',
    mandatedLeadArrangerFeeAmount: '',
    arrangerFeeAmount: '',
    setupFeeAmount: '',
    increaseFeeAmount: '',
    debtdomainFeeAmount: '',
    increaseCount: '1',
    hasFacilityAgentOptions: true,
    bankDetails: {
      accountBank: '',
      accountHolder: '',
      accountNumber: '',
      sortCode: '',
      iban: '',
      reference: '',
    },
    natureOfDocument: 'neutral',
    facilityAgreementUpload: '',
    indexClauses: [],
    definitions: [],
    variations: {},
    definitionsWithDetail: {},
    refundableTerms: 'refundable',
    jurisdictionProvision: 'Standalone',
    vatProvision: 'Standalone',
    grossUpProvision: 'Standalone',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleFormChange = (newData: Partial<IFeeLetterData>) => {
    setFeeLetterData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    // Reset hasGenerated when form data changes
    setHasGenerated(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 7000));
    setIsGenerating(false);
    setHasGenerated(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Fee Letter Details</h2>
        <FeeLetterForm
          data={feeLetterData}
          onChange={handleFormChange}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Generated Fee Letter</h2>
        <FeeLetterOutput
          isGenerating={isGenerating}
          hasGenerated={hasGenerated}
          setHasGenerated={setHasGenerated}
          facilityUploadDetails={{} as IFacilityUploadDetails}
        />
      </div>
    </div>
  );
};

export default FeeLetter;
