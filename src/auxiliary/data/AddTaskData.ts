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
        label: i18next.t('addTaskData.textFields.titleField'),
        defaultValue: '',
        required: false,
        readonly: true,
        placeholder: i18next.t('addTaskData.placeholders.titleField'),
      },
      notes: {
        key: 'notes',
        label: i18next.t('addTaskData.textFields.notes'),
        defaultValue: '',
        required: false,
        placeholder: i18next.t('addTaskData.placeholders.notes'),
      },
      batchId: {
        key: 'batchId',
        label: i18next.t('addTaskData.textFields.batchId'),
        defaultValue: '',
        required: false,
        placeholder: i18next.t('addTaskData.placeholders.batchId'),
      },
    };

    this.dropdowns = {
      priority: {
        key: 'priority',
        label: i18next.t('addTaskData.dropdowns.priority'),
        options: [],
        defaultValue: '',
        required: true,
      },
      category: {
        key: 'category',
        label: i18next.t('addTaskData.dropdowns.category'),
        options: [],
        defaultValue: '',
        required: true,
      },
      todoStatus: {
        key: 'todoStatus',
        label: i18next.t('addTaskData.dropdowns.todoStatus'),
        options: [],
        defaultValue: '',
        required: true,
      },
    };

    this.dateFields = [
      {
        key: 'dueDate',
        label: i18next.t('addTaskData.dateFields.dueDate'),
        defaultValue: '',
        required: true,
      },
    ];
  }
}

const addTaskData = new AddTaskData();
export default addTaskData;
