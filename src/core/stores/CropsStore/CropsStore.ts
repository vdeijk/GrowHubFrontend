import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import { runInAction } from 'mobx';
import { EndpointService } from '../../apis/EndpointService';

class CropsStore extends SearchableStore<Plant> {
  private endpointService = new EndpointService('Plant');

  constructor() {
    super(['commonName']);

    this.setFilterCriteria('genus', '');

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);
  }

  isLoading: boolean = false;
  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders: { id: keyof Plant; label: string; sortable: boolean }[] = [
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'genus', label: 'Genus', sortable: true },
    { id: 'scientificName', label: 'Scientific Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  public async fetchData() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: Plant[] | undefined =
        await this.endpointService.getData<Plant[]>();

      if (!data) return;

      runInAction(() => {
        this.items = data;
        this.filteredItems = this.items;
        this.filterCriteria['genus'].options = this.extractGenera();
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
      genera.add(String(item.genus));
    });

    const genusOptions = Array.from(genera).map((genus) => ({
      value: genus,
      label: genus,
    }));
    if (!genusOptions.some((option) => option.value === '')) {
      genusOptions.unshift({ value: '', label: 'All Genera' });
    }

    return genusOptions;
  };

  public matchesFilterCriteria(plant: Plant): boolean {
    const value = this.filterCriteria['genus'].value;
    return value === '' || plant.genus === value;
  }

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const cropsStore = new CropsStore();
export default cropsStore;
