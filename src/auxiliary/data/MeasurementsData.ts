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
      sortable: false,
      type: 'number',
      tooltip: 'The soil PH during the reading',
    },
    {
      id: 'lightLevel',
      label: 'Light Level',
      sortable: true,
      type: 'string',
      tooltip: 'The light level during the reading',
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

  public static textFields: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
  };

  public static inputFields: Record<string, InputFieldModel> = {
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
    light: {
      key: 'lightLevel',
      label: 'Light Level',
      options: Object.values(MeasurementItemLightLevelEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
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

  public static getColoredData(measurements: MeasurementItem[]) {
    return measurements.map((measurement) => {
      const redColumns: string[] = [];
      const yellowColumns: string[] = [];
      const greenColumns: string[] = [];

      if (measurement.lightLevel) {
        const lightLevelValues = Object.values(MeasurementItemLightLevelEnum);
        const lightLevelIndex = lightLevelValues.indexOf(
          measurement.lightLevel,
        );

        if (lightLevelIndex === 0) {
          redColumns.push('lightLevel');
        } else if (lightLevelIndex === 1) {
          yellowColumns.push('lightLevel');
        }
      }

      if (measurement.soilDryness) {
        const soilDrynessValues = Object.values(MeasurementItemSoilDrynessEnum);
        const soilDrynessIndex = soilDrynessValues.indexOf(
          measurement.soilDryness,
        );

        if (soilDrynessIndex === 0) {
          redColumns.push('soilDryness');
        } else if (soilDrynessIndex === 1) {
          yellowColumns.push('soilDryness');
        }
      }

      if (measurement.healthStatus) {
        const healthStatusValues = Object.values(
          MeasurementItemHealthStatusEnum,
        );
        const healthStatusIndex = healthStatusValues.indexOf(
          measurement.healthStatus,
        );

        if (healthStatusIndex === 0) {
          redColumns.push('healthStatus');
        } else if (healthStatusIndex === 1) {
          yellowColumns.push('healthStatus');
        }
      }

      if (measurement.soilPH !== undefined && measurement.soilPH !== null) {
        if (measurement.soilPH < 6) {
          redColumns.push('soilPH');
        } else {
          greenColumns.push('soilPH');
        }
      }

      return {
        ...measurement,
        redColumns,
        yellowColumns,
        greenColumns,
      };
    });
  }
}

export default MeasurementsData;
