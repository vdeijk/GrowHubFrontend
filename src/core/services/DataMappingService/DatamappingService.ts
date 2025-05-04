import { DateField } from '../../../auxiliary/classes/DateField';
import { InputField } from '../../../auxiliary/classes/InputField';
import { DropdownField } from '../../../auxiliary/classes/DropdownField';

export class DataMappingService {
  private static instance: DataMappingService;

  private constructor() {}

  public static getInstance(): DataMappingService {
    if (!DataMappingService.instance) {
      DataMappingService.instance = new DataMappingService();
    }
    return DataMappingService.instance;
  }

  public static mapInputFields<T extends object>(
    data: T,
    fields: Record<string, InputField<string | number>>,
  ): void {
    Object.entries(fields).forEach(([key, field]) => {
      if (key in data) {
        field.setValue((data[key as keyof T] as string | number) ?? '');
      }
    });
  }

  public static mapDropdownFields<T extends object>(
    data: T,
    fields: Record<string, DropdownField<string>>,
  ): void {
    Object.entries(fields).forEach(([key, field]) => {
      if (key in data) {
        field.setValue(String(data[key as keyof T] ?? ''));
      }
    });
  }

  public static mapDateFields<T extends object>(
    data: T,
    fields: Record<string, DateField<string>>,
  ): void {
    Object.entries(fields).forEach(([key, field]) => {
      if (key in data) {
        field.setValue(String(data[key as keyof T] ?? ''));
      }
    });
  }
}
