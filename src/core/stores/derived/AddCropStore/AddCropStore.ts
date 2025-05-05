import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsStore/CropsStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddCropData from '../../../../auxiliary/data/AddCropData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';

class AddCropStore extends BaseFormStore {
  private endpointService = new EndpointService('Plant');

  constructor() {
    super();

    Object.values(AddCropData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddCropData.dropdownFields).forEach((dropdownField) => {
      this.initDropdownFilter(dropdownField);
    });
  }

  public addCrop = async () => {
    await this.endpointService.postData(this.prepareData());

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    await this.endpointService.putData(`${id}`, this.prepareData());

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: PlantItem | undefined =
      await this.endpointService.getData<PlantItem>(`${id}`);

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

  private prepareData(): PlantItem {
    return {
      commonName: this.inputFields.commonName.value as string,
      notes: this.inputFields.notes.value as string,
      waterCycle: ValueTransformService.toNumberOrUndefined(
        this.inputFields.waterCycle.value,
      ),
      pruningCycle: ValueTransformService.toNumberOrUndefined(
        this.inputFields.pruningCycle.value,
      ),
      fertilizationCycle: ValueTransformService.toNumberOrUndefined(
        this.inputFields.fertilizationCycle.value,
      ),
      harvestCycle: ValueTransformService.toNumberOrUndefined(
        this.inputFields.harvestCycle.value,
      ),
      phMin: ValueTransformService.toNumberOrUndefined(
        this.inputFields.phMin.value,
      ),
      phMax: ValueTransformService.toNumberOrUndefined(
        this.inputFields.phMax.value,
      ),
      temperatureMin: ValueTransformService.toNumberOrUndefined(
        this.inputFields.temperatureMin.value,
      ),
      temperatureMax: ValueTransformService.toNumberOrUndefined(
        this.inputFields.temperatureMax.value,
      ),    };
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
