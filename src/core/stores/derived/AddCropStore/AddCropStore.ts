import {
  PlantItem,
  PlantItemClimateZoneEnum,
  PlantItemFertilizerNeedsEnum,
  PlantItemGrowthRateEnum,
  PlantItemPlantTypeEnum,
  PlantItemPruningEnum,
  PlantItemSoilPHEnum,
  PlantItemSoilTypeEnum,
  PlantItemSunPreferenceEnum,
  PlantItemWaterNeedsEnum,
} from '../../../../api';
import cropsDatabaseStore from '../CropsDatabaseStore/CropsDatabaseStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { Dropdown } from '../../../../auxiliary/classes/Dropdown';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';

class AddCropStore extends BaseFormStore {
  private endpointService = new EndpointService('Plant');

  constructor() {
    super();

    //@ts-ignore
    this.fields = {
      nameField: new InputField<string>(
        '',
        'Common Name',
        true,
        'Enter common name',
      ),
      sunPreferenceField: new Dropdown<string>('', 'Sun Preference', true),
      waterNeedsField: new Dropdown<string>('', 'Water Needs', true),
      soilTypeField: new Dropdown<string>('', 'Soil Type', true),
      soilPHField: new Dropdown<string>('', 'Soil PH', true),
      pruningField: new Dropdown<string>('', 'Pruning', true),
      climateZone: new Dropdown<string>('', 'Climate Zone', true),
      plantTypeField: new Dropdown<string>('', 'Plant Type', true),
      growthRateField: new Dropdown<string>('', 'Growth Rate', true),
      fertilizerNeedsField: new Dropdown<string>('', 'fertilizer Needs', true),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: PlantItem = {
      commonName: this.fields.nameField.value as string,
      sunPreference: this.fields.sunPreferenceField
        .value as PlantItemSunPreferenceEnum,
      waterNeeds: this.fields.waterNeedsField.value as PlantItemWaterNeedsEnum,
      soilType: this.fields.soilTypeField.value as PlantItemSoilTypeEnum,
      soilPH: this.fields.soilPHField.value as PlantItemSoilPHEnum,
      pruning: this.fields.pruningField.value as PlantItemPruningEnum,
      climateZone: this.fields.climateZone.value as PlantItemClimateZoneEnum,
      plantType: this.fields.plantTypeField.value as PlantItemPlantTypeEnum,
      growthRate: this.fields.growthRateField.value as PlantItemGrowthRateEnum,
      fertilizerNeeds: this.fields.fertilizerNeedsField
        .value as PlantItemFertilizerNeedsEnum,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: PlantItem = {
      commonName: this.fields.nameField.value as string,
      sunPreference: this.fields.sunPreferenceField
        .value as PlantItemSunPreferenceEnum,
      waterNeeds: this.fields.waterNeedsField.value as PlantItemWaterNeedsEnum,
      soilType: this.fields.soilTypeField.value as PlantItemSoilTypeEnum,
      soilPH: this.fields.soilPHField.value as PlantItemSoilPHEnum,
      pruning: this.fields.pruningField.value as PlantItemPruningEnum,
      climateZone: this.fields.climateZone.value as PlantItemClimateZoneEnum,
      plantType: this.fields.plantTypeField.value as PlantItemPlantTypeEnum,
      growthRate: this.fields.growthRateField.value as PlantItemGrowthRateEnum,
      fertilizerNeeds: this.fields.fertilizerNeedsField
        .value as PlantItemFertilizerNeedsEnum,
    };

    await this.endpointService.putData(`${id}`, data);

    cropsDatabaseStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: PlantItem | undefined =
      await this.endpointService.getData<PlantItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.fields.nameField.setValue(String(data.commonName));
      this.fields.sunPreferenceField.setValue(String(data.sunPreference));
      this.fields.waterNeedsField.setValue(String(data.waterNeeds));
      this.fields.soilTypeField.setValue(String(data.soilType));
      this.fields.soilPHField.setValue(String(data.soilPH));
      this.fields.pruningField.setValue(String(data.pruning));
      this.fields.climateZoneField.setValue(String(data.climateZone));
      this.fields.plantTypeField.setValue(String(data.plantType));
      this.fields.growthRateField.setValue(String(data.growthRate));
      this.fields.fertilizerNeedsField.setValue(String(data.fertilizerNeeds));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
