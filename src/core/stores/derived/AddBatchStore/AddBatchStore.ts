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
    };

    await this.endpointService.putData(`${id}`, data);

    yourCropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: YourCropItem | undefined =
      await this.endpointService.getData<YourCropItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.inputFields.nameField.setValue(String(data.commonName));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addBatchStore = new AddBatchStore();
export default addBatchStore;
