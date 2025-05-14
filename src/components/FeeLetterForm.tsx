import React from 'react';
import { FeeLetterData } from '../types/feeLetterTypes';

interface FeeLetterFormProps {
    data: FeeLetterData;
    onChange: (newData: Partial<FeeLetterData>) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const FeeLetterForm: React.FC<FeeLetterFormProps> = ({ data, onChange, onGenerate, isGenerating }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            const isChecked = checkbox.checked;

            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                onChange({
                    [parent]: {
                        ...data[parent as keyof FeeLetterData],
                        [child]: isChecked,
                    },
                });
            } else {
                onChange({ [name]: isChecked });
            }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            onChange({
                [parent]: {
                    ...data[parent as keyof FeeLetterData],
                    [child]: value,
                },
            });
        } else {
            onChange({ [name]: value });
        }
    };

    const handleLetterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLetterType = e.target.value as FeeLetterData['letterType'];

        // Reset all fee types
        const updatedFeeTypes = {
            facilityAgentFee: false,
            securityAgentFee: false,
            globalCoordinatorFee: false,
            coordinatingBankFee: false,
            upfrontFee: false,
            mandatedLeadArrangerFee: false,
            arrangerFee: false,
        };

        // Set the corresponding fee type to true based on letter type
        switch (newLetterType) {
            case 'facilityAgent':
                updatedFeeTypes.facilityAgentFee = true;
                break;
            case 'securityAgent':
                updatedFeeTypes.securityAgentFee = true;
                break;
            case 'globalCoordinator':
                updatedFeeTypes.globalCoordinatorFee = true;
                break;
            case 'coordinatingBank':
                updatedFeeTypes.coordinatingBankFee = true;
                break;
            case 'upfront':
                updatedFeeTypes.upfrontFee = true;
                break;
            case 'mandatedLeadArranger':
                updatedFeeTypes.mandatedLeadArrangerFee = true;
                break;
            case 'arranger':
                updatedFeeTypes.arrangerFee = true;
                break;
            default:
                break;
        }

        onChange({
            letterType: newLetterType,
            feeTypes: updatedFeeTypes,
        });
    };

    return (
        <>
            <form className='space-y-6'>
                <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Letter Type</h3>

                    <div>
                        <label htmlFor='letterType' className='block text-sm font-medium text-gray-700 mb-1'>
                            Q.1 Type of Letter
                        </label>
                        <select
                            id='letterType'
                            name='letterType'
                            value={data.letterType}
                            onChange={handleLetterTypeChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='facilityAgent'>Facility Agent Fee Letter</option>
                            <option value='securityAgent'>Security Agent Fee Letter</option>
                            <option value='globalCoordinator'>Global Co-Ordinator Fee Letter</option>
                            <option value='coordinatingBank'>Co-Ordinating Bank Fee Letter</option>
                            <option value='upfront'>Upfront Fee Letter</option>
                            <option value='mandatedLeadArranger'>Mandated Lead Arranger Fee Letter</option>
                            <option value='arranger'>Arranger Fee Letter</option>
                        </select>
                    </div>

                    <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Basic Information</h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='borrowerName' className='block text-sm font-medium text-gray-700 mb-1'>
                                Q.2 Borrower Name
                            </label>
                            <input
                                type='text'
                                id='borrowerName'
                                name='borrowerName'
                                value={data.borrowerName}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter borrower name'
                            />
                        </div>

                        {(data.letterType === 'facilityAgent' ||
                            data.letterType === 'upfront' ||
                            data.letterType === 'mandatedLeadArranger' ||
                            data.letterType === 'arranger') && (
                            <div>
                                <label htmlFor='facilityAgentName' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Q.3 Facility Agent Name
                                </label>
                                <input
                                    type='text'
                                    id='facilityAgentName'
                                    name='facilityAgentName'
                                    value={data.facilityAgentName}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter facility agent name'
                                />
                            </div>
                        )}

                        {data.letterType === 'securityAgent' && (
                            <div>
                                <label htmlFor='securityAgentName' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Security Agent Name
                                </label>
                                <input
                                    type='text'
                                    id='securityAgentName'
                                    name='securityAgentName'
                                    value={data.securityAgentName}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter security agent name'
                                />
                            </div>
                        )}

                        {data.letterType === 'globalCoordinator' && (
                            <div>
                                <label htmlFor='globalCoordinatorName' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Q.2 Global Co-Ordinator Name
                                </label>
                                <input
                                    type='text'
                                    id='globalCoordinatorName'
                                    name='globalCoordinatorName'
                                    value={data.globalCoordinatorName}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter global co-ordinator name'
                                />
                            </div>
                        )}

                        {data.letterType === 'coordinatingBank' && (
                            <div>
                                <label htmlFor='coordinatingBankName' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Q.2 Co-Ordinating Bank Name
                                </label>
                                <input
                                    type='text'
                                    id='coordinatingBankName'
                                    name='coordinatingBankName'
                                    value={data.coordinatingBankName}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter co-ordinating bank name'
                                />
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <label htmlFor='currency' className='block text-sm font-medium text-gray-700 mb-1'>
                                Q.3 Currency
                            </label>
                            <select
                                id='currency'
                                name='currency'
                                value={data.currency}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                                <option value='GBP'>GBP</option>
                                <option value='JPY'>JPY</option>
                                <option value='CHF'>CHF</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='amount' className='block text-sm font-medium text-gray-700 mb-1'>
                                Amount
                            </label>
                            <input
                                type='text'
                                id='amount'
                                name='amount'
                                value={data.amount}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter amount'
                            />
                        </div>

                        <div>
                            <label htmlFor='facilityType' className='block text-sm font-medium text-gray-700 mb-1'>
                                Q.4 Type of Facility
                            </label>
                            <input
                                type='text'
                                id='facilityType'
                                name='facilityType'
                                value={data.facilityType}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='E.g., Single Currency'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='currentYear' className='block text-sm font-medium text-gray-700 mb-1'>
                            Current Year
                        </label>
                        <input
                            type='text'
                            id='currentYear'
                            name='currentYear'
                            value={data.currentYear}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter current year'
                        />
                    </div>
                </div>

                <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Fee Types</h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.facilityAgentFee'
                                name='feeTypes.facilityAgentFee'
                                checked={data.feeTypes.facilityAgentFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.facilityAgentFee' className='ml-2 block text-sm text-gray-700'>
                                Facility Agent Fee (Q.5)
                            </label>
                        </div>

                        {data.feeTypes.facilityAgentFee && (
                            <div>
                                <label htmlFor='facilityAgentFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Facility Agent Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='facilityAgentFeeAmount'
                                    name='facilityAgentFeeAmount'
                                    value={data.facilityAgentFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}

                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.securityAgentFee'
                                name='feeTypes.securityAgentFee'
                                checked={data.feeTypes.securityAgentFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.securityAgentFee' className='ml-2 block text-sm text-gray-700'>
                                Security Agent Fee (Q.6)
                            </label>
                        </div>

                        {data.feeTypes.securityAgentFee && (
                            <div>
                                <label htmlFor='securityAgentFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Security Agent Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='securityAgentFeeAmount'
                                    name='securityAgentFeeAmount'
                                    value={data.securityAgentFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='hasFacilityAgentOptions'
                                name='hasFacilityAgentOptions'
                                checked={data.hasFacilityAgentOptions}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='hasFacilityAgentOptions' className='ml-2 block text-sm text-gray-700'>
                                Include Setup Fee, Increase Fee & Debtdomain Fee (Q.5)
                            </label>
                        </div>
                    </div>

                    {data.hasFacilityAgentOptions && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-blue-100'>
                            <div>
                                <label htmlFor='setupFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Setup Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='setupFeeAmount'
                                    name='setupFeeAmount'
                                    value={data.setupFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>

                            <div>
                                <label htmlFor='increaseFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Increase Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='increaseFeeAmount'
                                    name='increaseFeeAmount'
                                    value={data.increaseFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>

                            <div>
                                <label htmlFor='debtdomainFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Debtdomain Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='debtdomainFeeAmount'
                                    name='debtdomainFeeAmount'
                                    value={data.debtdomainFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>

                            <div>
                                <label htmlFor='increaseCount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Increase Count
                                </label>
                                <input
                                    type='text'
                                    id='increaseCount'
                                    name='increaseCount'
                                    value={data.increaseCount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter count'
                                />
                            </div>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.globalCoordinatorFee'
                                name='feeTypes.globalCoordinatorFee'
                                checked={data.feeTypes.globalCoordinatorFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.globalCoordinatorFee' className='ml-2 block text-sm text-gray-700'>
                                Global Coordinator Fee (Q.7)
                            </label>
                        </div>

                        {data.feeTypes.globalCoordinatorFee && (
                            <div>
                                <label htmlFor='globalCoordinatorFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Global Coordinator Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='globalCoordinatorFeeAmount'
                                    name='globalCoordinatorFeeAmount'
                                    value={data.globalCoordinatorFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}

                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.coordinatingBankFee'
                                name='feeTypes.coordinatingBankFee'
                                checked={data.feeTypes.coordinatingBankFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.coordinatingBankFee' className='ml-2 block text-sm text-gray-700'>
                                Coordinating Bank Fee (Q.8)
                            </label>
                        </div>

                        {data.feeTypes.coordinatingBankFee && (
                            <div>
                                <label htmlFor='coordinatingBankFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Coordinating Bank Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='coordinatingBankFeeAmount'
                                    name='coordinatingBankFeeAmount'
                                    value={data.coordinatingBankFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.upfrontFee'
                                name='feeTypes.upfrontFee'
                                checked={data.feeTypes.upfrontFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.upfrontFee' className='ml-2 block text-sm text-gray-700'>
                                Upfront Fee (Q.9)
                            </label>
                        </div>

                        {data.feeTypes.upfrontFee && (
                            <div>
                                <label htmlFor='upfrontFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Upfront Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='upfrontFeeAmount'
                                    name='upfrontFeeAmount'
                                    value={data.upfrontFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}

                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.mandatedLeadArrangerFee'
                                name='feeTypes.mandatedLeadArrangerFee'
                                checked={data.feeTypes.mandatedLeadArrangerFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.mandatedLeadArrangerFee' className='ml-2 block text-sm text-gray-700'>
                                Mandated Lead Arranger Fee (Q.10)
                            </label>
                        </div>

                        {data.feeTypes.mandatedLeadArrangerFee && (
                            <div>
                                <label htmlFor='mandatedLeadArrangerFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Mandated Lead Arranger Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='mandatedLeadArrangerFeeAmount'
                                    name='mandatedLeadArrangerFeeAmount'
                                    value={data.mandatedLeadArrangerFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='feeTypes.arrangerFee'
                                name='feeTypes.arrangerFee'
                                checked={data.feeTypes.arrangerFee}
                                onChange={handleInputChange}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor='feeTypes.arrangerFee' className='ml-2 block text-sm text-gray-700'>
                                Arranger Fee (Q.11)
                            </label>
                        </div>

                        {data.feeTypes.arrangerFee && (
                            <div>
                                <label htmlFor='arrangerFeeAmount' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Arranger Fee Amount
                                </label>
                                <input
                                    type='text'
                                    id='arrangerFeeAmount'
                                    name='arrangerFeeAmount'
                                    value={data.arrangerFeeAmount}
                                    onChange={handleInputChange}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter amount'
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Payment Modalities</h3>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Payment Schedule</label>
                        <div className='space-x-4'>
                            <label className='inline-flex items-center'>
                                <input
                                    type='radio'
                                    name='paymentModality'
                                    value='annual'
                                    checked={data.paymentModality === 'annual'}
                                    onChange={handleInputChange}
                                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                                />
                                <span className='ml-2 text-sm text-gray-700'>Annual</span>
                            </label>

                            <label className='inline-flex items-center'>
                                <input
                                    type='radio'
                                    name='paymentModality'
                                    value='semiannual'
                                    checked={data.paymentModality === 'semiannual'}
                                    onChange={handleInputChange}
                                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                                />
                                <span className='ml-2 text-sm text-gray-700'>Semi-Annual</span>
                            </label>

                            <label className='inline-flex items-center'>
                                <input
                                    type='radio'
                                    name='paymentModality'
                                    value='quarterly'
                                    checked={data.paymentModality === 'quarterly'}
                                    onChange={handleInputChange}
                                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                                />
                                <span className='ml-2 text-sm text-gray-700'>Quarterly</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='businessDays' className='block text-sm font-medium text-gray-700 mb-1'>
                            Q.12 Business Days Prior Notice
                        </label>
                        <input
                            type='text'
                            id='businessDays'
                            name='businessDays'
                            value={data.businessDays}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter business days'
                        />
                    </div>
                </div>

                <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Q.13 Bank Details</h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='bankDetails.accountBank' className='block text-sm font-medium text-gray-700 mb-1'>
                                Account Bank
                            </label>
                            <input
                                type='text'
                                id='bankDetails.accountBank'
                                name='bankDetails.accountBank'
                                value={data.bankDetails.accountBank}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter account bank'
                            />
                        </div>

                        <div>
                            <label htmlFor='bankDetails.accountHolder' className='block text-sm font-medium text-gray-700 mb-1'>
                                Account Holder
                            </label>
                            <input
                                type='text'
                                id='bankDetails.accountHolder'
                                name='bankDetails.accountHolder'
                                value={data.bankDetails.accountHolder}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter account holder'
                            />
                        </div>

                        <div>
                            <label htmlFor='bankDetails.accountNumber' className='block text-sm font-medium text-gray-700 mb-1'>
                                Account Number
                            </label>
                            <input
                                type='text'
                                id='bankDetails.accountNumber'
                                name='bankDetails.accountNumber'
                                value={data.bankDetails.accountNumber}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter account number'
                            />
                        </div>

                        <div>
                            <label htmlFor='bankDetails.sortCode' className='block text-sm font-medium text-gray-700 mb-1'>
                                Sort Code
                            </label>
                            <input
                                type='text'
                                id='bankDetails.sortCode'
                                name='bankDetails.sortCode'
                                value={data.bankDetails.sortCode}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter sort code'
                            />
                        </div>

                        <div>
                            <label htmlFor='bankDetails.iban' className='block text-sm font-medium text-gray-700 mb-1'>
                                IBAN
                            </label>
                            <input
                                type='text'
                                id='bankDetails.iban'
                                name='bankDetails.iban'
                                value={data.bankDetails.iban}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter IBAN'
                            />
                        </div>

                        <div>
                            <label htmlFor='bankDetails.reference' className='block text-sm font-medium text-gray-700 mb-1'>
                                Reference
                            </label>
                            <input
                                type='text'
                                id='bankDetails.reference'
                                name='bankDetails.reference'
                                value={data.bankDetails.reference}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Enter reference'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor='governingLaw' className='block text-sm font-medium text-gray-700 mb-1'>
                        Q.14 Should a standalone Gross Up provision be included or should cross reference be made to the Facility Agreement?
                    </label>
                    <input
                        type='text'
                        // id='governingLaw'
                        // name='governingLaw'
                        // value={data.governingLaw}
                        // onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter Gross Up provision'
                    />
                </div>
                <div>
                    <label htmlFor='governingLaw' className='block text-sm font-medium text-gray-700 mb-1'>
                        Q.15 Should a standalone VAT provision be included or should cross reference be made to the Facility Agreement?
                    </label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter VAT provision'
                    />
                </div>
                <div>
                    <label htmlFor='governingLaw' className='block text-sm font-medium text-gray-700 mb-1'>
                        Q.16 Governing Law
                    </label>
                    <input
                        type='text'
                        id='governingLaw'
                        name='governingLaw'
                        value={data.governingLaw}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter governing law'
                    />
                </div>
                <div>
                    <label htmlFor='governingLaw' className='block text-sm font-medium text-gray-700 mb-1'>
                        Q.17 Should a standalone Jurisdiction provision be included or should cross reference be made to the Facility Agreement?
                    </label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter Jurisdiction provision'
                    />
                </div>
            </form>
            <div className='mt-6 flex justify-end'>
                <button
                    type='button'
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className={`px-6 py-2 rounded-md text-white font-medium ${
                        isGenerating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                >
                    {isGenerating ? 'Generating...' : 'Generate Fee Letter'}
                </button>
            </div>
        </>
    );
};

export default FeeLetterForm;
