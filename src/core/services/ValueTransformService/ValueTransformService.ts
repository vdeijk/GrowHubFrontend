class ValueTransformService {
  public static toNumberOrUndefined(value: string | number | undefined) {
    if (value === '' || value === undefined) {
      return undefined;
    }
    const numberValue = Number(value);
    return isNaN(numberValue) ? undefined : (numberValue as number);
  }

  public static toNull(value: string | undefined) {
    return value === '' || value === undefined ? null : value;
  }

  public static toUndefined(value: string | number | undefined) {
    return value === '' ? undefined : value;
  }

  public static toDefault<T>(value: string | undefined, defaultValue: T) {
    return value === '' || value === undefined ? defaultValue : value;
  }

  public static toEnumOrUndefined<T extends Record<string, string | number>>(
    value: string | undefined,
    enumType: T,
  ) {
    console.log(value, enumType);
    if (!value) {
      return undefined;
    }

    const enumValues = Object.values(enumType) as (string | number)[];
    return enumValues.includes(value) ? (value as T[keyof T]) : undefined;
  }
}

export default ValueTransformService;
