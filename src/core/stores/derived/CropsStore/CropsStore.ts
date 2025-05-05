import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { PlantItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import CropsData from '../../../../auxiliary/data/CropsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

class CropsStore extends SearchableStore<PlantItem> {
  private endpointService = new EndpointService('Plant');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }

  constructor() {
    super(['commonName']);

    Object.values(CropsData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders = CropsData.tableHeaders;

  public fetchData = async () => {
    const data = await this.endpointService.getData<PlantItem[]>();

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
