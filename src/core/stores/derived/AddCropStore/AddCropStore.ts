import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsDatabaseStore/CropsDatabaseStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { Dropdown } from '../../../../auxiliary/classes/Dropdown';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';

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
      sunPreference: new Dropdown<string>('', 'Sun Preference', true),
      waterNeeds: new Dropdown<string>('', 'Water Needs', true),
      soilType: new Dropdown<string>('', 'Soil Type', true),
      soilPH: new Dropdown<string>('', 'Soil PH', true),
      pruning: new Dropdown<string>('', 'Pruning', true),
      climateZone: new Dropdown<string>('', 'Climate Zone', true),
      plantType: new Dropdown<string>('', 'Plant Type', true),
      growthRate: new Dropdown<string>('', 'Growth Rate', true),
      fertilizerNeeds: new Dropdown<string>('', 'fertilizer Needs', true),
    } as Record<string, InputField<string | number | boolean>>;
  }

  public addCrop = async () => {
    const data: PlantItem = {
      commonName: this.fields.nameField.value as string,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: PlantItem = {
      commonName: this.fields.nameField.value as string,
    };

    await this.endpointService.putData(`${id}`, data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public loadCrop = async (id: string) => {
    const data: PlantItem | undefined =
      await this.endpointService.getData<PlantItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.fields.nameField.setValue(String(data.commonName));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
