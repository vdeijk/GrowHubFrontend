import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { YourCropItem } from '../../../../api';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import YourCropsData from '../../../../auxiliary/classes/YourCropData';
import { InputField } from '../../../../auxiliary/classes/InputField';
import EventBus from '../../../services/EventBusService/EventBusService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

class YourCropsStore extends SearchableStore<YourCropItem> {
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public searchQuery = new InputField<string>(
    '',
    'Search',
    false,
    'Enter search query',
    50,
  );
  public debouncedFilterPlants: (criteria: string) => void = () => {};
  public tableHeaders = YourCropsData.tableHeaders;

  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super(['commonName']);

    EventBus.addEventListener('locations:updated', () => {
      this.initDropdownFilter(YourCropsData.dropdowns['location']);
    });

    Object.values(YourCropsData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    YourCropsData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      searchQuery: observable,
    });
  }

  public async fetchData() {
    const data: YourCropItem[] | undefined =
      await this.endpointService.getData<YourCropItem[]>();
    if (!data) return;

    runInAction(() => {
      this.items = data;
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

const yourCropsStore = new YourCropsStore();
export default yourCropsStore;
