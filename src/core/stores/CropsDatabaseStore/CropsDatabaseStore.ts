import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { localStorageService } from '../../../auxiliary/classes/LocalStorageService';
import { SunPreference } from '../../../auxiliary/enums/SunPreference';
import { WaterNeeds } from '../../../auxiliary/enums/WaterNeeds';
import { SoilType } from '../../../auxiliary/enums/SoilType';
import { SoilPH } from '../../../auxiliary/enums/SoilPH';
import { Pruning } from '../../../auxiliary/enums/Pruning';
import { PlantType } from '../../../auxiliary/enums/PlantType';
import { GrowthRate } from '../../../auxiliary/enums/GrowthRate';
import { FertilizerNeeds } from '../../../auxiliary/enums/FertilizerNeeds';
import { InputField } from '../../../auxiliary/classes/InputField';
import { ClimateZone } from '../../../auxiliary/enums/ClimateZone';

class CropsDatabaseStore extends SearchableStore<Plant> {
  private endpointService = new EndpointService('Plant');
  public paginationStore = new PaginationStore();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public searchQuery = new InputField<string>(
    '',
    'Search',
    false,
    'Enter search query',
    50,
  );

  constructor() {
    super(['commonName']);

    this.initDropdownFilter(
      'sunPreference',
      '',
      'Sun Preference',
      Object.values(SunPreference),
      '',
    );
    this.initDropdownFilter(
      'waterNeeds',
      '',
      'Water Needs',
      Object.values(WaterNeeds),
      '',
    );
    this.initDropdownFilter(
      'soilType',
      '',
      'Soil Type',
      Object.values(SoilType),
      '',
    );
    this.initDropdownFilter('soilPH', '', 'Soil PH', Object.values(SoilPH), '');
    this.initDropdownFilter(
      'pruning',
      '',
      'Pruning',
      Object.values(Pruning),
      '',
    );
    this.initDropdownFilter(
      'climateZone',
      '',
      'Climate Zone',
      Object.values(ClimateZone),
      '',
    );
    this.initDropdownFilter(
      'plantType',
      '',
      'Plant Type',
      Object.values(PlantType),
      '',
    );
    this.initDropdownFilter(
      'growthRate',
      '',
      'Growth Rate',
      Object.values(GrowthRate),
      '',
    );
    this.initDropdownFilter(
      'fertilizerNeeds',
      '',
      'Fertilizer Needs',
      Object.values(FertilizerNeeds),
      '',
    );

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
      searchQuery: observable,
    });
  }

  debouncedFilterPlants: (criteria: string) => void = () => {};
  tableHeaders: { id: keyof Plant; label: string; sortable: boolean }[] = [
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'sunPreference', label: 'Sun Preference', sortable: true },
    { id: 'waterNeeds', label: 'Water Needs', sortable: true },
    { id: 'soilType', label: 'Soil Type', sortable: true },
    { id: 'soilPH', label: 'Soil PH', sortable: true },
    { id: 'pruning', label: 'Pruning', sortable: true },
    { id: 'climateZone', label: 'Climate Zone', sortable: true },
    { id: 'plantType', label: 'Plant Type', sortable: true },
    { id: 'growthRate', label: 'Growth Rate', sortable: true },
    { id: 'fertilizerNeeds', label: 'Fertilizer Needs', sortable: true },
  ];

  public syncData = () => {
    localStorageService.invalidateCache('cropsDatabaseItems');
    this.fetchData();
  };

  public fetchData = async () => {
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
    });
  };

  public deletePlant = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const cropsDatabaseStore = new CropsDatabaseStore();
export default cropsDatabaseStore;
