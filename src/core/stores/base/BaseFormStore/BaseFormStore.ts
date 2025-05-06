import { makeObservable, observable, action, runInAction } from 'mobx';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import { InputFieldModel } from '../../../../auxiliary/interfaces/InputFieldModel';
import { DropdownFieldModel } from '../../../../auxiliary/interfaces/DropdownFieldModel';
import { DateFieldModel } from '../../../../auxiliary/interfaces/DateFieldModel';

export abstract class BaseFormStore {
  dropdownFields: Record<string, DropdownField<string>> = {};
  inputFields: Record<string, InputField<string | number>> = {};
  dateFields: Record<string, DateField<string>> = {};

  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      dropdownFields: observable,
      inputFields: observable,
      dateFields: observable,
      isLoading: observable,
      updateFormField: action,
      resetForm: action,
      validateRequired: action,
      initTextFilter: action,
      initDropdownFilter: action,
      initDateFilter: action,
    });
  }

  public initTextFilter = (field: InputFieldModel) => {
    runInAction(() => {
      if (!this.inputFields[field.key]) {
        this.inputFields[field.key] = new InputField<string | number>(
          field.defaultValue,
          field.label,
          field.required,
          '',
          30,
          field.readonly,
        );
      }
    });
  };

  public initDateFilter = (field: DateFieldModel) => {
    runInAction(() => {
      if (!this.dateFields[field.key]) {
        this.dateFields[field.key] = new DateField<string>(
          '',
          field.label,
          field.required,
        );
      }

      this.dateFields[field.key].setValue(field.defaultValue);
    });
  };

  public initDropdownFilter = (field: DropdownFieldModel) => {
    runInAction(() => {
      if (!this.dropdownFields[field.key]) {
        this.dropdownFields[field.key] = new DropdownField(
          field.defaultValue,
          field.label,
          field.required,
          typeof field.options === 'function' ? field.options() : field.options,
        );
      }
    });
  };

  public updateFormField = (
    field: keyof (typeof this.inputFields &
      typeof this.dropdownFields &
      typeof this.dateFields),
    value: string | boolean | number,
  ) => {
    runInAction(() => {
      if (this.inputFields[field]) {
        this.inputFields[field].setValue(value as string);
      } else if (this.dropdownFields[field]) {
        this.dropdownFields[field].setValue(value as string);
      } else if (this.dateFields[field]) {
        this.dateFields[field].setValue(value as string);
      } else {
        console.error(`Field "${String(field)}" not found in any field type.`);
      }
    });
  };

  public resetForm = () => {
    runInAction(() => {
      Object.values(this.inputFields).forEach((field) => field.reset());
      Object.values(this.dateFields).forEach((field) => field.reset());
      Object.values(this.dropdownFields).forEach((field) => field.reset());
    });
  };

  public validateRequired = (): boolean => {
    const inputErrors = this.validateFields(this.inputFields);
    const dropdownErrors = this.validateFields(this.dropdownFields);
    const dateErrors = this.validateFields(this.dateFields);

    const allErrors = [...inputErrors, ...dropdownErrors, ...dateErrors];

    if (allErrors.length > 0) {
      console.error('Form validation failed:', allErrors);
      return false;
    }

    return true;
  };

  private validateFields = <
    T extends { validateRequired: () => string | null },
  >(
    fields: Record<string, T>,
  ): string[] => {
    return Object.values(fields)
      .map((field) => field.validateRequired())
      .filter((error) => error !== null) as string[];
  };
}
