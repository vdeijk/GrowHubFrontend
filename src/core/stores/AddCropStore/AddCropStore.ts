import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { putData } from '../../apis/putData';
import { postData } from '../../apis/postData';
import { Plant } from '../../../auxiliary/interfaces/Plant';
import cropsStore from '../CropsStore/CropsStore';

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
      const data: Plant = {
        commonName: this.commonName,
        genus: this.genus,
        scientificName: this.scientificName,
      };

      // @ts-expect-error
      await postData('/plant', data);

      cropsStore.fetchData();
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
      const plant: Plant = await getData(`/plant/${id}`);
      runInAction(() => {
        this.commonName = plant.commonName;
        this.genus = plant.genus;
        this.scientificName = plant.scientificName;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async updateCrop(id: string) {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: Plant = {
        commonName: this.commonName,
        genus: this.genus,
        scientificName: this.scientificName,
        id: numberId,
      };

      // @ts-expect-error
      await putData(`/plant/${id}`, data);

      cropsStore.fetchData();
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
