import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { makeAutoObservable } from 'mobx';
import i18next from 'i18next';

class AddTaskData {
  public textFields: Record<string, InputFieldModel> = {};
  public dropdowns: Record<string, DropdownFieldModel> = {};
  public dateFields: DateFieldModel[] = [];

  constructor() {
    makeAutoObservable(this);

    this.initializeFields();

    i18next.on('languageChanged', () => {
      this.initializeFields();
    });
  }

  private initializeFields() {
    this.textFields = {
      titleField: {
        key: 'title',
        label: i18next.t('addTaskData.textFields.titleField'), // Translated label
        defaultValue: '',
        required: true,
        readonly: true,
      },
      notes: {
        key: 'notes',
        label: i18next.t('addTaskData.textFields.notes'), // Translated label
        defaultValue: '',
        required: false,
      },
      batchId: {
        key: 'batchId',
        label: i18next.t('addTaskData.textFields.batchId'), // Translated label
        defaultValue: '',
        required: true,
      },
    };

    this.dropdowns = {
      priority: {
        key: 'priority',
        label: i18next.t('addTaskData.dropdowns.priority'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
      category: {
        key: 'category',
        label: i18next.t('addTaskData.dropdowns.category'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
      todoStatus: {
        key: 'todoStatus',
        label: i18next.t('addTaskData.dropdowns.todoStatus'), // Translated label
        options: [],
        defaultValue: '',
        required: true,
      },
    };

    this.dateFields = [
      {
        key: 'dueDate',
        label: i18next.t('addTaskData.dateFields.dueDate'), // Translated label
        defaultValue: '',
        required: true,
      },
    ];
  }
}

const addTaskData = new AddTaskData();
export default addTaskData;
