import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsStore/CropsStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddCropData from '../../../../auxiliary/data/AddCropData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';
import { MonthEnum } from '../../../../auxiliary/enums/MonthEnum';

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
      ),
      harvestStart: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.harvestStart?.value,
          MonthEnum.January,
        ),
        MonthEnum,
      ),
      harvestEnd: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.harvestEnd?.value,
          MonthEnum.December,
        ),
        MonthEnum,
      ),
      pruningStart: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.pruningStart?.value,
          MonthEnum.January,
        ),
        MonthEnum,
      ),
      pruningEnd: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.pruningEnd?.value,
          MonthEnum.December,
        ),
        MonthEnum,
      ),
      fertilizingStart: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.fertilizingStart?.value,
          MonthEnum.January,
        ),
        MonthEnum,
      ),
      fertilizingEnd: ValueTransformService.toEnumOrUndefined(
        this.prepareMonthEnum(
          this.dropdownFields.fertilizingEnd?.value,
          MonthEnum.December,
        ),
        MonthEnum,
      ),
    };
  }

  private prepareMonthEnum = (
    value: string | number | null | undefined,
    defaulValue: string,
  ) => {
    return value === undefined || value === null ? defaulValue : String(value);
  };
}

const addCropStore = new AddCropStore();
export default addCropStore;
