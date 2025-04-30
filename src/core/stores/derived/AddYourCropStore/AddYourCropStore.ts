import { YourCropItem, YourCropItemGrowthStageEnum, YourCropItemHealthStatusEnum } from '../../../../api';
import yourCropsStore from '../YourCropsStore/YourCropsStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { Dropdown } from '../../../../auxiliary/classes/Dropdown';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import { DateField } from '../../../../auxiliary/classes/DateField';

class AddYourCropStore extends BaseFormStore {
  private endpointService = new EndpointService('YourCrops');

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
      locationField: new Dropdown<string>('', 'Location', true),
      growthStageField: new Dropdown<string>('', 'Growth Stage', true),
      healthStatusField: new Dropdown<string>('', 'Health Status', true),
      lastWateredField: new DateField<string>('', 'Last Watered', false),
      lastFertilizedField: new DateField<string>('', 'Last Fertilized', false),
      lastPrunedField: new DateField<string>('', 'Last Pruned', false),
      lastHarvestedField: new DateField<string>('', 'Last Harvested', false),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: YourCropItem = {
      commonName: this.fields.nameField.value as string,
      location: this.fields.locationField.value as string,
      lastWatered: this.fields.lastWateredField.value as string,
      lastFertilized: this.fields.lastFertilizedField.value as string,
      lastPruned: this.fields.lastPrunedField.value as string,
      lastHarvested: this.fields.lastHarvestedField.value as string,
      healthStatus: this.fields.healthStatusField.value as YourCropItemHealthStatusEnum,
      growthStage: this.fields.growthStageField.value as YourCropItemGrowthStageEnum,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    yourCropsStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: YourCropItem = {
      commonName: this.fields.nameField.value as string,
      location: this.fields.locationField.value as string,
      lastWatered: this.fields.lastWateredField.value as string,
      lastFertilized: this.fields.lastFertilizedField.value as string,
      lastPruned: this.fields.lastPrunedField.value as string,
      lastHarvested: this.fields.lastHarvestedField.value as string,
      healthStatus: this.fields.healthStatusField.value as YourCropItemHealthStatusEnum,
      growthStage: this.fields.growthStageField.value as YourCropItemGrowthStageEnum,
    };

    await this.endpointService.putData(`${id}`, data);

    yourCropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: YourCropItem | undefined =
      await this.endpointService.getData<YourCropItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.fields.nameField.setValue(String(data.commonName));
      this.fields.locationField.setValue(String(data.location));
      this.fields.lastWateredField.setValue(String(data.lastWatered));
      this.fields.lastFertilizedField.setValue(String(data.lastFertilized));
      this.fields.lastPrunedField.setValue(String(data.lastPruned));
      this.fields.lastHarvestedField.setValue(String(data.lastHarvested));
      this.fields.healthStatusField.setValue(String(data.healthStatus));
      this.fields.growthStageField.setValue(String(data.growthStage));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addYourCropStore = new AddYourCropStore();
export default addYourCropStore;
