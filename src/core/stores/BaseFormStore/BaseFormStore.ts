import { makeObservable, observable, action, runInAction } from 'mobx';
import { InputField } from '../../../auxiliary/classes/InputField';
import { getData } from '../../apis/getData';
import { postData } from '../../apis/postData';
import { putData } from '../../apis/putData';

export abstract class BaseFormStore<T> {
  fields: Record<string, InputField<string | boolean | number>> = {};
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      fields: observable,
      isLoading: observable,
      updateFormField: action,
      resetForm: action,
      validateForm: action,
    });
  }

  public updateFormField(
    field: keyof typeof this.fields,
    value: string | boolean | number,
  ) {
    runInAction(() => {
      if (this.fields[field] instanceof InputField) {
        this.fields[field].setValue(value);
      }
    });
  }

  public resetForm() {
    runInAction(() => {
      Object.values(this.fields).forEach((field) => field.reset());
    });
  }

  public validateForm(): boolean {
    const errors = Object.values(this.fields)
      .map((field) => field.validateRequired())
      .filter((error) => error !== null);

    if (errors.length > 0) {
      console.error('Form validation failed:', errors);
      return false;
    }

    return true;
  }

  public async loadData(endpoint: string, mapDataToFields: (data: T) => void) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: T = await getData(endpoint);
      runInAction(() => {
        mapDataToFields(data);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async addData(endpoint: string, data: T) {
    if (!this.validateForm()) return;

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await postData(endpoint, data as Record<string, unknown>);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async editData(endpoint: string, data: T) {
    if (!this.validateForm()) return;

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await putData(endpoint, data as Record<string, unknown>);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
