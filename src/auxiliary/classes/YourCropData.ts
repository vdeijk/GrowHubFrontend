import { GrowthStage } from '../enums/GrowthStage';
import { HealthStatus } from '../enums/HealthStatus';
import fieldsStore from '../../core/stores/derived/FieldsStore/FieldsStore';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';

class YourCropsData {
  public static tableHeaders = [
    { id: 'id', label: 'Id', sortable: true },
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'location', label: 'Location', sortable: true },
    { id: 'lastWatered', label: 'Last Watered', sortable: true },
    { id: 'lastFertilized', label: 'Last Fertilized', sortable: true },
    { id: 'lastPruned', label: 'Last Pruned', sortable: true },
    { id: 'lastHarvested', label: 'Last Harvested', sortable: true },
    { id: 'healthStatus', label: 'Health Status', sortable: true },
    { id: 'growthStage', label: 'Growth Stage', sortable: true },
  ];

  public static dropdowns: Record<string, DropdownFieldModel> = {
    location: {
      key: 'location',
      label: 'Location',
      options: () => fieldsStore.getLocations().map((field) => field.name),
      defaultValue: '',
    },
    growthStage: {
      key: 'growthStage',
      label: 'Growth Stage',
      options: Object.values(GrowthStage),
      defaultValue: '',
    },
    healthStatus: {
      key: 'healthStatus',
      label: 'Health Status',
      options: Object.values(HealthStatus),
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'lastWatered', label: 'Last Watered', defaultValue: '' },
    { key: 'lastFertilized', label: 'Last Fertilized', defaultValue: '' },
    { key: 'lastPruned', label: 'Last Pruned', defaultValue: '' },
    { key: 'lastHarvested', label: 'Last Harvested', defaultValue: '' },
  ];
}

export default YourCropsData;
