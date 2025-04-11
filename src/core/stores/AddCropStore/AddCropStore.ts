import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { putData } from '../../apis/putData';
import { postData } from '../../apis/postData';

class AddCropStore {
  commonName: string = '';
  genus: string = '';
  scientificName: string = '';
  isLoading: boolean = false;

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
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await postData('/plants', {
        commonName: this.commonName,
        genus: this.genus,
        scientificName: this.scientificName,
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async loadCrop(id: string) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const plant = await getData(`/plants/${id}`);
      this.commonName = plant.commonName;
      this.genus = plant.genus;
      this.scientificName = plant.scientificName;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async updateCrop(id: string) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await putData(`/plants/${id}`, {
        commonName: this.commonName,
        genus: this.genus,
        scientificName: this.scientificName,
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
