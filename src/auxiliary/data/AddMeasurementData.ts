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

  public static textFields: Record<string, InputFieldModel> = {
    title: {
      key: 'title',
      label: 'Crop Name',
      defaultValue: '',
      required: true,
      readonly: true,
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
    soilPH: {
      key: 'soilPH',
      label: 'Soil PH',
      defaultValue: '',
      required: false,
    },
    batchId: {
      key: 'batchId',
      label: 'Batch Id',
      defaultValue: '',
      required: true,
    },
  };

  private initializeFields() {
    this.textFields = {
      title: {
        key: 'title',
        label: i18next.t('addMeasurementData.textFields.title'), // Translated label
        defaultValue: '',
        required: true,
        readonly: true,
      },
      notes: {
        key: 'notes',
        label: i18next.t('addMeasurementData.textFields.notes'), // Translated label
        defaultValue: '',
      },
      soilPH: {
        key: 'soilPH',
        label: i18next.t('addMeasurementData.textFields.soilPH'), // Translated label
        defaultValue: '',
        required: false,
      },
      batchId: {
        key: 'batchId',
        label: i18next.t('addMeasurementData.textFields.batchId'), // Translated label
        defaultValue: '',
        required: true,
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
