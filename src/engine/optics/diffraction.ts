export const diffractionGuidance = (aperture: number, crop: number) => {
  const effective = aperture * crop;
  if (effective < 8) return 'Diffraction is unlikely to be the main limit on fine detail.';
  if (effective < 16) return 'Diffraction may begin to soften the finest detail, depending on output size and viewing conditions.';
  return 'Diffraction may increasingly reduce fine-detail resolution; greater depth of field can still justify this aperture.';
};
