import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { MonthEnum } from '../enums/MonthEnum';
import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';

class AddCropData {
  public textFields: Record<string, InputFieldModel> = {};
  public dropdownFields: Record<string, DropdownFieldModel> = {};

  constructor() {
    makeAutoObservable(this);

    this.initializeFields();

    i18next.on('languageChanged', () => {
      this.initializeFields();
    });
  }

  private setMonthOptions = () => {
    return [
      { label: '', value: '' },
      ...Object.values(MonthEnum).map((month) => ({
        label: month,
        value: month,
      })),
    ];
  };

  private initializeFields() {
    this.textFields = {
      commonName: {
        key: 'commonName',
        label: i18next.t('addCropData.textFields.commonName'),
        defaultValue: '',
        required: true,
        placeholder: i18next.t('addCropData.placeholders.commonName'),
      },
      notes: {
        key: 'notes',
        label: i18next.t('addCropData.textFields.notes'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.notes'),
      },
      waterCycle: {
        key: 'waterCycle',
        label: i18next.t('addCropData.textFields.waterCycle'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.waterCycle'),
      },
      pruningCycle: {
        key: 'pruningCycle',
        label: i18next.t('addCropData.textFields.pruningCycle'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.pruningCycle'),
      },
      fertilizationCycle: {
        key: 'fertilizationCycle',
        label: i18next.t('addCropData.textFields.fertilizationCycle'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.fertilizationCycle'),
      },
      harvestCycle: {
        key: 'harvestCycle',
        label: i18next.t('addCropData.textFields.harvestCycle'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.harvestCycle'),
      },
      phMin: {
        key: 'phMin',
        label: i18next.t('addCropData.textFields.phMin'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.phMin'),
      },
      phMax: {
        key: 'phMax',
        label: i18next.t('addCropData.textFields.phMax'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.phMax'),
      },
      temperatureMin: {
        key: 'temperatureMin',
        label: i18next.t('addCropData.textFields.temperatureMin'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.temperatureMin'),
      },
      temperatureMax: {
        key: 'temperatureMax',
        label: i18next.t('addCropData.textFields.temperatureMax'),
        defaultValue: '',
        placeholder: i18next.t('addCropData.placeholders.temperatureMax'),
      },
    };

    this.dropdownFields = {
      harvestStart: {
        key: 'harvestStart',
        label: i18next.t('addCropData.dropdownFields.harvestStart'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
      harvestEnd: {
        key: 'harvestEnd',
        label: i18next.t('addCropData.dropdownFields.harvestEnd'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
      pruningStart: {
        key: 'pruningStart',
        label: i18next.t('addCropData.dropdownFields.pruningStart'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
      pruningEnd: {
        key: 'pruningEnd',
        label: i18next.t('addCropData.dropdownFields.pruningEnd'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
      fertilizingStart: {
        key: 'fertilizingStart',
        label: i18next.t('addCropData.dropdownFields.fertilizingStart'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
      fertilizingEnd: {
        key: 'fertilizingEnd',
        label: i18next.t('addCropData.dropdownFields.fertilizingEnd'),
        defaultValue: '',
        options: this.setMonthOptions(),
      },
    };
  }
}

const addCropData = new AddCropData();
export default addCropData;
