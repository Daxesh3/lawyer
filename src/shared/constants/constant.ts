// export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
// export const API_VITE_API_FACILITY_FILE_UPLOAD = import.meta.env.VITE_API_FACILITY_FILE_UPLOAD || '';

export const API_BASE_URL = 'https://api-facex.9span.in';
export const API_VITE_API_FACILITY_FILE_UPLOAD = 'https://api-social-ai.9span.in/api/document/parse';
export const API_VITE_API_HTML_TO_DOC = 'https://api-social-ai.9span.in/api/document/html-to-docx';

export function formatToUSD(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
  const [integer, decimal] = numericValue.split('.');

  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
}

export const numberFields = [
  'setupFeeAmount',
  'debtdomainFeeAmount',
  'facilityAgentFeeAmount',
  'increaseFeeAmount',
  'upfrontFeeAmount',
  'mandatedLeadArrangerFeeAmount',
  'arrangerFeeAmount',
];
