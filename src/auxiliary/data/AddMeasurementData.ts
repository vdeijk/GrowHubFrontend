import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

class AddMeasurementData {
  public textFields: Record<string, InputFieldModel> = {};
  public dropdowns: Record<string, DropdownFieldModel> = {};
  public dateFields: DateFieldModel[] = [];

  constructor() {
    makeAutoObservable(this);

    this.initializeFields();

    i18next.on('languageChanged', () => {
      this.initializeFields();
    });
  }

  private initializeFields() {
    this.textFields = {
      title: {
        key: 'title',
        label: i18next.t('addMeasurementData.textFields.title'),
        defaultValue: '',
        required: true,
        readonly: true,
        placeholder: i18next.t('addMeasurementData.placeholders.title'),
      },
      notes: {
        key: 'notes',
        label: i18next.t('addMeasurementData.textFields.notes'),
        defaultValue: '',
        required: false,
        readonly: false,
        placeholder: i18next.t('addMeasurementData.placeholders.notes'),
      },
      soilPH: {
        key: 'soilPH',
        label: i18next.t('addMeasurementData.textFields.soilPH'),
        defaultValue: '',
        required: false,
        readonly: false,
        placeholder: i18next.t('addMeasurementData.placeholders.soilPH'),
      },
      batchId: {
        key: 'batchId',
        label: i18next.t('addMeasurementData.textFields.batchId'),
        defaultValue: '',
        required: true,
        readonly: false,
        placeholder: i18next.t('addMeasurementData.placeholders.batchId'),
      },
    };

    this.dropdowns = {
      soilDryness: {
        key: 'soilDryness',
        label: i18next.t('addMeasurementData.dropdowns.soilDryness'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
      growthStage: {
        key: 'growthStage',
        label: i18next.t('addMeasurementData.dropdowns.growthStage'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
      healthStatus: {
        key: 'healthStatus',
        label: i18next.t('addMeasurementData.dropdowns.healthStatus'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
    };

    this.dateFields = [
      {
        key: 'date',
        label: i18next.t('addMeasurementData.dateFields.date'), // Translated label
        defaultValue: '',
        required: true,
      },
    ];
  }
}

const addMeasurementData = new AddMeasurementData();
export default addMeasurementData;
