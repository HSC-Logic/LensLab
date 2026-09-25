// Thin-lens hyperfocal distance: H = f² / (N × c) + f. All inputs and output are millimetres.
export const hyperfocalDistance = (focalMm: number, aperture: number, cocMm: number) => focalMm ** 2 / (aperture * cocMm) + focalMm;
