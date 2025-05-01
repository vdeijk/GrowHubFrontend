import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { MeasurementItem } from '../../../../api';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { InputField } from '../../../../auxiliary/classes/InputField';
import MeasurementsData from '../../../../auxiliary/classes/MeasurementsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

class MeasurementsStore extends SearchableStore<MeasurementItem> {
  private endpointService = new EndpointService('Measurements');
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

  constructor() {
    super(['title']);

    Object.values(MeasurementsData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    MeasurementsData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      searchQuery: observable,
    });
  }

  debouncedFilterMeasurements: (criteria: string) => void = () => {};
  tableHeaders = MeasurementsData.tableHeaders;

  public fetchData = async () => {
    const data = await this.endpointService.getData<MeasurementItem[]>();

    if (!data) return;

    runInAction(() => {
      this.items = data;
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
}

const measurementsStore = new MeasurementsStore();
export default measurementsStore;
