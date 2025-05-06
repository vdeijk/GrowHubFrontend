import { makeAutoObservable } from 'mobx';
import { CopyPasteModel } from '../../../../auxiliary/interfaces/CopyPasteModel';
import { toast } from 'react-toastify';
import tasksStore from '../TasksStore/TasksStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import measurementsStore from '../MeasurementsStore/MeasurementsStore';
import cropsStore from '../CropsStore/CropsStore';
import batchesStore from '../BatchesStore/BatchesStore';

class CopyPasteStore {
  public copiedItem: CopyPasteModel | null = null;
  public endpointService = new EndpointService('Todo');

  constructor() {
    makeAutoObservable(this);
  }

  public copyItem = (type: 'Batch' | 'Crop', id: number, name: string) => {
    this.copiedItem = { type, data: { id, name } };

    toast.success(`Copied ${type}: ${name}`);
  };

  public pasteBatchIntoTask = async (id: number) => {
    if (this.handleErrors('Batch')) return;

    const taskIndex = tasksStore.items.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      toast.error('Task not found');
      return;
    }

    const newData = {
      ...tasksStore.items[taskIndex],
      batchId: this.copiedItem!.data.id,
      title: this.copiedItem!.data.name,
    };

    tasksStore.updateTask(id, newData);
  };

  public pasteBatchIntoReading = async (id: number) => {
    if (this.handleErrors('Batch')) return;

    const taskIndex = measurementsStore.items.findIndex(
      (item) => item.id === id,
    );
    if (taskIndex === -1) {
      toast.error('Measurement not found');
      return;
    }

    const newData = {
      ...measurementsStore.items[taskIndex],
      batchId: this.copiedItem!.data.id,
      title: this.copiedItem!.data.name,
    };

    measurementsStore.updateReading(id, newData);
  };

  public pasteCropIntoBatches = async (id: number) => {
    if (this.handleErrors('Crop')) return;

    const index = cropsStore.items.findIndex((item) => item.id === id);
    if (index === -1) {
      toast.error('Measurement not found');
      return;
    }

    const newData = {
      ...batchesStore.items[index],
      cropId: this.copiedItem!.data.id,
      commonName: this.copiedItem!.data.name,
    };

    batchesStore.updateBatch(id, newData);
  };

  private handleErrors = (type: 'Batch' | 'Crop') => {
    if (!this.copiedItem) {
      toast.error('No item to paste');
      return true;
    }

    if (this.copiedItem.type !== type) {
      toast.error(`Cannot paste ${this.copiedItem.type} here`);
      return true;
    }

    return false;
  };
}

const copyPasteStore = new CopyPasteStore();
export default copyPasteStore;
