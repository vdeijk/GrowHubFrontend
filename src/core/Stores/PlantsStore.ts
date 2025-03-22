import { makeAutoObservable, runInAction } from 'mobx';
import { Plant } from '../../auxiliary/interfaces/Plant';
import { debounce } from '../../auxiliary/utils/debounce';
import { getPlantData } from '../apis/plants';
import plants from '../../auxiliary/data/plantsMock';

class PlantsStore {
  plants: Plant[] = [];
  searchQuery: string = '';
  filterCriteria: string = '';
  filteredPlants: Plant[] = [];
  isLoading: boolean = false;
  debouncedFilterPlants: () => void;
  genusOptions: { value: string; label: string }[] = [];
  tableHeaders = [
    { id: 'commonName', label: 'Common Name' },
    { id: 'genus', label: 'Genus' },
    { id: 'defaultImage', label: 'Image' },
    { id: 'scientificName', label: 'Scientific Name' },
  ];
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    makeAutoObservable(this);

    //this.retrieveData();
    this.retrieveMockData();

    this.debouncedFilterPlants = debounce(this.filterPlants.bind(this), 500);
  }

  retrieveMockData() {
    this.plants = plants;
    this.filteredPlants = this.plants;
    this.genusOptions = this.extractGenera();
  }

  async retrieveData() {
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
  }

  extractGenera() {
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
  }

  setSearchQuery = (query: string) => {
    runInAction(() => {
      this.searchQuery = query;
      this.debouncedFilterPlants();
    });
  };

  setFilterCriteria = (criteria: string) => {
    runInAction(() => {
      this.filterCriteria = criteria;
      this.filterPlants();
    });
  };

  filterPlants = () => {
    this.filteredPlants = this.plants.filter((plant) => {
      return (
        plant.commonName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) &&
        (this.filterCriteria === '' || plant.genus === this.filterCriteria)
      );
    });
    this.sortPlants();
  };

  setSortField = (field: string) => {
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

  sortPlants = () => {
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

  addPlant(newPlant: Plant) {
    this.plants.push(newPlant);
    this.filterPlants();
    this.genusOptions = this.extractGenera();
  }
}

const plantsStore = new PlantsStore();
export default plantsStore;
