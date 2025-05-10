import { InputFieldModel } from '../interfaces/InputFieldModel';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

class AddFieldData {
  public textFields: Record<string, InputFieldModel> = {};

  constructor() {
    makeAutoObservable(this);

    this.initializeFields();

    i18next.on('languageChanged', () => {
      this.initializeFields();
    });
  }

  private initializeFields() {
    this.textFields = {
      name: {
        key: 'name',
        label: i18next.t('addFieldData.textFields.name'),
        defaultValue: '',
        required: true,
        placeholder: i18next.t('addFieldData.placeholders.name'),
      },
      notes: {
        key: 'notes',
        label: i18next.t('addFieldData.textFields.notes'),
        defaultValue: '',
        required: false,
        placeholder: i18next.t('addFieldData.placeholders.notes'),
      },
      latitude: {
        key: 'latitude',
        label: i18next.t('addFieldData.textFields.latitude'),
        defaultValue: '',
        required: true,
        placeholder: i18next.t('addFieldData.placeholders.latitude'),
      },
      longitude: {
        key: 'longitude',
        label: i18next.t('addFieldData.textFields.longitude'),
        defaultValue: '',
        required: true,
        placeholder: i18next.t('addFieldData.placeholders.longitude'),
      },
    };
  }
}

const addFieldData = new AddFieldData();
export default addFieldData;
