export const formatCoordinate = (coordinate: number): string =>
  coordinate % 1 === 0 ? `${coordinate}.0` : `${coordinate}`;
