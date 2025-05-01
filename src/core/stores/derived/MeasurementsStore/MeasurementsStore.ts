import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { MeasurementItem } from '../../../../api';
import { makeObservable, runInAction, action, computed } from 'mobx';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import MeasurementsData from '../../../../auxiliary/classes/MeasurementsData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

class MeasurementsStore extends SearchableStore<MeasurementItem> {
  private endpointService = new EndpointService('Measurements');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }

  constructor() {
    super(['title']);

    Object.values(MeasurementsData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(MeasurementsData.inputFields).forEach((inputField) => {
      this.initTextFilter(inputField);
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
