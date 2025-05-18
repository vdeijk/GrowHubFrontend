import { CropItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';

class CropsData {
  public tableHeaders: TableHeaderModel<CropItem>[] = [];
  public textFieldsString: Record<string, InputFieldModel> = {};

  constructor() {
    makeAutoObservable(this);
    this.initializeTableHeaders();
    this.initializeTextFields();

    i18next.on('languageChanged', () => {
      this.initializeTableHeaders();
      this.initializeTextFields();
    });
  }

  private initializeTableHeaders() {
    this.tableHeaders = [
      {
        id: 'id',
        label: i18next.t('crops.tableHeaders.id'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.id'),
      },
      {
        id: 'commonName',
        label: i18next.t('crops.tableHeaders.commonName'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.commonName'),
      },
      {
        id: 'actions',
        label: i18next.t('crops.tableHeaders.actions'),
        sortable: false,
        type: 'action',
        tooltip: i18next.t('crops.tooltips.actions'),
      },
      {
        id: 'waterCycle',
        label: i18next.t('crops.tableHeaders.waterCycle'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.waterCycle'),
      },
      {
        id: 'pruningCycle',
        label: i18next.t('crops.tableHeaders.pruningCycle'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.pruningCycle'),
      },
      {
        id: 'fertilizationCycle',
        label: i18next.t('crops.tableHeaders.fertilizationCycle'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.fertilizationCycle'),
      },
      {
        id: 'harvestCycle',
        label: i18next.t('crops.tableHeaders.harvestCycle'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.harvestCycle'),
      },
      {
        id: 'phMin',
        label: i18next.t('crops.tableHeaders.phMin'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.phMin'),
      },
      {
        id: 'phMax',
        label: i18next.t('crops.tableHeaders.phMax'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.phMax'),
      },
      {
        id: 'temperatureMin',
        label: i18next.t('crops.tableHeaders.temperatureMin'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.temperatureMin'),
      },
      {
        id: 'temperatureMax',
        label: i18next.t('crops.tableHeaders.temperatureMax'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('crops.tooltips.temperatureMax'),
      },
      {
        id: 'harvestStart',
        label: i18next.t('crops.tableHeaders.harvestStart'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.harvestStart'),
      },
      {
        id: 'harvestEnd',
        label: i18next.t('crops.tableHeaders.harvestEnd'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.harvestEnd'),
      },
      {
        id: 'pruningStart',
        label: i18next.t('crops.tableHeaders.pruningStart'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.pruningStart'),
      },
      {
        id: 'pruningEnd',
        label: i18next.t('crops.tableHeaders.pruningEnd'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.pruningEnd'),
      },
      {
        id: 'fertilizingStart',
        label: i18next.t('crops.tableHeaders.fertilizingStart'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.fertilizingStart'),
      },
      {
        id: 'fertilizingEnd',
        label: i18next.t('crops.tableHeaders.fertilizingEnd'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('crops.tooltips.fertilizingEnd'),
      },
    ];
  }

  private initializeTextFields() {
    this.textFieldsString = {
      searchQuery: {
        key: 'searchQuery',
        label: i18next.t('crops.textFields.searchQuery'),
        defaultValue: '',
        placeholder: i18next.t('crops.placeholders.searchQuery'),
      },
    };
  }
}

const cropsData = new CropsData();
export default cropsData;
