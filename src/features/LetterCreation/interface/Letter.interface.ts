import { IFeeLetterData } from '../../../types/feeLetterTypes';

export interface IFeeTypesProps {
  form: IFeeLetterData;
  onChange: (field: string, value: string | boolean | number) => void;
}
