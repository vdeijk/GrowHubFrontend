import { YourCropItem } from '../../../../api';
import yourCropsStore from '../BatchesStore/BatchesStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddBatchData from '../../../../auxiliary/data/AddBatchData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';

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
    await this.endpointService.postData(this.prepareData());

    localStorageService.invalidateCache('cropsDatabaseItems');
    yourCropsStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    await this.endpointService.putData(`${id}`, this.prepareData());

    yourCropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: YourCropItem | undefined =
      await this.endpointService.getData<YourCropItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      DataMappingService.mapInputFields(data, this.inputFields);
      DataMappingService.mapDropdownFields(data, this.dropdownFields);
      DataMappingService.mapDateFields(data, this.dateFields);
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }

  private prepareData(): YourCropItem {
    return {
      commonName: this.inputFields.commonName.value as string,
      location: "test",
      lastWatered: this.dateFields.lastWatered.value as string,
      lastFertilized: this.dateFields.lastFertilized.value as string,
      lastPruned: this.dateFields.lastPruned.value as string,
      lastHarvested: this.dateFields.lastHarvested.value as string,
    };
  }
}

const addBatchStore = new AddBatchStore();
export default addBatchStore;
