import { IFeeLetterData } from '../../../types/feeLetterTypes';

export interface IFeeTypesProps {
  screenIndex: number;
  form: IFeeLetterData;
  onChange: (field: string, value: string | boolean | number | File | null) => void;
}

export interface Clause {
  clause: number;
  title: string;
}

export interface IFacilityUploadDetails {
  indexClauses: Clause[];
  definitions: string[];
  variations: Record<string, string>;
  definitionsWithDetail: Record<string, string>;
}
