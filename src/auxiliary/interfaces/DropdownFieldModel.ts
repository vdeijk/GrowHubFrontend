import { DropdownOption } from './DropdownOptions';

export interface DropdownFieldModel {
  key: string;
  label: string;
  options: DropdownOption[] | (() => DropdownOption[]);
  defaultValue: string;
  required?: boolean;
}
