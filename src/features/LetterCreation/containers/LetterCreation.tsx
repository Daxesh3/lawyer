import React, { useState } from 'react';
import { IFeeLetterData } from '../../../types/feeLetterTypes';
import BankDetails from '../components/BankDetails';
import BasicInformation from '../components/BasicInformation';
import FeeTypes from '../components/FeeTypes';
import LetterTypeStep from '../components/LetterType';
import PaymentModalities from '../components/PaymentModalities';
import { INITIAL_FORM, STEPS } from '../constants/Letter.constants';

const LetterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [form, setForm] = useState<IFeeLetterData>(INITIAL_FORM);

  const handleFormChange = (
    fieldOrEvent: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    value?: string | boolean | number
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
      <div className="w-full max-w-4xl bg-[#232323] rounded-xl p-8 shadow-lg mt-12 min-h-[665px] flex flex-col justify-between">
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
          {activeStep === 2 && <FeeTypes form={form} onChange={handleFormChange} />}
          {activeStep === 3 && <PaymentModalities form={form} onChange={handleFormChange} />}
          {activeStep === 4 && <BankDetails form={form} onChange={handleFormChange} />}
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
