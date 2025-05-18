import { ReadingItem } from '../../../../api';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import addMeasurementData from '../../../../auxiliary/data/AddMeasurementData';
import measurementsStore from '../MeasurementsStore/MeasurementsStore';
import { ReadingItemSoilDrynessEnum } from '../../../../api';
import { ReadingItemGrowthStageEnum } from '../../../../api';
import { ReadingItemHealthStatusEnum } from '../../../../api';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';
import i18next from 'i18next';
import { reaction } from 'mobx';
import DebounceService from '../../../services/DebounceService/DebounceService';
import batchesStore from '../BatchesStore/BatchesStore';

class AddMeasurementStore extends BaseFormStore {
  private endpointService = new EndpointService('Reading');

  constructor() {
    super();

    this.observeFilters();
    this.setupCropIdReaction();

    i18next.on('languageChanged', () => {
      this.observeFilters();
    });
  }

  private observeFilters() {
    this.clearFilters();

    Object.values(addMeasurementData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(addMeasurementData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    addMeasurementData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });
  }

  private clearFilters() {
    this.dropdownFields = {};
    this.inputFields = {};
    this.dateFields = {};
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
    const data: ReadingItem | undefined =
      await this.endpointService.getData<ReadingItem>(`${id}`);

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

  private getCropNameById(cropId: string): string | undefined {
    const batch = batchesStore.items.find((item) => item.id === cropId);
    return batch?.commonName ?? undefined;
  }

  private setupCropIdReaction() {
    const updateCommonName = DebounceService.debounce(() => {
      const batchId = String(this.inputFields.batchId.value);

      const title = this.getCropNameById(batchId);
      if (title) {
        this.inputFields.title.setValue(title);
      } else {
        this.inputFields.title.setValue('');
      }
    }, 300);

    reaction(
      () => this.inputFields.batchId.value,
      () => {
        updateCommonName();
      },
    );
  }

  private prepareData(): ReadingItem {
    return {
      title: this.inputFields.title.value as string,
      notes: this.inputFields.notes.value as string,
      batchId: String(this.inputFields.batchId.value),
      soilPH: ValueTransformService.toNumberOrUndefined(
        this.inputFields.soilPH.value,
      ),
      soilDryness: ValueTransformService.toEnumOrUndefined(
        this.dropdownFields.soilDryness?.value,
        ReadingItemSoilDrynessEnum,
      ),
      growthStage: this.dropdownFields.growthStage
        .value as ReadingItemGrowthStageEnum,
      healthStatus: this.dropdownFields.healthStatus
        .value as ReadingItemHealthStatusEnum,
      date: this.dateFields.date.value as string,
    };
  }
}

const addMeasurementStore = new AddMeasurementStore();
export default addMeasurementStore;
