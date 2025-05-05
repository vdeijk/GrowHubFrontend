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
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';

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
    await this.endpointService.postData(this.prepareData());

    measurementsStore.fetchData();
  };

  public updateReading = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    await this.endpointService.putData(`${id}`, this.prepareData());

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

  prepareData(): MeasurementItem {
    return {
      title: this.inputFields.title.value as string,
      notes: this.inputFields.notes.value as string,
      soilPH: ValueTransformService.toNumberOrUndefined(
        this.inputFields.soilPH.value,
      ),
      soilDryness: this.dropdownFields.soilDryness
        .value as MeasurementItemSoilDrynessEnum,
      growthStage: this.dropdownFields.growthStage
        .value as MeasurementItemGrowthStageEnum,
      healthStatus: this.dropdownFields.healthStatus
        .value as MeasurementItemHealthStatusEnum,
      date: this.dateFields.date.value as string,
    };
  }
}

const addMeasurementStore = new AddMeasurementStore();
export default addMeasurementStore;
