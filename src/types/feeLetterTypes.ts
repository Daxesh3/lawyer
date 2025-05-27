export interface IFeeLetterData {
  borrowerName: string;
  facilityAgentName: string;
  securityAgentName: string;
  globalCoordinatorName: string;
  coordinatingBankName: string;
  currency: string;
  amount: string;
  facilityType: string;
  currentYear: string;
  letterType:
    | 'facilityAgent'
    | 'securityAgent'
    | 'globalCoordinator'
    | 'coordinatingBank'
    | 'upfront'
    | 'mandatedLeadArranger'
    | 'arranger';
  feeTypes: {
    facilityAgentFee: boolean;
    securityAgentFee: boolean;
    globalCoordinatorFee: boolean;
    coordinatingBankFee: boolean;
    upfrontFee: boolean;
    mandatedLeadArrangerFee: boolean;
    arrangerFee: boolean;
  };
  paymentModality: 'annual' | 'semiannual' | 'quarterly';
  businessDays: string;
  governingLaw: string;
  facilityAgentFeeAmount: string;
  securityAgentFeeAmount: string;
  globalCoordinatorFeeAmount: string;
  coordinatingBankFeeAmount: string;
  upfrontFeeAmount: string;
  mandatedLeadArrangerFeeAmount: string;
  arrangerFeeAmount: string;
  setupFeeAmount: string;
  increaseFeeAmount: string;
  debtdomainFeeAmount: string;
  increaseCount: string;
  hasFacilityAgentOptions: boolean;
  bankDetails: {
    accountBank: string;
    accountHolder: string;
    accountNumber: string;
    sortCode: string;
    iban: string;
    reference: string;
  };
  natureOfDocument: 'neutral' | 'bankFriendly' | 'borrowerFriendly';
  facilityAgreementUpload: string;
  facilityAgreementFile?: File;
  refundableTerms: 'refundable' | 'nonRefundable';
  [key: string]: any;
}
