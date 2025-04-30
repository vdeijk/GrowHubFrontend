import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { PlantItemSunPreferenceEnum } from '../../api';
import { PlantItemWaterNeedsEnum } from '../../api';
import { PlantItemSoilTypeEnum } from '../../api';
import { PlantItemSoilPHEnum } from '../../api';
import { PlantItemPruningEnum } from '../../api';
import { PlantItemClimateZoneEnum } from '../../api';
import { PlantItemPlantTypeEnum } from '../../api';
import { PlantItemGrowthRateEnum } from '../../api';
import { PlantItemFertilizerNeedsEnum } from '../../api';
import { PlantItem } from '../../api';

class CropsDatabaseData {
  public static tableHeaders: {
    id: keyof PlantItem | 'actions';
    label: string;
    sortable: boolean;
  }[] = [
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'sunPreference', label: 'Sun Preference', sortable: true },
    { id: 'waterNeeds', label: 'Water Needs', sortable: true },
    { id: 'soilType', label: 'Soil Type', sortable: true },
    { id: 'soilPH', label: 'Soil PH', sortable: true },
    { id: 'pruning', label: 'Pruning', sortable: true },
    { id: 'climateZone', label: 'Climate Zone', sortable: true },
    { id: 'plantType', label: 'Plant Type', sortable: true },
    { id: 'growthRate', label: 'Growth Rate', sortable: true },
    { id: 'fertilizerNeeds', label: 'Fertilizer Needs', sortable: true },
  ];

  public static dropdowns: Record<string, DropdownFieldModel> = {
    sunPreference: {
      key: 'sunPreference',
      label: 'Sun Preference',
      options: Object.values(PlantItemSunPreferenceEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    waterNeeds: {
      key: 'waterNeeds',
      label: 'Water Needs',
      options: Object.values(PlantItemWaterNeedsEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    soilType: {
      key: 'soilType',
      label: 'Soil Type',
      options: Object.values(PlantItemSoilTypeEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    soilPH: {
      key: 'soilPH',
      label: 'Soil PH',
      options: Object.values(PlantItemSoilPHEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    pruning: {
      key: 'pruning',
      label: 'Pruning',
      options: Object.values(PlantItemPruningEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    climateZone: {
      key: 'climateZone',
      label: 'Climate Zone',
      options: Object.values(PlantItemClimateZoneEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    plantType: {
      key: 'plantType',
      label: 'Plant Type',
      options: Object.values(PlantItemPlantTypeEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    growthRate: {
      key: 'growthRate',
      label: 'Growth Rate',
      options: Object.values(PlantItemGrowthRateEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    fertilizerNeeds: {
      key: 'fertilizerNeeds',
      label: 'Fertilizer Needs',
      options: Object.values(PlantItemFertilizerNeedsEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
  };
}

export default CropsDatabaseData;
