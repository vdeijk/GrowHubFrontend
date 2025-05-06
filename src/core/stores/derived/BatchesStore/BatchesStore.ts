import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { YourCropItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import batchesData from '../../../../auxiliary/data/BatchesData';
import EventBus from '../../../services/EventBusService/EventBusService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import TableColoringService from '../TableColoringService/TableColoringService';
import { FilterService } from '../../../services/FilterService/FilterService';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

class BatchesStore extends SearchableStore<YourCropItem> {
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public debouncedFilterPlants: (criteria: string) => void = () => {};
  public get tableHeaders(): TableHeaderModel<YourCropItem>[] {
    return batchesData.tableHeaders;
  }

  private endpointService = new EndpointService('YourCrops');

  constructor() {
    super(['commonName']);

    EventBus.addEventListener('locations:updated', () => {
      batchesData.updateLocationDropdownOptions();
      this.initDropdownFilter(batchesData.dropdowns['location']);
    });

    Object.values(batchesData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });

    Object.values(batchesData.textFieldsNumber).forEach((textField) => {
      this.initNumberFilter(textField);
    });

    Object.values(batchesData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    batchesData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      tableHeaders: computed,
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

  public filterItems() {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.stringFilters.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['planted'].value,
      'planted',
    );
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['lastWatered'].value,
      'lastWatered',
    );
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['lastFertilized'].value,
      'lastFertilized',
    );
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['lastPruned'].value,
      'lastPruned',
    );
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['lastHarvested'].value,
      'lastHarvested',
    );

    filtered = FilterService.filterByGreaterThan(
      filtered,
      Number(this.numberFilters['minAmount'].value),
      'amount',
    );
    filtered = FilterService.filterBySmallerThan(
      filtered,
      Number(this.numberFilters['maxAmount'].value),
      'amount',
    );

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  }

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const batchesStore = new BatchesStore();
export default batchesStore;
