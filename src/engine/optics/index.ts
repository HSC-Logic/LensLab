import type { OpticsResult, Sensor, Setup } from '../../types';
import { circleOfConfusion, cropFactor, sensorDiagonal } from './cropFactor';
import { depthOfField } from './depthOfField';
import { diffractionGuidance } from './diffraction';
import { angleOfView } from './fieldOfView';

export const calculateOptics = (setup: Setup, sensor: Sensor): OpticsResult => {
  const diagonal = sensorDiagonal(sensor.widthMm, sensor.heightMm);
  const crop = cropFactor(sensor.widthMm, sensor.heightMm);
  const coc = circleOfConfusion(sensor.widthMm, sensor.heightMm);
  const dof = depthOfField(setup.focalLengthMm, setup.aperture, setup.distanceMm, coc);
  return {
    ...dof,
    sensorDiagonalMm: diagonal,
    cropFactor: crop,
    circleOfConfusionMm: coc,
    equivalentFocalLengthMm: setup.focalLengthMm * crop,
    horizontalFovDeg: angleOfView(sensor.widthMm, setup.focalLengthMm),
    verticalFovDeg: angleOfView(sensor.heightMm, setup.focalLengthMm),
    diagonalFovDeg: angleOfView(diagonal, setup.focalLengthMm),
    diffraction: diffractionGuidance(setup.aperture, crop),
  };
};
