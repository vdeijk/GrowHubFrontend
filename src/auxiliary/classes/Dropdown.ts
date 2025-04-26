import { FormField } from './FormField';
import { DropdownOption } from '../interfaces/DropdownOptions';

export class Dropdown<T> extends FormField<T> {
  options: DropdownOption<T>[] = [];

  constructor(
    value: T,
    label: string,
    required: boolean = false,
    options: DropdownOption<T>[] = [],
  ) {
    super(value, label, required);

    this.options = options;
  }

  public setOptions(options: DropdownOption<T>[]) {
    this.options = options;
  }
}
