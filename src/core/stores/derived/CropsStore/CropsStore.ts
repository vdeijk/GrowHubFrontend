import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { PlantItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import CropsDatabaseData from '../../../../auxiliary/data/CropsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

class CropsStore extends SearchableStore<PlantItem> {
  private endpointService = new EndpointService('Plant');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }

  constructor() {
    super(['commonName']);

    Object.values(CropsDatabaseData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders = CropsDatabaseData.tableHeaders;

  public syncData = () => {
    localStorageService.invalidateCache('cropsDatabaseItems');
    this.fetchData();
  };

  public fetchData = async () => {
    const data = await localStorageService.fetchWithCache<PlantItem[]>(
      'cropsDatabaseItems',
      async () => (await this.endpointService.getData<PlantItem[]>()) || [],
      7,
    );

    if (!data) return;

    runInAction(() => {
      this.items = data;
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationService.paginateItems(
        this.filteredItems,
      );
    });
  };

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    localStorageService.invalidateCache('cropsDatabaseItems');

    this.fetchData();
  };
}

const cropsStore = new CropsStore();
export default cropsStore;
