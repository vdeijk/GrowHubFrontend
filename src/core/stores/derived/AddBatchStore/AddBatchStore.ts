import { YourCropItem } from '../../../../api';
import yourCropsStore from '../BatchesStore/BatchesStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddBatchData from '../../../../auxiliary/data/AddBatchData';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import ValueTransformService from '../../../services/ValueTransformService/ValueTransformService';
import i18next from 'i18next';
import cropsStore from '../CropsStore/CropsStore';
import DebounceService from '../../../services/DebounceService/DebounceService';
import { reaction } from 'mobx';

class AddBatchStore extends BaseFormStore {
  private endpointService = new EndpointService('YourCrops');

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

  private clearFilters() {
    this.dropdownFields = {};
    this.inputFields = {};
    this.dateFields = {};
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
    if (
      this.validateRequired() &&
      this.getCropNameById(Number(this.inputFields.cropId.value))
    )
      return true;

    return false;
  }

  private getCropNameById(cropId: number): string | undefined {
    const crop = cropsStore.items.find((item) => item.id === cropId);
    return crop?.commonName ?? undefined;
  }


  private setupCropIdReaction() {
    const updateCommonName = DebounceService.debounce(() => {
      const cropId = Number(this.inputFields.cropId.value);
      if (Number.isNaN(cropId)) {
        this.inputFields.commonName.setValue(''); 
        return;
      }

      const commonName = this.getCropNameById(cropId);
      if (commonName) {
        this.inputFields.commonName.setValue(commonName); 
      } else {
        this.inputFields.commonName.setValue(''); 
      }
    }, 300); 

    reaction(
      () => this.inputFields.cropId.value,
      () => {
        updateCommonName();
      }
    );
  }

  private prepareData() {
    const commonName = this.getCropNameById(
      Number(this.inputFields.cropId.value),
    );

    return {
      commonName,
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
