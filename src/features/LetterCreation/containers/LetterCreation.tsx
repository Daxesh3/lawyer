import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import letterGeneration from '../../../assets/Json/LetterGenerate.json';
import { API_VITE_API_FACILITY_FILE_UPLOAD, formatToUSD, numberFields } from '../../../shared/constants/constant';
import FeeLetterOutput from '../../FeeLetter/components/FeeLetterOutput';
import FeeTypes from '../components/FeeTypes';
import OtherDetails from '../components/OtherDetails';
import PaymentModalities from '../components/PaymentModalities';
import { STEPS } from '../constants/Letter.constants';
import { IFacilityUploadDetails } from '../interface/Letter.interface';
import { useLetterContext } from '../context/LetterContext';
import FeeLetterSelection from '../components/FeeLetterSelection';
import BankDetails from '../components/BankDetails';

const LetterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [facilityUploadDetails, setFacilityUploadDetails] = useState<IFacilityUploadDetails>();
  const { formData, updateFormField } = useLetterContext();

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (formData.facilityAgreementFile) {
      await handleFacilityAgreementUpload(formData.facilityAgreementFile);
    }
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 7000));
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleFacilityAgreementUpload = async (file: File) => {
    if (!file || file) return;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(API_VITE_API_FACILITY_FILE_UPLOAD, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data: IFacilityUploadDetails = await response.json();
      setFacilityUploadDetails(data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleFormChange = (
    fieldOrEvent: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: string | boolean | number | File | null
  ) => {
    // If called as an event handler
    if (typeof fieldOrEvent !== 'string') {
      const e = fieldOrEvent;
      const { name, type } = e.target;
      if (type === 'checkbox') {
        const isChecked = (e.target as HTMLInputElement).checked;
        updateFormField(name, isChecked);
      } else {
        const isNumField = numberFields.includes(name);
        updateFormField(name, isNumField ? formatToUSD(e.target.value) : e.target.value);
      }
    } else {
      const isNumField = numberFields.includes(fieldOrEvent);
      // If called directly with field and value
      updateFormField(fieldOrEvent, (isNumField ? formatToUSD(value as string) : value) ?? null);
    }
  };

  const handleDisable = (): boolean => {
    switch (activeStep) {
      case 0: {
        return !formData.letterType;
      }
      case 1: {
        const hasAnyFeeType = Object.values(formData.feeTypes).some((value) => value);
        if (!hasAnyFeeType) return true;

        // Check if any selected fee type has an amount
        const hasFeeAmount = Object.entries(formData.feeTypes).some(([key, value]) => {
          if (!value) return false;
          const amountField = `${key.replace('feeTypes.', '')}Amount`;
          return !formData[amountField];
        });

        // Only validate additional fee fields if hasFacilityAgentOptions is checked
        if (formData.hasFacilityAgentOptions) {
          const additionalFeeFields = ['setupFeeAmount', 'increaseFeeAmount', 'debtdomainFeeAmount', 'increaseCount'];
          const hasAdditionalFeeAmount = additionalFeeFields.some((field) => !formData[field]);
          return hasFeeAmount || hasAdditionalFeeAmount;
        }

        return hasFeeAmount;
      }
      case 2: {
        const paymentFields = ['paymentModality', 'businessDays', 'governingLaw'];
        return paymentFields.some((field) => !formData[field as keyof typeof formData]);
      }
      case 3: {
        const bankFields = ['accountBank', 'accountHolder', 'accountNumber', 'sortCode', 'iban'];
        return bankFields.some((field) => !formData.bankDetails[field as keyof typeof formData.bankDetails]);
      }
      case 4: {
        const otherFields = ['natureOfDocument'];
        const hasRequiredFields = otherFields.some((field) => !formData[field as keyof typeof formData]);
        return hasRequiredFields;
      }
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black">
      {!hasGenerated ? (
        <div
          className={`w-full max-w-5xl bg-[#3b3b3b] rounded-xl p-8 shadow-lg mt-12 min-h-[665px] flex flex-col justify-between relative`}
        >
          {isGenerating ? (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-black drop-shadow-[0_6px_12px_rgba(255,255,255,0.4)] p-20 rounded-md">
                <p className="text-white text-sm font-bold text-center">Letter generation is in progress.</p>
                <p className="text-white text-sm font-bold text-center mt-3">Please wait...</p>
                <Lottie animationData={letterGeneration} loop={true} style={{ width: '400px' }} />
              </div>
            </div>
          ) : null}
          <div>
            {/* Stepper */}
            <div className="flex items-center mb-8 w-full">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.label}>
                  <motion.div
                    layout
                    initial={false}
                    animate={{
                      backgroundColor: idx <= activeStep ? '#60a5fa' : '#374151',
                      scaleX: idx <= activeStep ? 1 : 0.97,
                      originX: idx <= activeStep ? 0 : 1,
                    }}
                    transition={{
                      backgroundColor: {
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: 0.4,
                      },
                      scaleX: {
                        type: 'spring',
                        stiffness: 35,
                        damping: 8,
                        mass: 0.8,
                        restDelta: 0.001,
                      },
                    }}
                    className={`h-1 rounded-full flex-1 origin-left ${idx !== 0 ? 'ml-4' : ''}`}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            {activeStep === 0 && <FeeLetterSelection form={formData} onChange={handleFormChange} screenIndex={1} />}
            {activeStep === 1 && <FeeTypes form={formData} onChange={handleFormChange} screenIndex={2} />}
            {activeStep === 2 && <PaymentModalities form={formData} onChange={handleFormChange} screenIndex={3} />}
            {activeStep === 3 && <BankDetails form={formData} onChange={handleFormChange} screenIndex={4} />}
            {activeStep === 4 && <OtherDetails form={formData} onChange={handleFormChange} screenIndex={5} />}
          </div>

          {/* Navigation Buttons */}
          <div className={`flex mt-8 justify-between`}>
            {activeStep > 0 ? (
              <button
                className="bg-gray-600 text-white px-8 py-2 rounded-lg font-semibold"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                BACK
              </button>
            ) : (
              <div />
            )}
            {activeStep < STEPS.length - 1 ? (
              <button
                className={`bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold ${
                  handleDisable() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => setActiveStep((prev) => prev + 1)}
                disabled={handleDisable()}
              >
                Next
              </button>
            ) : (
              <button
                className={`bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold ${
                  handleDisable() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleGenerate}
                disabled={handleDisable()}
              >
                Generate Fee Letter
              </button>
            )}
          </div>
        </div>
      ) : (
        <FeeLetterOutput
          isGenerating={isGenerating}
          hasGenerated={hasGenerated}
          facilityUploadDetails={facilityUploadDetails as IFacilityUploadDetails}
          setHasGenerated={setHasGenerated}
        />
      )}
    </div>
  );
};

export default LetterCreation;
