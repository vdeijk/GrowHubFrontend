class ValueTransformService {
  public static toNumberOrUndefined(value: string | number | undefined) {
    if (value === '' || value === undefined) {
      return undefined;
    }
    const numberValue = Number(value);
    return isNaN(numberValue) ? undefined : numberValue as number;
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
}

export default ValueTransformService;
