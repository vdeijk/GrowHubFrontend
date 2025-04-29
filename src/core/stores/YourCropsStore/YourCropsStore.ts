import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { YourCrop } from '../../../auxiliary/interfaces/YourCrop';
import { debounce } from '../../../auxiliary/utils/debounce';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { GrowthStage } from '../../../auxiliary/enums/GrowthStage';
import { HealthStatus } from '../../../auxiliary/enums/HealthStatus';
import { InputField } from '../../../auxiliary/classes/InputField';
import fieldsStore from '../FieldsStore/FieldsStore';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import EventBus from '../../../auxiliary/utils/EventTarget';

class YourCropsStore extends SearchableStore<YourCrop> {
  private endpointService = new EndpointService('YourCrops');
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

    EventBus.addEventListener('locations:updated', () => {
      const fields: LocationItem[] = fieldsStore.getLocations();
      const locationNames = fields.map((field) => field.name);

      this.initDropdownFilter('location', '', 'Location', locationNames, '');
    });

    this.initDropdownFilter(
      'growthStage',
      '',
      'Growth Stage',
      Object.values(GrowthStage),
      '',
    );
    this.initDropdownFilter(
      'healthStatus',
      '',
      'Health Status',
      Object.values(HealthStatus),
      '',
    );

    this.initDateFilter('lastWatered', '', 'Last Watered');
    this.initDateFilter('lastFertilized', '', 'Last Fertilized');
    this.initDateFilter('lastPruned', '', 'Last Pruned');
    this.initDateFilter('lastHarvested', '', 'Last Harvested');

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      searchQuery: observable,
    });
  }

  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders: { id: keyof YourCrop; label: string; sortable: boolean }[] = [
    { id: 'id', label: 'Id', sortable: true },
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'location', label: 'Location', sortable: true },
    { id: 'lastWatered', label: 'Last Watered', sortable: true },
    { id: 'lastFertilized', label: 'Last Fertilized', sortable: true },
    { id: 'lastPruned', label: 'Last Pruned', sortable: true },
    { id: 'lastHarvested', label: 'Last Harvested', sortable: true },
    { id: 'healthStatus', label: 'Health Status', sortable: true },
    { id: 'growthStage', label: 'Growth Stage', sortable: true },
  ];

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
