import React, { createContext, useContext, useState } from 'react';

interface ICoverFormData {
  borrowerName: string;
  globalCoordinatorName: string;
  bookrunnerNames: string;
  facilityAgentName: string;
  currency: string;
  quantum: string;
  currencyType: 'Multicurrency' | 'Single Currency';
  facilityType: 'Revolving' | 'Term';
}

interface ILetterContext {
  coverFormData: ICoverFormData;
  setCoverFormData: (data: ICoverFormData) => void;
}

const LetterContext = createContext<ILetterContext | undefined>(undefined);

export const LetterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coverFormData, setCoverFormData] = useState<ICoverFormData>({
    borrowerName: '',
    globalCoordinatorName: '',
    bookrunnerNames: '',
    facilityAgentName: '',
    currency: '',
    quantum: '',
    currencyType: 'Single Currency',
    facilityType: 'Term',
  });

  return <LetterContext.Provider value={{ coverFormData, setCoverFormData }}>{children}</LetterContext.Provider>;
};

export const useLetterContext = () => {
  const context = useContext(LetterContext);
  if (context === undefined) {
    throw new Error('useLetterContext must be used within a LetterProvider');
  }
  return context;
};
