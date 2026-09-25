import type { Setup } from '../types';

type Preset = { name: string; category: string; values: Partial<Setup> };
export const presets: Preset[] = [
  { name: 'Headshot', category: 'Portrait', values: { focalLengthMm: 85, aperture: 1.8, distanceMm: 2500 } },
  { name: 'Half Body', category: 'Portrait', values: { focalLengthMm: 70, aperture: 2.8, distanceMm: 4000 } },
  { name: 'Full Body', category: 'Portrait', values: { focalLengthMm: 50, aperture: 2.8, distanceMm: 6000 } },
  { name: 'Couple', category: 'Portrait', values: { focalLengthMm: 50, aperture: 4, distanceMm: 5000 } },
  { name: 'Group', category: 'Portrait', values: { focalLengthMm: 35, aperture: 5.6, distanceMm: 7000 } },
  { name: 'Wedding Ceremony', category: 'Events', values: { focalLengthMm: 135, aperture: 2.8, distanceMm: 12000 } },
  { name: 'Wedding Couple', category: 'Events', values: { focalLengthMm: 85, aperture: 2, distanceMm: 4500 } },
  { name: 'Indoor Event', category: 'Events', values: { focalLengthMm: 35, aperture: 2, distanceMm: 4000 } },
  { name: 'Stage', category: 'Events', values: { focalLengthMm: 200, aperture: 2.8, distanceMm: 25000 } },
  { name: 'Landscape', category: 'Landscape', values: { focalLengthMm: 24, aperture: 8, distanceMm: 8000 } },
  { name: 'Architecture', category: 'Landscape', values: { focalLengthMm: 20, aperture: 8, distanceMm: 15000 } },
  { name: 'Street', category: 'Landscape', values: { focalLengthMm: 35, aperture: 5.6, distanceMm: 5000 } },
  { name: 'Small Product', category: 'Product', values: { focalLengthMm: 85, aperture: 8, distanceMm: 1200 } },
  { name: 'Food', category: 'Product', values: { focalLengthMm: 50, aperture: 4, distanceMm: 900 } },
  { name: 'Jewellery', category: 'Product', values: { focalLengthMm: 100, aperture: 11, distanceMm: 500 } },
  { name: 'Flat Lay', category: 'Product', values: { focalLengthMm: 35, aperture: 8, distanceMm: 1200 } },
  { name: 'Flower', category: 'Macro', values: { focalLengthMm: 100, aperture: 5.6, distanceMm: 450 } },
  { name: 'Insect', category: 'Macro', values: { focalLengthMm: 100, aperture: 8, distanceMm: 350 } },
  { name: 'Product Macro', category: 'Macro', values: { focalLengthMm: 105, aperture: 11, distanceMm: 400 } },
];
