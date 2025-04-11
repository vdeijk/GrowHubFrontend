import { makeAutoObservable, runInAction } from 'mobx';

class AddPlantStore {
  commonName: string = '';
  genus: string = '';
  scientificName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public updateField(field: keyof AddPlantStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  public resetForm() {
    this.commonName = '';
    this.genus = '';
    this.scientificName = '';
  }

  public addPlant() {
    //call to backend
  }
}

const addPlantStore = new AddPlantStore();
export default addPlantStore;
