import { makeAutoObservable } from 'mobx';
import { Plant } from '../../auxiliary/interfaces/Plant';
import plants from '../../auxiliary/data/plantsMock';
import { debounce } from '../../auxiliary/utils/debounce';

class PlantsStore {
  plants: Plant[] = plants;
  searchQuery: string = '';
  filterCriteria: string = '';
  filteredPlants: Plant[] = this.plants;
  debouncedFilterPlants: () => void;
  tableHeaders = [
    'Name',
    'Sun Preference',
    'Water Needs',
    'Soil Type',
    'Soil PH',
    'Mature Size',
    'Bloom Time',
    'Fertilizer Needs',
  ];
  sunPreferenceOptions = [
    { value: '', label: 'All Sun Preferences' },
    { value: 'Full Sun', label: 'Full Sun' },
    { value: 'Partial Sun', label: 'Partial Sun' },
    { value: 'Shade', label: 'Shade' },
  ];

  constructor() {
    makeAutoObservable(this);
    this.filteredPlants = this.plants;

    this.debouncedFilterPlants = debounce(this.filterPlants.bind(this), 500);
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.debouncedFilterPlants();
  };

  setFilterCriteria = (criteria: string) => {
    this.filterCriteria = criteria;
    this.filterPlants();
  };

  filterPlants = () => {
    this.filteredPlants = this.plants.filter((plant) => {
      return (
        plant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.filterCriteria === '' ||
          plant.sunPreference === this.filterCriteria)
      );
    });
  };
}

const plantsStore = new PlantsStore();
export default plantsStore;
