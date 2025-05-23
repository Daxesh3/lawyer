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

export interface ClauseSelection {
  clause: number;
  title: string;
}

interface ILetterContext {
  coverFormData: ICoverFormData;
  setCoverFormData: (data: ICoverFormData) => void;
  letterIndexSelections: (ClauseSelection | null)[];
  setLetterIndexSelections: (selections: (ClauseSelection | null)[]) => void;
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

  const [letterIndexSelections, setLetterIndexSelections] = useState<(ClauseSelection | null)[]>(Array(24).fill(null));

  return (
    <LetterContext.Provider
      value={{
        coverFormData,
        setCoverFormData,
        letterIndexSelections,
        setLetterIndexSelections,
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
