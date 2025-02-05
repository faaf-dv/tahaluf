export interface IForm {
  formTitle: string;
  formControls: IFormControl[];
  saveBtnTitle?: string;
  resetBtnTitle?: string;
}

interface IFormControl {
  name: string;
  id: string;
  label?: string;
  value?: string;
  options?: IOption[];
  radioOptions?: string[];
  placeholder?: string;
  class?: string;
  type: FormControlType;
  validators?: IValidator[];
  border?: any;
  rows?: number;
  cols?: number;
  caption?: string;
}

interface IValidator {
  validatorName?: string;
  message?: string;
  required?: boolean;
  pattern?: string;
  minlength?: string;
  maxlength?: string;
  email?: string;
}

interface IOption {
  id?: number;
  value?: string;
}

export type FormControlType = 'textbox' | 'textarea' | 'button';
