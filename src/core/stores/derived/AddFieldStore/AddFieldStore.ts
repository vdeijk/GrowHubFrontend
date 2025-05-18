import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';
import { FieldItem } from '../../../../api';
import fieldsStore from '../FieldsStore/FieldsStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import i18next from 'i18next';
import addFieldData from '../../../../auxiliary/data/AddFieldData';

class AddFieldStore extends BaseFormStore {
  private endpointService = new EndpointService('Field');

  constructor() {
    super();

    this.observeFilters();

    i18next.on('languageChanged', () => {
      this.observeFilters();
    });
  }

  private observeFilters() {
    this.clearFilters();

    Object.values(addFieldData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });
  }

  private clearFilters() {
    this.dropdownFields = {};
    this.inputFields = {};
    this.dateFields = {};
  }

  public addField = async () => {
    if (!this.validateCoordinates()) {
      return;
    }

    await this.endpointService.postData(this.prepareData());

    fieldsStore.fetchData();
  };

  public updateField = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    await this.endpointService.putData(`${id}`, this.prepareData());

    fieldsStore.fetchData();
  };

  public loadField = async (id: string) => {
    const data: FieldItem | undefined =
      await this.endpointService.getData<FieldItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      DataMappingService.mapInputFields(data, this.inputFields);
    });
  };

  public validateForm() {
    if (this.validateCoordinates() && this.validateRequired()) return true;

    return false;
  }

  public validateCoordinates(): boolean {
    const latitude = parseFloat(this.inputFields.latitude.value as string);
    const longitude = parseFloat(this.inputFields.longitude.value as string);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      console.error('Invalid latitude:', latitude);
      alert('Latitude must be a number between -90 and 90.');
      return false;
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      console.error('Invalid longitude:', longitude);
      alert('Longitude must be a number between -180 and 180.');
      return false;
    }

    return true;
  }

  prepareData(): FieldItem {
    return {
      name: this.inputFields.name.value as string,
      latitude: parseFloat(this.inputFields.latitude.value as string),
      longitude: parseFloat(this.inputFields.longitude.value as string),
    };
  }
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
