import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { getData } from '../../apis/getData';
import { deleteData } from '../../apis/deleteData';
import { debounce } from '../../../auxiliary/utils/debounce';
import { runInAction } from 'mobx';

class CropsDatabaseStore extends SearchableStore<Plant> {
  constructor() {
    super();

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
      const plants = await getData('/Plant');

      runInAction(() => {
        this.items = plants;
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
    await deleteData(`/plant/${id}`, id);

    this.fetchData();
  };
}

const cropsDatabaseStore = new CropsDatabaseStore();
export default cropsDatabaseStore;
