import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import { deleteData } from '../../apis/deleteData';

class FieldsStore {
  locations: LocationItem[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public async fetchData() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const locations = await getData('/Location');
      runInAction(() => {
        this.locations = locations;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public deleteField = async (id: number) => {
    await deleteData(`/location/${id}`, id);

    this.fetchData();
  };
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
