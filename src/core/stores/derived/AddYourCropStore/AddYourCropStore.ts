import { YourCropItem } from '../../../../api';
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
      location: new Dropdown<string>('', 'Location', true),
      growthStage: new Dropdown<string>('', 'Growth Stage', true),
      healthStatus: new Dropdown<string>('', 'Health Status', true),
      lastWatered: new DateField<string>('', 'Last Watered', false),
      lastFertilized: new DateField<string>('', 'Last Fertilized', false),
      lastPruned: new DateField<string>('', 'Last Pruned', false),
      lastHarvested: new DateField<string>('', 'Last Harvested', false),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: YourCropItem = {
      commonName: this.fields.nameField.value as string,
      location: this.fields.location.value as string,
      lastWatered: this.fields.lastWatered.value as string,
      lastFertilized: this.fields.lastFertilized.value as string,
      lastPruned: this.fields.lastPruned.value as string,
      lastHarvested: this.fields.lastHarvested.value as string,
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
      location: this.fields.location.value as string,
      lastWatered: this.fields.lastWatered.value as string,
      lastFertilized: this.fields.lastFertilized.value as string,
      lastPruned: this.fields.lastPruned.value as string,
      lastHarvested: this.fields.lastHarvested.value as string,
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
      this.fields.location.setValue(String(data.location));
      this.fields.lastWatered.setValue(String(data.lastWatered));
      this.fields.lastFertilized.setValue(String(data.lastFertilized));
      this.fields.lastPruned.setValue(String(data.lastPruned));
      this.fields.lastHarvested.setValue(String(data.lastHarvested));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addYourCropStore = new AddYourCropStore();
export default addYourCropStore;
