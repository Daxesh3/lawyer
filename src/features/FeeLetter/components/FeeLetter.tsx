import React, { useState, useCallback, useMemo } from 'react';
import FeeLetterForm from './FeeLetterForm';
import FeeLetterOutput from './FeeLetterOutput';
import { IFeeLetterData } from '../../../types/feeLetterTypes';

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
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleFormChange = useCallback((newData: Partial<IFeeLetterData>) => {
    setFeeLetterData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    setHasGenerated(false);
  }, []);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Add your actual API call here instead of the timeout
      // await generateFeeLetter(feeLetterData);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating fee letter:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [feeLetterData]);

  const memoizedFeeLetterForm = useMemo(
    () => (
      <FeeLetterForm
        data={feeLetterData}
        onChange={handleFormChange}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
    ),
    [feeLetterData, handleFormChange, handleGenerate, isGenerating]
  );

  const memoizedFeeLetterOutput = useMemo(
    () => <FeeLetterOutput data={feeLetterData} isGenerating={isGenerating} hasGenerated={hasGenerated} />,
    [feeLetterData, isGenerating, hasGenerated]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Fee Letter Details</h2>
        {memoizedFeeLetterForm}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Generated Fee Letter</h2>
        {memoizedFeeLetterOutput}
      </div>
    </div>
  );
};

export default React.memo(FeeLetter);
