import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsStore/CropsStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddCropData from '../../../../auxiliary/data/AddCropData';

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
      this.inputFields.commonName.setValue(String(data.commonName));
      this.inputFields.notes.setValue(String(data.notes));
      this.inputFields.waterCycle.setValue(String(data.waterCycle));
      this.inputFields.pruningCycle.setValue(String(data.pruningCycle));
      this.inputFields.fertilizationCycle.setValue(
        String(data.fertilizationCycle),
      );
      this.inputFields.harvestCycle.setValue(String(data.harvestCycle));
      this.inputFields.phMin.setValue(String(data.phMin));
      this.inputFields.phMax.setValue(String(data.phMax));
      this.inputFields.temperatureMin.setValue(String(data.temperatureMin));
      this.inputFields.temperatureMax.setValue(String(data.temperatureMax));

      this.dropdownFields.harvestStart.setValue(String(data.harvestStart));
      this.dropdownFields.harvestEnd.setValue(String(data.harvestEnd));
      this.dropdownFields.pruningStart.setValue(String(data.pruningStart));
      this.dropdownFields.pruningEnd.setValue(String(data.pruningEnd));
      this.dropdownFields.fertilizingStart.setValue(
        String(data.fertilizingStart),
      );
      this.dropdownFields.fertilizingEnd.setValue(String(data.fertilizingEnd));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
