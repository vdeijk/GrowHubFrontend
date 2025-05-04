import { MeasurementItem } from '../../../../api';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import AddMeasurementData from '../../../../auxiliary/data/AddMeasurementData';
import measurementsStore from '../MeasurementsStore/MeasurementsStore';
import { MeasurementItemSoilDrynessEnum } from '../../../../api';
import { MeasurementItemGrowthStageEnum } from '../../../../api';
import { MeasurementItemHealthStatusEnum } from '../../../../api';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';

class AddMeasurementStore extends BaseFormStore {
  private endpointService = new EndpointService('Measurements');

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
    const data: MeasurementItem = {
      title: this.inputFields.title.value as string,
      notes: this.inputFields.notes.value as string,
      soilPH: this.inputFields.soilPH.value as number,
      soilDryness: this.dropdownFields.soilDryness
        .value as MeasurementItemSoilDrynessEnum,
      growthStage: this.dropdownFields.growthStage
        .value as MeasurementItemGrowthStageEnum,
      healthStatus: this.dropdownFields.healthStatus
        .value as MeasurementItemHealthStatusEnum,
    };

    await this.endpointService.postData(data);

    measurementsStore.fetchData();
  };

  public updateReading = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: MeasurementItem = {
      title: this.inputFields.title.value as string,
      notes: this.inputFields.notes.value as string,
      soilPH: this.inputFields.soilPH.value as number,
      soilDryness: this.dropdownFields.soilDryness
        .value as MeasurementItemSoilDrynessEnum,
      growthStage: this.dropdownFields.growthStage
        .value as MeasurementItemGrowthStageEnum,
      healthStatus: this.dropdownFields.healthStatus
        .value as MeasurementItemHealthStatusEnum,
    };

    await this.endpointService.putData(`${id}`, data);

    measurementsStore.fetchData();
  };

  public loadReading = async (id: string) => {
    const data: MeasurementItem | undefined =
      await this.endpointService.getData<MeasurementItem>(`${id}`);

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

const addMeasurementStore = new AddMeasurementStore();
export default addMeasurementStore;
