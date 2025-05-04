import { YourCropItem } from '../../../../api';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import AddMeasurementData from '../../../../auxiliary/data/AddMeasurementData';
import measurementsStore from '../MeasurementsStore/MeasurementsStore';

class AddMeasurementStore extends BaseFormStore {
  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super();

    Object.values(AddMeasurementData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddMeasurementData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    AddMeasurementData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });
  }

  public addReading = async () => {
    const data: YourCropItem = {
      commonName: this.inputFields.nameField.value as string,
      location: this.dropdownFields.location.value as string,
      lastWatered: this.dateFields.lastWatered.value as string,
      lastFertilized: this.dateFields.lastFertilized.value as string,
      lastPruned: this.dateFields.lastPruned.value as string,
      lastHarvested: this.dateFields.lastHarvested.value as string,
    };

    await this.endpointService.postData(data);

    measurementsStore.fetchData();
  };

  public updateReading = async (id: string) => {
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

    measurementsStore.fetchData();
  };

  public loadReading = async (id: string) => {
    const data: YourCropItem | undefined =
      await this.endpointService.getData<YourCropItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.inputFields.nameField.setValue(String(data.commonName));
      this.dropdownFields.location.setValue(String(data.location));
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

const addMeasurementStore = new AddMeasurementStore();
export default addMeasurementStore;
