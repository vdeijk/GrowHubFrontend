import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import {
  MeasurementItem,
  MeasurementItemGrowthStageEnum,
  MeasurementItemHealthStatusEnum,
  MeasurementItemLightLevelEnum,
  MeasurementItemSoilDrynessEnum,
} from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';

class MeasurementsData {
  public static tableHeaders: TableHeaderModel<MeasurementItem>[] = [
    { id: 'title', label: 'Title', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'batchId', label: 'Batch Id', sortable: true, type: 'number' },
    { id: 'date', label: 'Date', sortable: true, type: 'date' },
    { id: 'soilPH', label: 'Soil PH', sortable: false, type: 'number' },
    { id: 'lightLevel', label: 'Light Level', sortable: true, type: 'string' },
    {
      id: 'soilDryness',
      label: 'Soil Dryness',
      sortable: true,
      type: 'string',
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      sortable: true,
      type: 'string',
    },
    {
      id: 'growthStage',
      label: 'Growth Stage',
      sortable: true,
      type: 'string',
    },
  ];

  public static dropdowns: Record<string, DropdownFieldModel> = {
    light: {
      key: 'lightLevel',
      label: 'Light',
      options: Object.values(MeasurementItemLightLevelEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    dryness: {
      key: 'soilDryness',
      label: 'Dryness',
      options: Object.values(MeasurementItemSoilDrynessEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    healthStatus: {
      key: 'healthStatus',
      label: 'Health Status',
      options: Object.values(MeasurementItemHealthStatusEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    growthStage: {
      key: 'growthStage',
      label: 'Growth Stage',
      options: Object.values(MeasurementItemGrowthStageEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'datae', label: 'Date', defaultValue: '' },
  ];
}

export default MeasurementsData;
