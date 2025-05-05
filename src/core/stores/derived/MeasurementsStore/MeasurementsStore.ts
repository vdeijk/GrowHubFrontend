import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { MeasurementItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import MeasurementsData from '../../../../auxiliary/data/MeasurementsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import TableColoringService from '../TableColoringService/TableColoringService';
import EventBus from '../../../services/EventBusService/EventBusService';
import { FilterService } from '../../../services/FilterService/FilterService';

class MeasurementsStore extends SearchableStore<MeasurementItem> {
  private endpointService = new EndpointService('Measurements');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }

  constructor() {
    super(['title']);

    Object.values(MeasurementsData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });

    Object.values(MeasurementsData.textFieldsNumber).forEach((textField) => {
      this.initNumberFilter(textField);
    });

    Object.values(MeasurementsData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    MeasurementsData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  debouncedFilterMeasurements: (criteria: string) => void = () => {};
  tableHeaders = MeasurementsData.tableHeaders;

  public fetchData = async () => {
    const data = await this.endpointService.getData<MeasurementItem[]>();

    if (!data) return;

    runInAction(() => {
      const numericalKeys: {
        key: keyof MeasurementItem;
        thresholds: { red: number; yellow: number };
      }[] = [{ key: 'soilPH', thresholds: { red: 6, yellow: 7 } }];
      const dateKeys = ['date'] as (keyof MeasurementItem)[];

      let coloredItems = TableColoringService.getColoredNumericalValues(
        data,
        numericalKeys,
      );
      this.items = TableColoringService.getColoredDateValues(
        coloredItems,
        dateKeys,
      );

      this.filteredItems = this.items;
      this.paginatedItems = this.paginationService.paginateItems(
        this.filteredItems,
      );
    });
  };

  public deleteMeasurement = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };

  public filterItems() {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.stringFilters.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['dateMax'].value,
      'date',
    );
    filtered = FilterService.filterByStartDate(
      filtered,
      this.dateFilters['dateMin'].value,
      'date',
    );
    filtered = FilterService.filterByGreaterThan(
      filtered,
      Number(this.numberFilters['phMin'].value),
      'soilPH',
    );
    filtered = FilterService.filterBySmallerThan(
      filtered,
      Number(this.numberFilters['phMax'].value),
      'soilPH',
    );

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  }
}

const measurementsStore = new MeasurementsStore();
export default measurementsStore;
