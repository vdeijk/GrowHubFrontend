import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import { runInAction } from 'mobx';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { localStorageService } from '../../../auxiliary/classes/LocalStorageService';

class CropsDatabaseStore extends SearchableStore<Plant> {
  private endpointService = new EndpointService('Plant');
  public paginationStore = new PaginationStore();

  constructor() {
    super(['commonName']);

    this.setDropdownFilters('genus', '', 'Genus');

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);
  }

  isLoading: boolean = false;
  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders: { id: keyof Plant; label: string; sortable: boolean }[] = [
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'sunPreference', label: 'Sun Preference', sortable: true },
    { id: 'waterNeeds', label: 'WaterNeeds', sortable: true },
    { id: 'soilType', label: 'Soil Type', sortable: true },
    { id: 'soilPH', label: 'Soil PH', sortable: true },
    { id: 'pruning', label: 'Pruning', sortable: true },
    { id: 'temperatureRange', label: 'Temperature Range', sortable: true },
    { id: 'plantType', label: 'Plant Type', sortable: true },
    { id: 'growthRate', label: 'Growth Rate', sortable: true },
    { id: 'fertilizerNeeds', label: 'Fertilizer Needs', sortable: true },
  ];

  public fetchData = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data = await localStorageService.fetchWithCache<Plant[]>(
        'cropsDatabaseItems',
        async () => (await this.endpointService.getData<Plant[]>()) || [],
        7,
      );

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
  };

  public extractGenera = () => {
    const genera = new Set<string>();
    this.items.forEach((item) => {
      genera.add(String(item.genus));
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

  public matchesFilterCriteria = (plant: Plant): boolean => {
    const value = this.dropdownFilters['genus'].value;
    return value === '' || plant.genus === value;
  };

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };

  public setPage = (page: number) => {
    if (page > 0 && page <= this.paginationStore.totalPages) {
      this.paginationStore.setCurrentPage(page);
      this.fetchData();
    }
  };
}

const cropsDatabaseStore = new CropsDatabaseStore();
export default cropsDatabaseStore;
