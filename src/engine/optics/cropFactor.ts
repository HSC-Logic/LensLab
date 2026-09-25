import { FULL_FRAME_DIAGONAL_MM } from '../../data/sensors';

export const sensorDiagonal = (widthMm: number, heightMm: number) => Math.hypot(widthMm, heightMm);
export const cropFactor = (widthMm: number, heightMm: number) => FULL_FRAME_DIAGONAL_MM / sensorDiagonal(widthMm, heightMm);
export const circleOfConfusion = (widthMm: number, heightMm: number) => sensorDiagonal(widthMm, heightMm) / 1500;
