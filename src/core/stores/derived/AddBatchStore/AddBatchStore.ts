import { YourCropItem } from '../../../../api';
import yourCropsStore from '../BatchesStore/BatchesStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddBatchData from '../../../../auxiliary/data/AddBatchData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';

class AddBatchStore extends BaseFormStore {
  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super();

    Object.values(AddBatchData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddBatchData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
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
      location: this.dropdownFields.location.value as string,
      cropId: Number(this.inputFields.cropId.value),
      amount: ValueTransformService.toNumberOrUndefined(
        this.inputFields.amount.value,
      ),
      planted: this.dateFields.planted.value,
      lastWatered: ValueTransformService.toNull(
        this.dateFields.lastWatered.value,
      ),
      lastFertilized: ValueTransformService.toNull(
        this.dateFields.lastFertilized.value,
      ),
      lastPruned: ValueTransformService.toNull(
        this.dateFields.lastPruned.value,
      ),
      lastHarvested: ValueTransformService.toNull(
        this.dateFields.lastHarvested.value,
      ),
    };
  }
}

const addBatchStore = new AddBatchStore();
export default addBatchStore;
