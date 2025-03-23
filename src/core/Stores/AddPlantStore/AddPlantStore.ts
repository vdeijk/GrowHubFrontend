import { makeAutoObservable, runInAction } from 'mobx';

class AddPlantStore {
  name: string = '';
  sunPreference: string = '';
  waterNeeds: string = '';
  soilType: string = '';
  soilPH: string = '';
  matureSize: string = '';
  bloomTime: string = '';
  fertilizerNeeds: string = '';
  pruning: string = '';
  temperatureRange: string = '';
  plantType: string = '';
  growthRate: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  updateField(field: keyof AddPlantStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  resetForm() {
    this.name = '';
    this.sunPreference = '';
    this.waterNeeds = '';
    this.soilType = '';
    this.soilPH = '';
    this.matureSize = '';
    this.bloomTime = '';
    this.fertilizerNeeds = '';
    this.pruning = '';
    this.growthRate = '';
    this.temperatureRange = '';
    this.plantType = '';
  }
}

const addPlantStore = new AddPlantStore();
export default addPlantStore;
