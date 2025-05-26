import React, { createContext, useContext, useState } from 'react';
import { IFeeLetterData } from '../../../types/feeLetterTypes';
import { INITIAL_FORM } from '../constants/Letter.constants';

interface ICoverFormData {
  borrowerName: string;
  globalCoordinatorName: string;
  bookrunnerNames: string;
  facilityAgentName: string;
  currency: string;
  amount: string;
  facilityType: 'Multicurrency' | 'Single Currency';
  termType: 'Revolving' | 'Term';
}

export interface ClauseSelection {
  clause: number;
  title: string;
}

interface ILetterContext {
  coverFormData: ICoverFormData;
  setCoverFormData: (data: ICoverFormData) => void;
  letterIndexSelections: (ClauseSelection | null)[];
  setLetterIndexSelections: (selections: (ClauseSelection | null)[]) => void;
  formData: IFeeLetterData;
  setFormData: (data: IFeeLetterData) => void;
  updateFormField: (field: string, value: string | boolean | number | File | null) => void;
}

const LetterContext = createContext<ILetterContext | undefined>(undefined);

export const LetterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coverFormData, setCoverFormData] = useState<ICoverFormData>({
    borrowerName: '',
    globalCoordinatorName: '',
    bookrunnerNames: '',
    facilityAgentName: '',
    currency: '',
    amount: '',
    facilityType: 'Single Currency',
    termType: 'Term',
  });

  const [letterIndexSelections, setLetterIndexSelections] = useState<(ClauseSelection | null)[]>(Array(24).fill(null));
  const [formData, setFormData] = useState<IFeeLetterData>(INITIAL_FORM);

  const updateFormField = (field: string, value: string | boolean | number | File | null) => {
    setFormData((prev) => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof IFeeLetterData],
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <LetterContext.Provider
      value={{
        coverFormData,
        setCoverFormData,
        letterIndexSelections,
        setLetterIndexSelections,
        formData,
        setFormData,
        updateFormField,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
};

export const useLetterContext = () => {
  const context = useContext(LetterContext);
  if (context === undefined) {
    throw new Error('useLetterContext must be used within a LetterProvider');
  }
  return context;
};
