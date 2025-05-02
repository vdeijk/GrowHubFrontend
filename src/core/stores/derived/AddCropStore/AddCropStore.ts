import { PlantItem } from '../../../../api';
import cropsDatabaseStore from '../CropsDatabaseStore/CropsDatabaseStore';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { localStorageService } from '../../../services/LocalStorageService/LocalStorageService';
import AddCropsDatabaseData from '../../../../auxiliary/classes/AddCropsDatabaseData';

class AddCropStore extends BaseFormStore {
  private endpointService = new EndpointService('Plant');

  constructor() {
    super();

    Object.values(AddCropsDatabaseData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddCropsDatabaseData.dropdownFields).forEach(
      (dropdownField) => {
        this.initDropdownFilter(dropdownField);
      },
    );
  }

  public addCrop = async () => {
    const data: PlantItem = {
      commonName: this.inputFields.nameField.value as string,
    };

    await this.endpointService.postData(data);

    localStorageService.invalidateCache('cropsDatabaseItems');
    cropsDatabaseStore.fetchData();
  };

  public updateCrop = async (id: string) => {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    const data: PlantItem = {
      commonName: this.inputFields.commonName.value as string,
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
      this.inputFields.nameField.setValue(String(data.commonName));
    });
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addCropStore = new AddCropStore();
export default addCropStore;
