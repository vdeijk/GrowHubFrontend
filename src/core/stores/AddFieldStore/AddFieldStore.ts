import { BaseFormStore } from '../BaseFormStore/BaseFormStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import fieldsStore from '../FieldsStore/FieldsStore';

class AddFieldStore extends BaseFormStore<LocationItem> {
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

  public async addField() {
    const locationItem: LocationItem = {
      name: this.fields.locationNameField.value as string,
      latitude: this.fields.latitudeField.value as number,
      longitude: this.fields.longitudeField.value as number,
    };

    await this.addData('/location', locationItem);
    fieldsStore.fetchData();
  }

  public async updateField(id: string) {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const locationItem: LocationItem = {
      id: numberId,
      name: this.fields.locationNameField.value as string,
      latitude: this.fields.latitudeField.value as number,
      longitude: this.fields.longitudeField.value as number,
    };

    await this.editData(`/location/${id}`, locationItem);
    fieldsStore.fetchData();
  }

  public async loadField(id: string) {
    await this.loadData(`/location/${id}`, (data) => {
      this.fields.locationNameField.setValue(data.name);
      this.fields.latitudeField.setValue(data.latitude);
      this.fields.longitudeField.setValue(data.longitude);
    });
  }
}

const addFieldStore = new AddFieldStore();
export default addFieldStore;
