import { makeObservable, observable, action } from 'mobx';

export class FormField<T> {
  value: T;
  label: string;
  required: boolean;

  constructor(value: T, label: string, required: boolean = false) {
    this.value = value;
    this.label = label;
    this.required = required;

    makeObservable(this, {
      value: observable,
      setValue: action,
      reset: action,
    });
  }

  public setValue(value: T) {
    this.value = value;
  }

  public reset() {
    this.value = '' as T;
  }

  public validateRequired = (): string | null => {
    if (this.required && !this.value) {
      return `${this.label} is required.`;
    }
    return null;
  };
}
