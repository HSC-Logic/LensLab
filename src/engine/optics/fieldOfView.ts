import { degrees } from './conversions';

export const angleOfView = (sensorDimensionMm: number, focalMm: number) => degrees(2 * Math.atan(sensorDimensionMm / (2 * focalMm)));
