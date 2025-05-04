import { YourCropItem } from '../../../../api';
import yourCropsStore from '../BatchesStore/BatchesStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddBatchData from '../../../../auxiliary/data/AddBatchData';

class AddBatchStore extends BaseFormStore {
  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super();

    Object.values(AddBatchData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddBatchData.dateFields).forEach((dateField) => {
      this.initDateFilter(dateField);
    });
  }

  public addCrop = async () => {
    const data: YourCropItem = {
      commonName: this.inputFields.nameField.value as string,
      location: this.dropdownFields.location.value as string,
      lastWatered: this.dateFields.lastWatered.value as string,
      lastFertilized: this.dateFields.lastFertilized.value as string,
      lastPruned: this.dateFields.lastPruned.value as string,
      lastHarvested: this.dateFields.lastHarvested.value as string,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    yourCropsStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: YourCropItem = {
      commonName: this.inputFields.nameField.value as string,
      location: this.dropdownFields.location.value as string,
      lastWatered: this.dateFields.lastWatered.value as string,
      lastFertilized: this.dateFields.lastFertilized.value as string,
      lastPruned: this.dateFields.lastPruned.value as string,
      lastHarvested: this.dateFields.lastHarvested.value as string,
    };

    await this.endpointService.putData(`${id}`, data);

    yourCropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: YourCropItem | undefined =
      await this.endpointService.getData<YourCropItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.inputFields.commonName.setValue(String(data.commonName));
      this.inputFields.notes.setValue(String(data.notes));
      this.inputFields.amount.setValue(String(data.amount));

      this.dateFields.lastWatered.setValue(String(data.lastWatered));
      this.dateFields.lastFertilized.setValue(String(data.lastFertilized));
      this.dateFields.lastPruned.setValue(String(data.lastPruned));
      this.dateFields.lastHarvested.setValue(String(data.lastHarvested));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addBatchStore = new AddBatchStore();
export default addBatchStore;
