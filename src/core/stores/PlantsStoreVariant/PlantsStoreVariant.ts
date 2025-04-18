/*import { makeAutoObservable } from 'mobx';
import { Plant } from '../../auxiliary/interfaces/Plant';
import plants from '../../auxiliary/data/plantsMock';
import { debounce } from '../../auxiliary/utils/debounce';
import { getPlantData } from '../apis/plants';

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

    this.plants = plants;
    this.retrieveData();

    this.debouncedFilterPlants = debounce(this.filterPlants.bind(this), 500);
  }

  retrieveData() {
    getPlantData();
    //this.plants = getPlantData();
    this.filteredPlants = this.plants;
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

  addPlant(newPlant: Plant) {
    this.plants.push(newPlant);
    this.filterPlants();
  }
}

const plantsStore = new PlantsStore();
export default plantsStore;*/
