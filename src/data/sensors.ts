import type { Sensor } from '../types';

export const FULL_FRAME_DIAGONAL_MM = Math.hypot(36, 24);
export const sensors: Sensor[] = [
  { id: 'full-frame', name: 'Full Frame / 35mm', widthMm: 36, heightMm: 24 },
  { id: 'aps-c-canon', name: 'APS-C Canon', widthMm: 22.3, heightMm: 14.9 },
  { id: 'aps-c-nikon', name: 'APS-C Nikon / Sony', widthMm: 23.5, heightMm: 15.6 },
  { id: 'aps-c-fuji', name: 'APS-C Fujifilm', widthMm: 23.5, heightMm: 15.6 },
  { id: 'micro-four-thirds', name: 'Micro Four Thirds', widthMm: 17.3, heightMm: 13 },
  { id: 'one-inch', name: '1-inch', widthMm: 13.2, heightMm: 8.8 },
  { id: 'medium-44x33', name: 'Medium Format 44×33', widthMm: 43.8, heightMm: 32.9 },
  { id: 'medium-54x40', name: 'Medium Format 54×40', widthMm: 53.4, heightMm: 40 },
];

export const getSensor = (id: string, custom: Sensor) => id === 'custom' ? custom : sensors.find(sensor => sensor.id === id) ?? sensors[0];
