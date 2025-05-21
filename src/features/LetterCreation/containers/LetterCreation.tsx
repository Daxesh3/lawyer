// src/features/LetterCreation/containers/LetterCreation.tsx
import React, { useState } from 'react';
import LetterTypeStep from '../components/letterType';

const steps = [{ label: 'Letter Type' }, { label: 'Step 2' }, { label: 'Step 3' }, { label: 'Step 4' }];

const LetterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-4xl bg-[#232323] rounded-xl p-8 shadow-lg mt-12 min-h-[calc(100vh-270px)] h-[665px] flex flex-col justify-between">
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {steps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-1 rounded-full ${idx <= activeStep ? 'bg-blue-400' : 'bg-gray-700'}`} />
                </div>
                {idx < steps.length - 1 && <div className="flex-1 h-1 bg-gray-700 mx-1" />}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          {activeStep === 0 && <LetterTypeStep selected={selectedType} onSelect={setSelectedType} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            className="bg-gray-600 text-white px-12 py-4 rounded-lg font-semibold"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
          >
            BACK
          </button>
          <button
            className="bg-blue-400 text-white px-12 py-4 rounded-lg font-semibold"
            onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterCreation;
