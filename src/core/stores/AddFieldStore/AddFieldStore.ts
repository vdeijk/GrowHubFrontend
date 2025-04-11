import { makeAutoObservable, runInAction } from 'mobx';
import { postData } from '../../apis/postData';
import { putData } from '../../apis/putData';
import { getData } from '../../apis/getData';

class AddFieldStore {
  locationName: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public updateFormField(field: keyof AddFieldStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  public resetForm() {
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
  }

  public async addField() {
    await postData('/plants', {
      locationName: this.locationName,
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }

  public async loadField(id: string) {
    const field = await getData(`/plants/${id}`);
    this.locationName = field.locationName;
    this.latitude = field.latitude;
    this.longitude = field.longitude;
  }

  public async updateField(id: string) {
    await putData(`/plants/${id}`, {
      locationName: this.locationName,
      latitude: this.latitude,
      longitude: this.longitude,
    });
}
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
