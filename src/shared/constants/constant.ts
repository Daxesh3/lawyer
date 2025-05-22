import { IFacilityUploadDetails } from '../../features/LetterCreation/interface/Letter.interface';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const API_VITE_API_FACILITY_FILE_UPLOAD = import.meta.env.VITE_API_FACILITY_FILE_UPLOAD || '';

export const facilityUploadDetails: IFacilityUploadDetails = {
  indexClauses: [
    {
      clause: 1,
      title: 'Definitions and Interpretation',
    },
    {
      clause: 2,
      title: 'Construction',
    },
    {
      clause: 3,
      title: 'Rights of Third Parties',
    },
    {
      clause: 12,
      title: 'Tax Gross Up and Indemnities',
    },
    {
      clause: 13,
      title: 'VAT',
    },
    {
      clause: 19,
      title: 'Governing Law',
    },
    {
      clause: 20,
      title: 'Enforcement',
    },
  ],
  definitions: ['Business Day', 'Finance Documents', 'Utilisation Request', 'Final Maturity Date', 'Tax', 'VAT'],
  variations: {
    'Finance Documents': 'Financing Documents',
    'Utilisation Request': 'Drawdown Notice',
    'Final Maturity Date': 'Termination Date',
  },
};
