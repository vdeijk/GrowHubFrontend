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

class MeasurementsData {
  public static tableHeaders: TableHeaderModel<MeasurementItem>[] = [
    {
      id: 'title',
      label: 'Crop Name',
      sortable: true,
      type: 'string',
      tooltip: 'The crop type of the reading',
    },
    {
      id: 'batchId',
      label: 'Batch Id',
      sortable: true,
      type: 'number',
      tooltip: 'Use this identifier to link the reading to a batch',
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'action',
      tooltip: 'View, edit or delete the reading',
    },
    {
      id: 'soilPH',
      label: 'Soil PH',
      sortable: true,
      type: 'number',
      tooltip: 'The soil PH during the reading',
    },
    {
      id: 'soilDryness',
      label: 'Soil Dryness',
      sortable: true,
      type: 'string',
      tooltip: 'The soil dryness during the reading',
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      sortable: true,
      type: 'string',
      tooltip: 'The health status of the batch during the reading',
    },
    {
      id: 'growthStage',
      label: 'Growth Stage',
      sortable: true,
      type: 'string',
      tooltip: 'The growth stage of the batch during the reading',
    },
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      type: 'date',
      tooltip: 'The date of the reading',
    },
  ];

  public static textFieldsString: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
  };

  public static textFieldsNumber: Record<string, InputFieldModel> = {
    phMin: {
      key: 'phMin',
      label: 'PH Min',
      defaultValue: '',
    },
    phMax: {
      key: 'phMax',
      label: 'PH Max',
      defaultValue: '',
    },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    dryness: {
      key: 'soilDryness',
      label: 'Soil Dryness',
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
    { key: 'dateMax', label: 'Date Max', defaultValue: '' },
    { key: 'dateMin', label: 'Date Min', defaultValue: '' },
  ];
}

export default MeasurementsData;
