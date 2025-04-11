import { makeAutoObservable, runInAction } from 'mobx';
import { postData } from '../../apis/postData';
import { putData } from '../../apis/putData';
import { getData } from '../../apis/getData';

class AddFieldStore {
  locationName: string = '';
  latitude: number = 0;
  longitude: number = 0;
  isLoading: boolean = false;

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
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await postData('/plants', {
        locationName: this.locationName,
        latitude: this.latitude,
        longitude: this.longitude,
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async loadField(id: string) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const field = await getData(`/plants/${id}`);
      this.locationName = field.locationName;
      this.latitude = field.latitude;
      this.longitude = field.longitude;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async updateField(id: string) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      await putData(`/plants/${id}`, {
        locationName: this.locationName,
        latitude: this.latitude,
        longitude: this.longitude,
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
