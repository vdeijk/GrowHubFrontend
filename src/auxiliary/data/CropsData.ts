import { PlantItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class CropsData {
  public static tableHeaders: TableHeaderModel<PlantItem>[] = [
    {
      id: 'id',
      label: 'ID',
      sortable: true,
      type: 'number',
      tooltip: 'Use this identifier to link the crop to a batch',
    },
    {
      id: 'commonName',
      label: 'Crop Name',
      sortable: true,
      type: 'string',
      tooltip: 'The common name of the crop',
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'action',
      tooltip: 'View, edit or delete the crop',
    },
    {
      id: 'waterCycle',
      label: 'Watering',
      sortable: true,
      type: 'number',
      tooltip: 'How often this plant should be watered (in days during season)',
    },
    {
      id: 'pruningCycle',
      label: 'Pruning',
      sortable: true,
      type: 'number',
      tooltip: 'How often this plant should be pruned (in days during season)',
    },
    {
      id: 'fertilizationCycle',
      label: 'Fertilizing',
      sortable: true,
      type: 'number',
      tooltip:
        'How often this plant should be fertilized (in days during season)',
    },
    {
      id: 'harvestCycle',
      label: 'Harvesting',
      sortable: true,
      type: 'number',
      tooltip:
        'How often this plant should be harvested (in days during season)',
    },
    {
      id: 'phMin',
      label: 'PH Min',
      sortable: true,
      type: 'number',
      tooltip:
        'The minimum pH level of the soil this crop should be planted in',
    },
    {
      id: 'phMax',
      label: 'PH Max',
      sortable: true,
      type: 'number',
      tooltip:
        'The maximum pH level of the soil this crop should be planted in',
    },
    {
      id: 'temperatureMin',
      label: 'Temp Min',
      sortable: true,
      type: 'number',
      tooltip: 'The minimum temperature this crop can withstand',
    },
    {
      id: 'temperatureMax',
      label: 'Temp Max',
      sortable: true,
      type: 'number',
      tooltip: 'The maxmimum temperature this crop can withstand',
    },
    {
      id: 'harvestStart',
      label: 'Harvest Start',
      sortable: true,
      type: 'string',
      tooltip: 'Start date of the harvest season',
    },
    {
      id: 'harvestEnd',
      label: 'Harvest End',
      sortable: true,
      type: 'string',
      tooltip: 'End date of the harvest season',
    },
    {
      id: 'pruningStart',
      label: 'Pruning Start',
      sortable: true,
      type: 'string',
      tooltip: 'Start date of the pruning season',
    },
    {
      id: 'pruningEnd',
      label: 'Pruning End',
      sortable: true,
      type: 'string',
      tooltip: 'End date of the pruning season',
    },
    {
      id: 'fertilizingStart',
      label: 'Fertilizing Start',
      sortable: true,
      type: 'string',
      tooltip: 'Start date of the fertilizing season',
    },
    {
      id: 'fertilizingEnd',
      label: 'Fertilizing End',
      sortable: true,
      type: 'string',
      tooltip: 'End date of the fertilizing season',
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
}

export default CropsData;
