import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import {
  MeasurementItem,
  MeasurementItemGrowthStageEnum,
  MeasurementItemHealthStatusEnum,
  MeasurementItemSoilDrynessEnum,
} from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

/*
  public textFieldsString: Record<string, InputFieldModel> = {};
  public textFieldsNumber: Record<string, InputFieldModel> = {};*/

class MeasurementsData {
  public tableHeaders: TableHeaderModel<MeasurementItem>[] = [];
  public dropdowns: Record<string, DropdownFieldModel> = {};
  public dateFields: DateFieldModel[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeTableHeaders();
    this.initializeDropdowns();
    this.initializeDateFields();

    i18next.on('languageChanged', () => {
      this.initializeTableHeaders();
      this.initializeDropdowns();
      this.initializeDateFields();
    });
  }

  private initializeTableHeaders() {
    console.log('Initializing table headers');
    this.tableHeaders = [
      {
        id: 'title',
        label: i18next.t('measurements.tableHeaders.title'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('measurements.tooltips.title'),
      },
      {
        id: 'batchId',
        label: i18next.t('measurements.tableHeaders.batchId'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('measurements.tooltips.batchId'),
      },
      {
        id: 'actions',
        label: i18next.t('measurements.tableHeaders.actions'),
        sortable: false,
        type: 'action',
        tooltip: i18next.t('measurements.tooltips.actions'),
      },
      {
        id: 'soilPH',
        label: i18next.t('measurements.tableHeaders.soilPH'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('measurements.tooltips.soilPH'),
      },
      {
        id: 'soilDryness',
        label: i18next.t('measurements.tableHeaders.soilDryness'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('measurements.tooltips.soilDryness'),
      },
      {
        id: 'healthStatus',
        label: i18next.t('measurements.tableHeaders.healthStatus'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('measurements.tooltips.healthStatus'),
      },
      {
        id: 'growthStage',
        label: i18next.t('measurements.tableHeaders.growthStage'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('measurements.tooltips.growthStage'),
      },
      {
        id: 'date',
        label: i18next.t('measurements.tableHeaders.date'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('measurements.tooltips.date'),
      },
    ];
  }

  public get textFieldsString(): Record<string, InputFieldModel> {
    return {
      searchQuery: {
        key: 'searchQuery',
        label: i18next.t('measurements.textFields.searchQuery'),
        defaultValue: '',
      },
      descriptionField: {
        key: 'description',
        label: i18next.t('measurements.textFields.descriptionField'),
        defaultValue: '',
      },
    };
  }

  public get textFieldsNumber(): Record<string, InputFieldModel> {
    return {
      phMin: {
        key: 'phMin',
        label: i18next.t('measurements.textFields.phMin'),
        defaultValue: '',
      },
      phMax: {
        key: 'phMax',
        label: i18next.t('measurements.textFields.phMax'),
        defaultValue: '',
      },
    };
  }

  private initializeDropdowns() {
    this.dropdowns = {
      dryness: {
        key: 'soilDryness',
        label: i18next.t('measurements.dropdowns.soilDryness'),
        options: Object.values(MeasurementItemSoilDrynessEnum).map((value) => ({
          value: value,
          label: value,
        })),
        defaultValue: '',
      },
      healthStatus: {
        key: 'healthStatus',
        label: i18next.t('measurements.dropdowns.healthStatus'),
        options: Object.values(MeasurementItemHealthStatusEnum).map((value) => ({
          value: value,
          label: value,
        })),
        defaultValue: '',
      },
      growthStage: {
        key: 'growthStage',
        label: i18next.t('measurements.dropdowns.growthStage'),
        options: Object.values(MeasurementItemGrowthStageEnum).map((value) => ({
          value: value,
          label: value,
        })),
        defaultValue: '',
      },
    };
  }

  private initializeDateFields() {
    this.dateFields = [
      {
        key: 'dateMax',
        label: i18next.t('measurements.dateFields.dateMax'),
        defaultValue: '',
      },
      {
        key: 'dateMin',
        label: i18next.t('measurements.dateFields.dateMin'),
        defaultValue: '',
      },
    ];
  }
}

const measurementsData = new MeasurementsData();
export default measurementsData;
