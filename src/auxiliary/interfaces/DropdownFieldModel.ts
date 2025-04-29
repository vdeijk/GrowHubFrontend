export interface DropdownFieldModel {
    key: string;
    label: string;
    options: string[] | (() => string[]);
    defaultValue: string;
  }
  