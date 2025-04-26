import { makeObservable, observable, action, runInAction } from 'mobx';
import { InputField } from '../../../auxiliary/classes/InputField';
import { DateField } from '../../../auxiliary/classes/DateField';

export abstract class BaseFormStore {
  fields: Record<
    string,
    InputField<string | boolean | number> | DateField<string>
  > = {};

  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      fields: observable,
      isLoading: observable,
      updateFormField: action,
      resetForm: action,
      validateRequired: action,
    });
  }

  public updateFormField = (
    field: keyof typeof this.fields,
    value: string | boolean | number,
  ) => {
    runInAction(() => {
      if (this.fields[field] instanceof InputField) {
        this.fields[field].setValue(value);
      }
    });
  };

  public resetForm = () => {
    runInAction(() => {
      Object.values(this.fields).forEach((field) => field.reset());
    });
  };

  public validateRequired = (): boolean => {
    const errors = Object.values(this.fields)
      .map((field) => field.validateRequired())
      .filter((error) => error !== null);

    if (errors.length > 0) {
      console.error('Form validation failed:', errors);
      return false;
    }

    return true;
  };
}
