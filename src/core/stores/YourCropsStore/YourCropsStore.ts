import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { YourCrop } from '../../../auxiliary/interfaces/YourCrop';
import { debounce } from '../../../auxiliary/utils/debounce';
import { makeObservable, runInAction, observable, action } from 'mobx';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { WaterNeeds } from '../../../auxiliary/enums/WaterNeeds';
import { HealthStatus } from '../../../auxiliary/enums/HealthStatus';

class YourCropsStore extends SearchableStore<YourCrop> {
  private endpointService = new EndpointService('YourCrops');
  public paginationStore = new PaginationStore();

  constructor() {
    super(['commonName']);

    this.setDropdownFilters('location', '', 'Location', ['test'], '');
    this.setDropdownFilters(
      'waterNeeds',
      '',
      'WaterNeeds',
      Object.values(WaterNeeds),
      '',
    );
    this.setDropdownFilters(
      'healthStatus',
      '',
      'Health Status',
      Object.values(HealthStatus),
      '',
    );

    this.setDateFilters('lastWatered', '', 'Last Watered');
    this.setDateFilters('lastFertilized', '', 'Last Fertilized');
    this.setDateFilters('lastPruned', '', 'Last Pruned');
    this.setDateFilters('lastHarvested', '', 'Last Harvested');

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);

    makeObservable(this, {
      isLoading: observable,
      fetchData: action,
      matchesFilterCriteria: action,
    });
  }

  isLoading: boolean = false;
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
    runInAction(() => {
      this.isLoading = true;
    });

    try {
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
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public matchesFilterCriteria(plant: YourCrop): boolean {
    const value = this.dropdownFilters['genus'].value;
    return value === '' || plant.location === value;
  }

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const yourCropsStore = new YourCropsStore();
export default yourCropsStore;
