import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { YourCropItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import BatchesData from '../../../../auxiliary/data/BatchesData';
import EventBus from '../../../services/EventBusService/EventBusService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import TableColoringService from '../TableColoringService/TableColoringService';

class BatchesStore extends SearchableStore<YourCropItem> {
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public debouncedFilterPlants: (criteria: string) => void = () => {};
  public tableHeaders = BatchesData.tableHeaders;

  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super(['commonName']);

    EventBus.addEventListener('locations:updated', () => {
      BatchesData.updateLocationDropdownOptions();
      this.initDropdownFilter(BatchesData.dropdowns['location']);
    });

    Object.values(BatchesData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(BatchesData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    BatchesData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  public async fetchData() {
    const data: YourCropItem[] | undefined =
      await this.endpointService.getData<YourCropItem[]>();
    if (!data) return;

    runInAction(() => {
      const dateKeys = [
        'lastWatered',
        'lastFertilized',
        'lastPruned',
        'lastHarvested',
      ] as (keyof YourCropItem)[];
      this.items = TableColoringService.getColoredDateValues(data, dateKeys);
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationService.paginateItems(
        this.filteredItems,
      );
    });
  }

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const batchesStore = new BatchesStore();
export default batchesStore;
