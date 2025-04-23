import { FormField } from './FormField';

export class Dropdown<T> extends FormField<T> {

  constructor(
    value: T,
    label: string,
    required: boolean = false,
  ) {
    super(value, label, required);
  }
}
