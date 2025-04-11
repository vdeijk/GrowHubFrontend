import { makeAutoObservable, runInAction } from 'mobx';

class AddCropStore {
  commonName: string = '';
  genus: string = '';
  scientificName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public updateField(field: keyof AddCropStore, value: string) {
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

const addCropStore = new AddCropStore();
export default addCropStore;
