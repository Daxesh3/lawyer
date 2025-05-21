export const LETTER_TYPES = [
  {
    id: 1,
    name: 'Letter of Credit',
  },
];

export const STEPS = [
  { label: 'Letter Type' },
  { label: 'Basic Information' },
  { label: 'Step 3' },
  { label: 'Step 4' },
];

export const INITIAL_FORM = {
  borrowerName: '',
  facilityAgentName: '',
  currency: 'USD',
  amount: '',
  facilityType: '',
  year: new Date().getFullYear().toString(),
};

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

export const LETTER_OPTIONS = [
  'Facility Agent Fee Letter',
  'Security Agent Fee Letter',
  'Global Co-Ordinator Fee Letter',
  'Co-Ordinating Bank Fee Letter',
  'Upfront Fee Letter',
  'Mandated Lead Arranger Fee Letter',
];
