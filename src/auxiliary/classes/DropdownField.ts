import { FormField } from './FormField';
import { DropdownOption } from '../interfaces/DropdownOptions';

export class DropdownField<T> extends FormField<T> {
  options: DropdownOption[] = [];

  constructor(
    value: T,
    label: string,
    required: boolean = false,
    options: DropdownOption[] = [],
  ) {
    super(value, label, required);

    this.options = options;
  }

  public generateDropdownOptions(
    options: DropdownOption[],
    placeholderLabel: string = '',
  ): void {
    const placeholder = placeholderLabel || `Select ${this.label}`;
    this.options = [{ value: '', label: placeholder }, ...options];
  }
}
