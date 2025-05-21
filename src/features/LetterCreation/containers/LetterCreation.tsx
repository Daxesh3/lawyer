// src/features/LetterCreation/containers/LetterCreation.tsx
import React, { useState } from 'react';
import LetterTypeStep from '../components/LetterType';
import BasicInformation from '../components/BasicInformation';
import { INITIAL_FORM, STEPS } from '../constants/Letter.constants';

const LetterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [form, setForm] = useState(INITIAL_FORM);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-4xl bg-[#232323] rounded-xl p-8 shadow-lg mt-12 min-h-[calc(100vh-270px)] h-[665px] flex flex-col justify-between">
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-1 rounded-full ${idx <= activeStep ? 'bg-blue-400' : 'bg-gray-700'}`} />
                </div>
                {idx < STEPS.length - 1 && <div className="flex-1 h-1 bg-gray-700 mx-1" />}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          {activeStep === 0 && <LetterTypeStep selected={selectedType} onSelect={setSelectedType} />}
          {activeStep === 1 && <BasicInformation form={form} onChange={handleFormChange} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            className="bg-gray-600 text-white px-8 py-2 rounded-lg font-semibold"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
          >
            BACK
          </button>
          <button
            className="bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold"
            onClick={() => {
              setActiveStep((s) => Math.min(STEPS.length - 1, s + 1));
              console.log('first', form);
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterCreation;
