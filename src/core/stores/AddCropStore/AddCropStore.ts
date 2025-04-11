import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { putData } from '../../apis/putData';
import { postData } from '../../apis/postData';

class AddCropStore {
  commonName: string = '';
  genus: string = '';
  scientificName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public updateFormField(field: keyof AddCropStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  public resetForm() {
    this.commonName = '';
    this.genus = '';
    this.scientificName = '';
  }

  public async addCrop() {
    await postData('/plants', {
      commonName: this.commonName,
      genus: this.genus,
      scientificName: this.scientificName,
    });
  }

  public async loadCrop(id: string) {
    const plant = await getData(`/plants/${id}`);
    this.commonName = plant.commonName;
    this.genus = plant.genus;
    this.scientificName = plant.scientificName;
  }

  public async updateCrop(id: string) {
    await putData(`/plants/${id}`, {
      commonName: this.commonName,
      genus: this.genus,
      scientificName: this.scientificName,
    });
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
