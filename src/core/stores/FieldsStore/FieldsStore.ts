import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';

class FieldsStore {
  locations: LocationItem[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  private async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const locations = await getData('/Location');

      runInAction(() => {
        this.locations = locations;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public updateField(id: number, updatedLocation: Partial<LocationItem>) {
    const location = this.locations.find((loc) => loc.id === id);
    if (location) {
      Object.assign(location, updatedLocation);
    }
  }

  public deleteField(id: number) {
    this.locations = this.locations.filter((loc) => loc.id !== id);
  }
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
