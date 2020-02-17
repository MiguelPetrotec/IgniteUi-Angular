import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  options?: Array<{ id: number, valor: string }>,
  placeholder?: string, 
  type: string,
  validation?: ValidatorFn[],   
  value?: any, 
  minDate: string,
  maxDate: string, 
} 
