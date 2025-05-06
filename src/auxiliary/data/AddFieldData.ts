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
        label: i18next.t('addFieldData.textFields.name'), // Translated label
        defaultValue: '',
        required: true,
      },
      notes: {
        key: 'notes',
        label: i18next.t('addFieldData.textFields.notes'), // Translated label
        defaultValue: '',
        required: false,
      },
      latitude: {
        key: 'latitude',
        label: i18next.t('addFieldData.textFields.latitude'),
        defaultValue: '',
        required: true,
      },
      longitude: {
        key: 'longitude',
        label: i18next.t('addFieldData.textFields.longitude'),
        defaultValue: '',
        required: true,
      },
    };
  }
}

const addFieldData = new AddFieldData();
export default addFieldData;
