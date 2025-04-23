import { makeAutoObservable, runInAction } from 'mobx';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import { getData } from '../../apis/getData';
import { validate } from '../../../auxiliary/utils/validationMaxLength';
import { TextInputState } from '../../../auxiliary/interfaces/TextInputState';
import { deleteData } from '../../apis/deleteData';

class CropsDatabaseStore {
  plants: Plant[] = [];
  searchQuery: TextInputState = { value: '', error: '', maxLength: 10 };
  filterCriteria: string = '';
  filteredPlants: Plant[] = [];
  isLoading: boolean = false;
  debouncedFilterPlants: () => void;
  genusOptions: { value: string; label: string }[] = [];
  tableHeaders: { id: keyof Plant; label: string; sortable: boolean }[] = [
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'genus', label: 'Genus', sortable: true },
    { id: 'scientificName', label: 'Scientific Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];
  sortField: keyof Plant | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    makeAutoObservable(this, {
      debouncedFilterPlants: false,
    });

    this.debouncedFilterPlants = debounce(this.filterPlants.bind(this), 500);
  }

  public async fetchData() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const plants = await getData('/Plant');

      runInAction(() => {
        this.plants = plants;
        this.filteredPlants = this.plants;
        this.genusOptions = this.extractGenera();
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public extractGenera = () => {
    const genera = new Set<string>();
    this.plants.forEach((plant) => {
      genera.add(String(plant.genus));
    });

    const genusOptions = Array.from(genera).map((genus) => ({
      value: genus,
      label: genus,
    }));
    genusOptions.unshift({ value: '', label: 'All Genera' });

    return genusOptions;
  };

  public setSearchQuery = (query: string) => {
    runInAction(() => {
      this.searchQuery.error = validate(query, this.searchQuery.maxLength);

      if (this.searchQuery.error) {
        return;
      }

      this.searchQuery.value = query;

      this.debouncedFilterPlants();
    });
  };

  public setFilterCriteria = (criteria: string) => {
    runInAction(() => {
      this.filterCriteria = criteria;
      this.filterPlants();
    });
  };

  public filterPlants = () => {
    this.filteredPlants = this.plants.filter((plant) => {
      return (
        typeof plant.commonName === 'string' &&
        plant.commonName
          .toLowerCase()
          .includes(this.searchQuery.value.toLowerCase()) &&
        (this.filterCriteria === '' || plant.genus === this.filterCriteria)
      );
    });
    this.sortPlants();
  };

  public setSortField = (field: keyof Plant) => {
    runInAction(() => {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortOrder = 'asc';
      }
      this.sortPlants();
    });
  };

  public sortPlants = () => {
    this.filteredPlants = this.filteredPlants.slice().sort((a, b) => {
      const fieldA = (a as Plant)[this.sortField as keyof Plant];
      const fieldB = (b as Plant)[this.sortField as keyof Plant];
      if (fieldA === undefined || fieldB === undefined) {
        return 0;
      }
      if (fieldA < fieldB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  public deletePlant = async (id: number) => {
    await deleteData(`/plant/${id}`, id);

    this.fetchData();
  };
}

const cropsStore = new CropsDatabaseStore();
export default cropsStore;
