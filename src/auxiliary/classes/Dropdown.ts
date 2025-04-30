import { FormField } from './FormField';
import { DropdownOption } from '../interfaces/DropdownOptions';

export class Dropdown<T> extends FormField<T> {
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
    allLabel: string = '',
  ): void {
    this.options = [{ value: '', label: allLabel }, ...options];
  }
}
