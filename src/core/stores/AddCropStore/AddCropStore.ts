import { Plant } from '../../../auxiliary/interfaces/Plant';
import cropsStore from '../CropsStore/CropsStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import { BaseFormStore } from '../BaseFormStore/BaseFormStore';
import { EndpointService } from '../../apis/EndpointService';
import { runInAction } from 'mobx';

class AddCropStore extends BaseFormStore {
  private endpointService = new EndpointService('Plant');

  constructor() {
    super();

    //@ts-ignore
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
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: Plant = {
      commonName: this.fields.nameField.value as string,
      genus: this.fields.genusField.value as string,
      scientificName: this.fields.scientificNameField.value as string,
    };

    await this.endpointService.postData(data);

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

    await this.endpointService.putData(`${id}`, data);

    cropsStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: Plant | undefined = await this.endpointService.getData<Plant>(
      `${id}`,
    );

    if (!data) return;

    runInAction(() => {
      this.fields.nameField.setValue(data.commonName);
      this.fields.genusField.setValue(data.genus);
      this.fields.scientificNameField.setValue(data.scientificName);
    });
  };
}

const addCropStore = new AddCropStore();
export default addCropStore;
