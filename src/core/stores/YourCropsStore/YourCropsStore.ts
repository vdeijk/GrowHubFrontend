import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { YourCrop } from '../../../auxiliary/interfaces/YourCrop';
import { debounce } from '../../../auxiliary/utils/debounce';
import { runInAction } from 'mobx';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import EventBus from '../../../auxiliary/utils/EventTarget';
import { toJS } from 'mobx';

class YourCropsStore extends SearchableStore<YourCrop> {
  private endpointService = new EndpointService('YourCrops');
  public paginationStore = new PaginationStore();

  constructor() {
    super(['commonName']);

    EventBus.addEventListener('pagination:currentPageChanged', () => {
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
  
    });

    this.setDropdownFilters('genus', '', 'Genus');

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);
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
        
        this.dropdownFilters['genus'].options = this.extractGenera();
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public extractGenera = () => {
    const genera = new Set<string>();
    this.items.forEach((item) => {
      genera.add(String(item.location));
    });

    const genusOptions = Array.from(genera).map((genus) => ({
      value: genus,
      label: genus,
    }));
    if (!genusOptions.some((option) => option.value === '')) {
      genusOptions.unshift({ value: '', label: '' });
    }

    return genusOptions;
  };

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
