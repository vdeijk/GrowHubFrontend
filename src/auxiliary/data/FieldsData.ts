import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { FieldItem } from '../../api';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

class FieldsData {
  public tableHeaders: TableHeaderModel<FieldItem>[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeTableHeaders();

    i18next.on('languageChanged', () => {
      this.initializeTableHeaders();
    });
  }

  private initializeTableHeaders() {
    this.tableHeaders = [
      {
        id: 'name',
        label: i18next.t('fields.tableHeaders.name'),
        sortable: true,
        type: 'string',
        tooltip: i18next.t('fields.tooltips.name'),
      },
      {
        id: 'actions',
        label: i18next.t('fields.tableHeaders.actions'),
        sortable: false,
        type: 'action',
        tooltip: i18next.t('fields.tooltips.actions'),
      },
      {
        id: 'longitude',
        label: i18next.t('fields.tableHeaders.longitude'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('fields.tooltips.longitude'),
      },
      {
        id: 'latitude',
        label: i18next.t('fields.tableHeaders.latitude'),
        sortable: true,
        type: 'number',
        tooltip: i18next.t('fields.tooltips.latitude'),
      },
    ];
  }
}

const cropsData = new FieldsData();
export default cropsData;
