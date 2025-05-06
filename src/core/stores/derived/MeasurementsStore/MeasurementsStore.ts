import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { MeasurementItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import TableColoringService from '../TableColoringService/TableColoringService';
import EventBus from '../../../services/EventBusService/EventBusService';
import { FilterService } from '../../../services/FilterService/FilterService';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import measurementsData from '../../../../auxiliary/data/MeasurementsData';
import i18next from 'i18next';

class MeasurementsStore extends SearchableStore<MeasurementItem> {
  private endpointService = new EndpointService('Measurements');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public get tableHeaders(): TableHeaderModel<MeasurementItem>[] {
    return measurementsData.tableHeaders;
  }

  constructor() {
    super(['title']);

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

    Object.values(measurementsData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });

    Object.values(measurementsData.textFieldsNumber).forEach((textField) => {
      this.initNumberFilter(textField);
    });

    Object.values(measurementsData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    measurementsData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });
  }

  private clearFilters() {
    this.stringFilters = {};
    this.numberFilters = {};
    this.dropdownFilters = {};
    this.dateFilters = {};
  }

  debouncedFilterMeasurements: (criteria: string) => void = () => {};

  public fetchData = async () => {
    const data = await this.endpointService.getData<MeasurementItem[]>();

    if (!data) return;

    runInAction(() => {
      const numericalKeys: {
        key: keyof MeasurementItem;
        thresholds: { red: number; yellow: number };
      }[] = [{ key: 'soilPH', thresholds: { red: 6, yellow: 7 } }];

      this.items = TableColoringService.getColoredNumericalValues(
        data,
        numericalKeys,
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
