import { makeAutoObservable, runInAction } from 'mobx';

class AddFieldStore {
  locationName: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public updateField(field: keyof AddFieldStore, value: string) {
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

const addFieldStore = new AddFieldStore();
export default addFieldStore;
