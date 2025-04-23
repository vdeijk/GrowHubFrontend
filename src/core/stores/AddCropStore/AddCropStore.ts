import { Plant } from '../../../auxiliary/interfaces/Plant';
import cropsStore from '../CropsStore/CropsStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import { BaseFormStore } from '../BaseFormStore/BaseFormStore';

class AddCropStore extends BaseFormStore<Plant> {
  constructor() {
    super();

    this.fields = {
      nameField: new InputField<string>(
        '',
        'Common Name',
        true,
        'Enter common name',
      ),
      genusField: new InputField<string>('', 'Genus', true, 'Enter genus'),
      scientificNameField: new InputField<string>(
        '',
        'Scientific Name',
        true,
        'Enter scientific name',
      ),
    };
  }

  public addCrop = async () => {
    const data: Plant = {
      commonName: this.fields.nameField.value as string,
      genus: this.fields.genusField.value as string,
      scientificName: this.fields.scientificNameField.value as string,
    };

    await this.addData('/plant', data);
    cropsStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: Plant = {
      commonName: this.fields.nameField.value as string,
      genus: this.fields.genusField.value as string,
      scientificName: this.fields.scientificNameField.value as string,
      id: numberId as number,
    };

    await this.editData(`/plant/${id}`, data);
    cropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    await this.loadData(`/plant/${id}`, (data) => {
      this.fields.nameField.setValue(data.commonName);
      this.fields.genusField.setValue(data.genus);
      this.fields.scientificNameField.setValue(data.scientificName);
    });
  };
}

const addCropStore = new AddCropStore();
export default addCropStore;
