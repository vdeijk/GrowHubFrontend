import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import {
  MeasurementItem,
  MeasurementItemGrowthStageEnum,
  MeasurementItemHealthStatusEnum,
  MeasurementItemLightLevelEnum,
  MeasurementItemSoilDrynessEnum,
  TodoItemCategoryEnum,
} from '../../api';
import { TodoItemPriorityEnum } from '../../api';
import { TodoItemTodoStatusEnum } from '../../api';

class MeasurementsData {
  public static tableHeaders: {
    id: keyof MeasurementItem | 'actions';
    label: string;
    sortable: boolean;
  }[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'batchId', label: 'Batch Id', sortable: true },
    { id: 'date', label: 'Date', sortable: true },
    { id: 'soilPH', label: 'Soil PH', sortable: false },
    { id: 'lightLevel', label: 'Light Level', sortable: true },
    { id: 'soilDryness', label: 'Soil Dryness', sortable: true },
    { id: 'healthStatus', label: 'Health Status', sortable: true },
    { id: 'growthStage', label: 'Growth Stage', sortable: true },
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
