import { makeAutoObservable, runInAction } from 'mobx';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import { getPlantData } from '../../apis/plants';
import plants from '../../../auxiliary/data/plantsMock';
import testStore from '../TestStore/TestStore';
import { validate } from '../../../auxiliary/utils/validationMaxLength';
import { TextInputState } from '../../../auxiliary/interfaces/TextInputState';

class PlantsStore {
  plants: Plant[] = [];
  searchQuery: TextInputState = { value: '', error: '', maxLength: 10 };
  filterCriteria: string = '';
  filteredPlants: Plant[] = [];
  isLoading: boolean = false;
  debouncedFilterPlants: () => void;
  genusOptions: { value: string; label: string }[] = [];
  tableHeaders: { id: keyof Plant; label: string }[] = [
    { id: 'commonName', label: 'Common Name' },
    { id: 'genus', label: 'Genus' },
    { id: 'defaultImage', label: 'Image' },
    { id: 'scientificName', label: 'Scientific Name' },
  ];
  sortField: keyof Plant | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    makeAutoObservable(this);

    this.debouncedFilterPlants = debounce(this.filterPlants.bind(this), 500);
  }

  public fetchData() {
    if (testStore.useRealData) {
      this.retrieveData();
    } else {
      this.retrieveMockData();
    }
  }

  public extractGenera = () => {
    const genera = new Set<string>();
    this.plants.forEach((plant) => {
      genera.add(plant.genus);
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
      if (fieldA < fieldB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  public addPlant = (newPlant: Plant) => {
    this.plants.push(newPlant);
    this.filterPlants();
    this.genusOptions = this.extractGenera();
  };

  private retrieveMockData = () => {
    this.plants = plants;
    this.filteredPlants = this.plants;
    this.genusOptions = this.extractGenera();
  };

  private retrieveData = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    const result = await getPlantData();
    runInAction(() => {
      if (result.success && result.data) {
        this.plants = result.data;
        this.filteredPlants = this.plants;
        this.genusOptions = this.extractGenera();
      }

      this.isLoading = false;
    });
  };
}

const plantsStore = new PlantsStore();
export default plantsStore;
