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
      sunPreference: new Dropdown<string>('', 'Sun Preference', true),
      waterNeeds: new Dropdown<string>('', 'Water Needs', true),
      soilType: new Dropdown<string>('', 'Soil Type', true),
      soilPH: new Dropdown<string>('', 'Soil PH', true),
      pruning: new Dropdown<string>('', 'Pruning', true),
      climateZone: new Dropdown<string>('', 'Climate Zone', true),
      plantType: new Dropdown<string>('', 'Plant Type', true),
      growthRate: new Dropdown<string>('', 'Growth Rate', true),
      fertilizerNeeds: new Dropdown<string>('', 'fertilizer Needs', true),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: PlantItem = {
      commonName: this.fields.nameField.value as string,
      sunPreference: this.fields.sunPreference
        .value as PlantItemSunPreferenceEnum,
      waterNeeds: this.fields.waterNeeds.value as PlantItemWaterNeedsEnum,
      soilType: this.fields.soilType.value as PlantItemSoilTypeEnum,
      soilPH: this.fields.soilPH.value as PlantItemSoilPHEnum,
      pruning: this.fields.pruning.value as PlantItemPruningEnum,
      climateZone: this.fields.climateZone.value as PlantItemClimateZoneEnum,
      plantType: this.fields.plantType.value as PlantItemPlantTypeEnum,
      growthRate: this.fields.growthRate.value as PlantItemGrowthRateEnum,
      fertilizerNeeds: this.fields.fertilizerNeeds
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
      sunPreference: this.fields.sunPreference
        .value as PlantItemSunPreferenceEnum,
      waterNeeds: this.fields.waterNeeds.value as PlantItemWaterNeedsEnum,
      soilType: this.fields.soilType.value as PlantItemSoilTypeEnum,
      soilPH: this.fields.soilPH.value as PlantItemSoilPHEnum,
      pruning: this.fields.pruning.value as PlantItemPruningEnum,
      climateZone: this.fields.climateZone.value as PlantItemClimateZoneEnum,
      plantType: this.fields.plantType.value as PlantItemPlantTypeEnum,
      growthRate: this.fields.growthRate.value as PlantItemGrowthRateEnum,
      fertilizerNeeds: this.fields.fertilizerNeeds
        .value as PlantItemFertilizerNeedsEnum,
    };
    
    await this.endpointService.putData(`${id}`, data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: PlantItem | undefined =
      await this.endpointService.getData<PlantItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.fields.nameField.setValue(String(data.commonName));
      this.fields.sunPreference.setValue(String(data.sunPreference));
      this.fields.waterNeeds.setValue(String(data.waterNeeds));
      this.fields.soilType.setValue(String(data.soilType));
      this.fields.soilPH.setValue(String(data.soilPH));
      this.fields.pruning.setValue(String(data.pruning));
      this.fields.climateZone.setValue(String(data.climateZone));
      this.fields.plantType.setValue(String(data.plantType));
      this.fields.growthRate.setValue(String(data.growthRate));
      this.fields.fertilizerNeeds.setValue(String(data.fertilizerNeeds));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
