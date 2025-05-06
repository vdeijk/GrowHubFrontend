import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

class AddBatchData {
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
      commonName: {
        key: 'commonName',
        label: i18next.t('addBatchData.textFields.commonName'),
        defaultValue: '',
        required: true,
        readonly: true,
      },
      notes: {
        key: 'notes',
        label: i18next.t('addBatchData.textFields.notes'),
        defaultValue: '',
      },
      amount: {
        key: 'amount',
        label: i18next.t('addBatchData.textFields.amount'),
        defaultValue: '',
        required: true,
      },
      cropId: {
        key: 'cropId',
        label: i18next.t('addBatchData.textFields.cropId'),
        defaultValue: '',
        required: true,
      },
    };

    this.dropdowns = {
      location: {
        key: 'location',
        label: i18next.t('addBatchData.dropdowns.location'),
        options: [],
        defaultValue: '',
        required: true,
      },
    };

    this.dateFields = [
      {
        key: 'planted',
        label: i18next.t('addBatchData.dateFields.planted'),
        defaultValue: '',
        required: true,
      },
      {
        key: 'lastWatered',
        label: i18next.t('addBatchData.dateFields.lastWatered'),
        defaultValue: '',
      },
      {
        key: 'lastFertilized',
        label: i18next.t('addBatchData.dateFields.lastFertilized'),
        defaultValue: '',
      },
      {
        key: 'lastPruned',
        label: i18next.t('addBatchData.dateFields.lastPruned'),
        defaultValue: '',
      },
      {
        key: 'lastHarvested',
        label: i18next.t('addBatchData.dateFields.lastHarvested'),
        defaultValue: '',
      },
    ];
  }
}

const addBatchData = new AddBatchData();
export default addBatchData;
