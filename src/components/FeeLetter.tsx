import React, { useState } from 'react';
import FeeLetterForm from './FeeLetterForm';
import FeeLetterOutput from './FeeLetterOutput';
import { FeeLetterData } from '../types/feeLetterTypes';

const FeeLetter: React.FC = () => {
    const [feeLetterData, setFeeLetterData] = useState<FeeLetterData>({
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

    const handleFormChange = (newData: Partial<FeeLetterData>) => {
        setFeeLetterData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='bg-white rounded-lg shadow-md p-6 h-fit'>
                <h2 className='text-xl font-bold mb-6 text-blue-900'>Fee Letter Details</h2>
                <FeeLetterForm data={feeLetterData} onChange={handleFormChange} />
            </div>

            <div className='bg-white rounded-lg shadow-md p-6 h-fit sticky top-4'>
                <h2 className='text-xl font-bold mb-6 text-blue-900'>Generated Fee Letter</h2>
                <FeeLetterOutput data={feeLetterData} />
            </div>
        </div>
    );
};

export default FeeLetter;
