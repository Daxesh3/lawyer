import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { API_VITE_API_FACILITY_FILE_UPLOAD } from '../../../shared/constants/constant';
import { IFeeLetterData } from '../../../types/feeLetterTypes';
import FeeLetterOutput from '../../FeeLetter/components/FeeLetterOutput';
import BankDetails from '../components/BankDetails';
import BasicInformation from '../components/BasicInformation';
import FeeTypes from '../components/FeeTypes';
import OtherDetails from '../components/OtherDetails';
import PaymentModalities from '../components/PaymentModalities';
import { INITIAL_FORM, STEPS } from '../constants/Letter.constants';
import { IFacilityUploadDetails } from '../interface/Letter.interface';

const LetterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<IFeeLetterData>(INITIAL_FORM);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [facilityUploadDetails, setFacilityUploadDetails] = useState<IFacilityUploadDetails>();

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (form.facilityAgreementFile) {
      await handleFacilityAgreementUpload(form.facilityAgreementFile);
    }
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 7000));
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleFacilityAgreementUpload = async (file: File) => {
    if (!file) return;

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

      // Optionally update form state with uploaded file info here
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
        if (name.includes('.')) {
          const [parent, child] = name.split('.');
          setForm((prev) => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: isChecked,
            },
          }));
        } else {
          setForm((prev) => ({ ...prev, [name]: isChecked }));
        }
      } else if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setForm((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: e.target.value,
          },
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: e.target.value }));
      }
    } else {
      // If called directly with field and value
      const field = fieldOrEvent;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setForm((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      } else {
        setForm((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black">
      {!hasGenerated ? (
        <div
          className={`w-full max-w-4xl bg-[#3b3b3b] rounded-xl p-8 shadow-lg mt-12 min-h-[665px] flex flex-col justify-between relative`}
        >
          {isGenerating ? (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
                <p className="text-white text-lg font-medium">Generating Fee Letter...</p>
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
            {activeStep === 0 && <BasicInformation form={form} onChange={handleFormChange} />}
            {activeStep === 1 && <FeeTypes form={form} onChange={handleFormChange} />}
            {activeStep === 2 && <PaymentModalities form={form} onChange={handleFormChange} />}
            {activeStep === 3 && <BankDetails form={form} onChange={handleFormChange} />}
            {activeStep === 4 && <OtherDetails form={form} onChange={handleFormChange} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {activeStep > 0 ? (
              <button
                className="bg-gray-600 text-white px-8 py-2 rounded-lg font-semibold"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              >
                BACK
              </button>
            ) : (
              <div />
            )}
            {activeStep < 4 ? (
              <button
                className="bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold"
                onClick={() => {
                  setActiveStep((s) => Math.min(STEPS.length - 1, s + 1));
                }}
              >
                NEXT
              </button>
            ) : (
              <button
                className="bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Fee Letter'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <FeeLetterOutput
          data={form}
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
