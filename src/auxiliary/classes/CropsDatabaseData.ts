import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { SunPreference } from '../enums/SunPreference';
import { WaterNeeds } from '../enums/WaterNeeds';
import { SoilType } from '../enums/SoilType';
import { SoilPH } from '../enums/SoilPH';
import { Pruning } from '../enums/Pruning';
import { PlantType } from '../enums/PlantType';
import { GrowthRate } from '../enums/GrowthRate';
import { FertilizerNeeds } from '../enums/FertilizerNeeds';
import { ClimateZone } from '../enums/ClimateZone';

class CropsDatabaseData {
  public static tableHeaders = [
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
      options: Object.values(SunPreference),
      defaultValue: '',
    },
    waterNeeds: {
      key: 'waterNeeds',
      label: 'Water Needs',
      options: Object.values(WaterNeeds),
      defaultValue: '',
    },
    soilType: {
      key: 'soilType',
      label: 'Soil Type',
      options: Object.values(SoilType),
      defaultValue: '',
    },
    soilPH: {
      key: 'soilPH',
      label: 'Soil PH',
      options: Object.values(SoilPH),
      defaultValue: '',
    },
    pruning: {
      key: 'pruning',
      label: 'Pruning',
      options: Object.values(Pruning),
      defaultValue: '',
    },
    climateZone: {
      key: 'climateZone',
      label: 'Climate Zone',
      options: Object.values(ClimateZone),
      defaultValue: '',
    },
    plantType: {
      key: 'plantType',
      label: 'Plant Type',
      options: Object.values(PlantType),
      defaultValue: '',
    },
    growthRate: {
      key: 'growthRate',
      label: 'Growth Rate',
      options: Object.values(GrowthRate),
      defaultValue: '',
    },
    fertilizerNeeds: {
      key: 'fertilizerNeeds',
      label: 'Fertilizer Needs',
      options: Object.values(FertilizerNeeds),
      defaultValue: '',
    },
  };
}

export default CropsDatabaseData;
