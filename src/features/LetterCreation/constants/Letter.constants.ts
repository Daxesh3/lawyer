import { IFeeLetterData } from '../../../types/feeLetterTypes';

export const LETTER_TYPES = [
  {
    id: 1,
    name: 'Letter of Credit',
  },
];

export const STEPS = [
  { label: 'Basic Information' },
  { label: 'Fee Types' },
  { label: 'Payment Modalities' },
  { label: 'Bank Details' },
  { label: 'Other Details' },
];

export const INITIAL_FORM: IFeeLetterData = {
  borrowerName: '',
  facilityAgentName: '',
  securityAgentName: '',
  globalCoordinatorName: '',
  coordinatingBankName: '',
  currency: 'USD',
  amount: '',
  facilityType: '',
  currentYear: new Date().getFullYear().toString(),
  letterType: 'facilityAgent',
  feeTypes: {
    facilityAgentFee: true,
    securityAgentFee: false,
    globalCoordinatorFee: false,
    coordinatingBankFee: false,
    upfrontFee: false,
    mandatedLeadArrangerFee: false,
    arrangerFee: false,
  },
  paymentModality: 'annual',
  businessDays: '3',
  governingLaw: 'English',
  facilityAgentFeeAmount: '',
  securityAgentFeeAmount: '',
  globalCoordinatorFeeAmount: '',
  coordinatingBankFeeAmount: '',
  upfrontFeeAmount: '',
  mandatedLeadArrangerFeeAmount: '',
  arrangerFeeAmount: '',
  setupFeeAmount: '',
  increaseFeeAmount: '',
  debtdomainFeeAmount: '',
  increaseCount: '1',
  hasFacilityAgentOptions: true,
  bankDetails: {
    accountBank: '',
    accountHolder: '',
    accountNumber: '',
    sortCode: '',
    iban: '',
    reference: '',
  },
  natureOfDocument: 'neutral',
  facilityAgreementUpload: '',
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

export const CARD_OPTIONS = [
  'Facility Agreement',
  'Guarantee',
  'Security Assignment',
  'Bank Account Charge',
  'Fee Letters',
  'Conditions Precedent',
];
