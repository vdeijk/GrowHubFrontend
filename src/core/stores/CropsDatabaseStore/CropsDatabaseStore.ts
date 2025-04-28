import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import { debounce } from '../../../auxiliary/utils/debounce';
import { makeObservable, runInAction, observable, action } from 'mobx';
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

class CropsDatabaseStore extends SearchableStore<Plant> {
  private endpointService = new EndpointService('Plant');
  public paginationStore = new PaginationStore();

  constructor() {
    super(['commonName']);

    this.setDropdownFilters(
      'sunPreference',
      '',
      'Sun Preference',
      Object.values(SunPreference),
      '',
    );
    this.setDropdownFilters(
      'waterNeeds',
      '',
      'WaterNeeds',
      Object.values(WaterNeeds),
      '',
    );
    this.setDropdownFilters(
      'soilType',
      '',
      'Soil Type',
      Object.values(SoilType),
      '',
    );
    this.setDropdownFilters('soilPH', '', 'Soil PH', Object.values(SoilPH), '');
    this.setDropdownFilters(
      'pruning',
      '',
      'Pruning',
      Object.values(Pruning),
      '',
    );
    this.setDropdownFilters(
      'temperatureRange',
      '',
      'Temperature Range',
      Object.values(PlantType),
      '',
    );
    this.setDropdownFilters(
      'plantType',
      '',
      'Plant Type',
      Object.values(PlantType),
      '',
    );
    this.setDropdownFilters(
      'growthRate',
      '',
      'Growth Rate',
      Object.values(GrowthRate),
      '',
    );
    this.setDropdownFilters(
      'fertilizerNeeds',
      '',
      'Fertilizer Needs',
      Object.values(FertilizerNeeds),
      '',
    );

    this.debouncedFilterPlants = debounce(this.filterItems.bind(this), 500);

    makeObservable(this, {
      isLoading: observable,
      fetchData: action,
      matchesFilterCriteria: action,
    });
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
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
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
