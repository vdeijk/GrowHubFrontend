class FormatService {
  public static formatCoordinate(coordinate: number): string {
    return coordinate % 1 === 0 ? `${coordinate}.0` : `${coordinate}`;
  }
}

export default FormatService;
