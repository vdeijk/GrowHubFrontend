import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../services/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { localStorageService } from '../../services/LocalStorageService';
import { InputField } from '../../../auxiliary/classes/InputField';
import CropsDatabaseData from '../../../auxiliary/classes/CropsDatabaseData';
import DebounceService from '../../services/DebounceService';

class CropsDatabaseStore extends SearchableStore<Plant> {
  private endpointService = new EndpointService('Plant');
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

  constructor() {
    super(['commonName']);

    Object.values(CropsDatabaseData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
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

  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders = CropsDatabaseData.tableHeaders;

  public syncData = () => {
    localStorageService.invalidateCache('cropsDatabaseItems');
    this.fetchData();
  };

  public fetchData = async () => {
    const data = await localStorageService.fetchWithCache<Plant[]>(
      'cropsDatabaseItems',
      async () => (await this.endpointService.getData<Plant[]>()) || [],
      7,
    );

    if (!data) return;

    runInAction(() => {
      this.items = data;
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
    });
  };

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const cropsDatabaseStore = new CropsDatabaseStore();
export default cropsDatabaseStore;
