import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsStore/CropsStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddCropData from '../../../../auxiliary/data/AddCropData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';

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
    const data: PlantItem = {
      commonName: this.inputFields.commonName.value as string,
      notes: this.inputFields.notes.value as string,
      waterCycle: this.inputFields.waterCycle.value as number,
      pruningCycle: this.inputFields.pruningCycle.value as number,
      fertilizationCycle: this.inputFields.fertilizationCycle.value as number,
      harvestCycle: this.inputFields.harvestCycle.value as number,
      phMin: this.inputFields.phMin.value as number,
      phMax: this.inputFields.phMax.value as number,
      temperatureMin: this.inputFields.temperatureMin.value as number,
      temperatureMax: this.inputFields.temperatureMax.value as number,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: PlantItem = {
      commonName: this.inputFields.commonName.value as string,
      notes: this.inputFields.notes.value as string,
      waterCycle: this.inputFields.waterCycle.value as number,
      pruningCycle: this.inputFields.pruningCycle.value as number,
      fertilizationCycle: this.inputFields.fertilizationCycle.value as number,
      harvestCycle: this.inputFields.harvestCycle.value as number,
      phMin: this.inputFields.phMin.value as number,
      phMax: this.inputFields.phMax.value as number,
      temperatureMin: this.inputFields.temperatureMin.value as number,
      temperatureMax: this.inputFields.temperatureMax.value as number,
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
      DataMappingService.mapInputFields(data, this.inputFields);
      DataMappingService.mapDropdownFields(data, this.dropdownFields);
      DataMappingService.mapDateFields(data, this.dateFields);
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
