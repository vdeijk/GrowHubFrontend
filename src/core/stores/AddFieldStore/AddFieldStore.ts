import { BaseFormStore } from '../BaseFormStore/BaseFormStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import fieldsStore from '../FieldsStore/FieldsStore';
import { EndpointService } from '../../apis/EndpointService';
import { runInAction } from 'mobx';

class AddFieldStore extends BaseFormStore<LocationItem> {
  public endpointService = new EndpointService('Location');

  constructor() {
    super();

    this.fields = {
      locationNameField: new InputField<string>(
        '',
        'Location Name',
        true,
        'Enter location name',
      ),
      latitudeField: new InputField<number>(
        0,
        'Latitude',
        true,
        'Enter latitude',
      ),
      longitudeField: new InputField<number>(
        0,
        'Longitude',
        true,
        'Enter longitude',
      ),
    };
  }

  public addField = async () => {
    const data: LocationItem = {
      name: this.fields.locationNameField.value as string,
      latitude: this.fields.latitudeField.value as number,
      longitude: this.fields.longitudeField.value as number,
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
      latitude: this.fields.latitudeField.value as number,
      longitude: this.fields.longitudeField.value as number,
    };

    await this.endpointService.putData(`${id}`, data);

    fieldsStore.fetchData();
  };

  public loadField = async (id: string) => {
    const data: LocationItem | undefined =
      await this.endpointService.getData<LocationItem>(`${id}`);

    if (!data) return;
    runInAction(() => {
      this.fields.locationNameField.setValue(data.name);
      this.fields.latitudeField.setValue(data.latitude);
      this.fields.longitudeField.setValue(data.longitude);
    });
  };
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
