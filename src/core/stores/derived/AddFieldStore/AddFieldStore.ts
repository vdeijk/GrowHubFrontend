import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { LocationItem } from '../../../../api';
import fieldsStore from '../FieldsStore/FieldsStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';

class AddFieldStore extends BaseFormStore {
  public endpointService = new EndpointService('Location');

  constructor() {
    super();

    this.fields = {
      locationNameField: new InputField<string>(
        '',
        'Location Name',
        true,
        'Enter location name',
        30,
      ),
      latitudeField: new InputField<string>(
        '0',
        'Latitude',
        true,
        'Enter latitude',
        10,
      ),
      longitudeField: new InputField<string>(
        '0',
        'Longitude',
        true,
        'Enter longitude',
        10,
      ),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addField = async () => {
    if (!this.validateCoordinates()) {
      return;
    }

    const data: LocationItem = {
      name: this.fields.locationNameField.value as string,
      latitude: parseFloat(this.fields.latitudeField.value as string),
      longitude: parseFloat(this.fields.longitudeField.value as string),
    };

    await this.endpointService.postData(data);

    fieldsStore.fetchData();
  };

  public updateField = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: LocationItem = {
      id: numberId,
      name: this.fields.locationNameField.value as string,
      latitude: parseFloat(this.fields.latitudeField.value as string),
      longitude: parseFloat(this.fields.longitudeField.value as string),
    };

    await this.endpointService.putData(`${id}`, data);

    fieldsStore.fetchData();
  };

  public loadField = async (id: string) => {
    const data: LocationItem | undefined =
      await this.endpointService.getData<LocationItem>(`${id}`);

    if (!data) return;
    runInAction(() => {
      this.fields.locationNameField.setValue(data.name ?? '');
      (addFieldStore.fields.latitudeField as InputField<number>).setValue(
        data.latitude ?? 0,
      );
      (addFieldStore.fields.longitudeField as InputField<number>).setValue(
        data.longitude ?? 0,
      );
    });
  };

  public validateForm() {
    if (this.validateCoordinates() && this.validateRequired()) return true;

    return false;
  }

  public validateCoordinates(): boolean {
    const latitude = parseFloat(this.fields.latitudeField.value as string);
    const longitude = parseFloat(this.fields.longitudeField.value as string);

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
