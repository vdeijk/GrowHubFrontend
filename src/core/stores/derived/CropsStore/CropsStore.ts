import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { PlantItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import cropsData from '../../../../auxiliary/data/CropsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import i18next from 'i18next';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

class CropsStore extends SearchableStore<PlantItem> {
  private endpointService = new EndpointService('Plant');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public get tableHeaders(): TableHeaderModel<PlantItem>[] {
    return cropsData.tableHeaders;
  }

  constructor() {
    super(['commonName']);

    this.observeFilters();

    i18next.on('languageChanged', () => {
      this.observeFilters();
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  private observeFilters() {
    this.clearFilters();

    Object.values(cropsData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });
  }

  private clearFilters() {
    this.stringFilters = {};
  }

  debouncedFilterPlants: (criteria: string) => void = () => {};

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
