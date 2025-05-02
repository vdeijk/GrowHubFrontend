import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { LocationItem } from '../../../../api';
import fieldsStore from '../FieldsStore/FieldsStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import FieldsData from '../../../../auxiliary/data/FieldsData';

class AddFieldStore extends BaseFormStore {
  public endpointService = new EndpointService('Location');

  constructor() {
    super();

    Object.values(FieldsData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });
  }

  public addField = async () => {
    if (!this.validateCoordinates()) {
      return;
    }

    const data: LocationItem = {
      name: this.inputFields.name.value as string,
      latitude: parseFloat(this.inputFields.latitude.value as string),
      longitude: parseFloat(this.inputFields.longitude.value as string),
    };

    await this.endpointService.postData(data);

    fieldsStore.fetchData();
  };

  public updateField = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: LocationItem = {
      id: numberId,
      name: this.inputFields.name.value as string,
      latitude: parseFloat(this.inputFields.latitude.value as string),
      longitude: parseFloat(this.inputFields.longitude.value as string),
    };

    await this.endpointService.putData(`${id}`, data);

    fieldsStore.fetchData();
  };

  public loadField = async (id: string) => {
    const data: LocationItem | undefined =
      await this.endpointService.getData<LocationItem>(`${id}`);

    if (!data) return;
    runInAction(() => {
      this.inputFields.locationNameField.setValue(data.name ?? '');
      (this.inputFields.latitudeField as InputField<number>).setValue(
        data.latitude ?? 0,
      );
      (this.inputFields.longitudeField as InputField<number>).setValue(
        data.longitude ?? 0,
      );
    });
  };

  public validateForm() {
    if (this.validateCoordinates() && this.validateRequired()) return true;

    return false;
  }

  public validateCoordinates(): boolean {
    const latitude = parseFloat(this.inputFields.latitudeField.value as string);
    const longitude = parseFloat(
      this.inputFields.longitudeField.value as string,
    );

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
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
