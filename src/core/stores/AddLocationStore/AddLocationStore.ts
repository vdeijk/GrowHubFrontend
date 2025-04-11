import { makeAutoObservable, runInAction } from 'mobx';

class AddLocationStore {
  locationName: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public updateField(field: keyof AddLocationStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  public resetForm() {
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
  }

  public addLocation() {
    //call to backend
  }
}

const addLocationStore = new AddLocationStore();
export default addLocationStore;
