import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

class LocationStore {
  locations: Location[] = [];
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

  public addLocation(location: Location) {
    this.locations.push(location);
  }

  public updateLocation(id: number, updatedLocation: Partial<Location>) {
    const location = this.locations.find((loc) => loc.id === id);
    if (location) {
      Object.assign(location, updatedLocation);
    }
  }

  public deleteLocation(id: number) {
    this.locations = this.locations.filter((loc) => loc.id !== id);
  }
}

const locationStore = new LocationStore();
export default locationStore;
