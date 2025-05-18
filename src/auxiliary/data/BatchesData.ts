import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';
import fieldsStore from '../../core/stores/derived/FieldsStore/FieldsStore';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { BatchItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class BatchesData {
  public tableHeaders: TableHeaderModel<BatchItem>[] = [];
  public textFieldsString: Record<string, InputFieldModel> = {};
  public textFieldsNumber: Record<string, InputFieldModel> = {};
  public dropdowns: Record<string, DropdownFieldModel> = {};
  public dateFields: DateFieldModel[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeTableHeaders();
    this.initializeTextFields();
    this.initializeDropdowns();
    this.initializeDateFields();

    i18next.on('languageChanged', () => {
      this.initializeTableHeaders();
      this.initializeTextFields();
      this.initializeDropdowns();
      this.initializeDateFields();
    });
  }
  private initializeTableHeaders() {
    this.tableHeaders = [
      {
        id: 'id',
        label: i18next.t('batches.tableHeaders.id'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('batches.tooltips.id'),
      },
      {
        id: 'commonName',
        label: i18next.t('batches.tableHeaders.commonName'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('batches.tooltips.commonName'),
      },
      {
        id: 'cropId',
        label: i18next.t('batches.tableHeaders.cropId'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('batches.tooltips.cropId'),
      },
      {
        id: 'actions',
        label: i18next.t('batches.tableHeaders.actions'),
        sortable: false,
        type: 'action',
        tooltip: i18next.t('batches.tooltips.actions'),
      },
      {
        id: 'amount',
        label: i18next.t('batches.tableHeaders.amount'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('batches.tooltips.amount'),
      },
      {
        id: 'location',
        label: i18next.t('batches.tableHeaders.location'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('batches.tooltips.location'),
      },
      {
        id: 'planted',
        label: i18next.t('batches.tableHeaders.planted'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('batches.tooltips.planted'),
      },
      {
        id: 'lastWatered',
        label: i18next.t('batches.tableHeaders.lastWatered'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('batches.tooltips.lastWatered'),
      },
      {
        id: 'lastFertilized',
        label: i18next.t('batches.tableHeaders.lastFertilized'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('batches.tooltips.lastFertilized'),
      },
      {
        id: 'lastPruned',
        label: i18next.t('batches.tableHeaders.lastPruned'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('batches.tooltips.lastPruned'),
      },
      {
        id: 'lastHarvested',
        label: i18next.t('batches.tableHeaders.lastHarvested'),
        sortable: true,
        type: 'date',
        tooltip: i18next.t('batches.tooltips.lastHarvested'),
      },
    ];
  }

  private initializeTextFields() {
    this.textFieldsString = {
      searchQuery: {
        key: 'searchQuery',
        label: i18next.t('batches.textFields.searchQuery'),
        defaultValue: '',
        placeholder: i18next.t('batches.placeholders.searchQuery'),
      },
    };

    this.textFieldsNumber = {
      phMin: {
        key: 'minAmount',
        label: i18next.t('batches.textFields.phMax'),
        defaultValue: '',
        placeholder: i18next.t('batches.placeholders.phMax'),
      },
      phMax: {
        key: 'maxAmount',
        label: i18next.t('batches.textFields.phMin'),
        defaultValue: '',
        placeholder: i18next.t('batches.placeholders.phMin'),
      },
    };
  }

  private initializeDropdowns() {
    this.dropdowns = {
      location: {
        key: 'location',
        label: i18next.t('batches.dropdowns.location'),
        options: () => [],
        defaultValue: '',
      },
    };
  }

  private initializeDateFields() {
    this.dateFields = [
      {
        key: 'planted',
        label: i18next.t('batches.dateFields.planted'),
        defaultValue: '',
      },
      {
        key: 'lastWatered',
        label: i18next.t('batches.dateFields.lastWatered'),
        defaultValue: '',
      },
      {
        key: 'lastFertilized',
        label: i18next.t('batches.dateFields.lastFertilized'),
        defaultValue: '',
      },
      {
        key: 'lastPruned',
        label: i18next.t('batches.dateFields.lastPruned'),
        defaultValue: '',
      },
      {
        key: 'lastHarvested',
        label: i18next.t('batches.dateFields.lastHarvested'),
        defaultValue: '',
      },
    ];
  }

  public updateLocationDropdownOptions() {
    this.dropdowns['location'].options = fieldsStore
      .getLocations()
      .map((field) => ({
        value: field.name ?? '',
        label: field.name ?? '',
      }));
  }
}

/*
      priority: {
        key: 'priority',
        label: i18next.t('tasks.dropdowns.priority'),
        options: Object.values(TodoItemPriorityEnum).map((value) => ({
          value: value,
          label: value,
        })),
        defaultValue: '',
      },*/

const batchesData = new BatchesData();
export default batchesData;
