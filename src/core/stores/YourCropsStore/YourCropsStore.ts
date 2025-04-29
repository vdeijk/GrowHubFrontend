import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { YourCrop } from '../../../auxiliary/interfaces/YourCrop';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../services/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import YourCropsData from '../../../auxiliary/classes/YourCropData';
import { InputField } from '../../../auxiliary/classes/InputField';
import EventBus from '../../services/EventTarget';
import DebounceService from '../../services/DebounceService';

class YourCropsStore extends SearchableStore<YourCrop> {
  public paginationStore = new PaginationStore();
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

    this.debouncedFilterPlants = DebounceService.debounce(
      this.filterItems.bind(this),
      500,
    );

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      searchQuery: observable,
    });
  }

  public async fetchData() {
    const data: YourCrop[] | undefined =
      await this.endpointService.getData<YourCrop[]>();
    if (!data) return;

    runInAction(() => {
      this.items = data;
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationStore.paginateItems(
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
