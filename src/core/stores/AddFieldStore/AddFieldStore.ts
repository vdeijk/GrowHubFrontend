import { makeAutoObservable, runInAction } from 'mobx';
import { postData } from '../../apis/postData';
import { putData } from '../../apis/putData';
import { getData } from '../../apis/getData';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import fieldsStore from '../FieldsStore/FieldsStore';

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
    runInAction(() => {
      this.locationName = '';
      this.latitude = 0;
      this.longitude = 0;
    });
  }

  public async addField() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const locationItem: LocationItem = {
        name: this.locationName,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      // @ts-ignore
      await postData('/location', locationItem);

      fieldsStore.fetchData();
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
      const field: LocationItem = await getData(`/location/${id}`);
      runInAction(() => {
        this.locationName = field.name;
        this.latitude = field.latitude;
        this.longitude = field.longitude;
      });
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
      const locationItem: LocationItem = {
        name: this.locationName,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      // @ts-ignore
      await putData(`/location/${id}`, locationItem);

      fieldsStore.fetchData();
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
