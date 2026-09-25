# Optics Engine

## Variables and units

`f` focal length, `N` f-number, `s` subject distance, `c` circle of confusion, `H` hyperfocal distance. Linear engine values use millimetres; angles use degrees.

## Sensor assumptions

Sensor diagonal is `sqrt(width² + height²)`. Crop factor is the 35 mm-frame diagonal (`sqrt(36² + 24²)`) divided by sensor diagonal. Equivalent focal length is focal length multiplied by crop factor. The default circle of confusion is sensor diagonal divided by 1500, a conventional viewing-condition assumption rather than a physical sharpness boundary.

## Depth of field

- Hyperfocal: `H = f² / (N × c) + f`
- Near limit: `Dn = H × s / (H + s - f)`
- Far limit: `Df = H × s / (H - s + f)`
- Front DoF: `s - Dn`
- Rear DoF: `Df - s`
- Total DoF: `Df - Dn`

When the far denominator is zero or negative, the far limit, rear depth, and total depth are represented as `Infinity`. The UI formats that as `∞`. Because the formula measures subject distance from the sensor plane, the hyperfocal action includes the focal-length offset needed to reach that exact boundary; the difference is negligible in normal field use but prevents a misleading enormous finite value. Inputs are clamped at trust boundaries; displays never emit negative or NaN distances.

## Field of view

For each sensor dimension `d`, rectilinear angle of view is `2 × atan(d / (2f))`. Lens distortion, focus breathing, and manufacturer focal-length tolerances are outside Phase 1.

## Diffraction

Guidance compares f-number multiplied by crop factor against broad educational bands. It intentionally avoids declaring any aperture universally bad. Pixel pitch, demosaicing, output size, sharpening, wavelength, and viewing distance affect practical visibility.

## Educational approximations

The engine uses a thin-lens model. The preview communicates direction and relative effect; it is not ray tracing and does not reproduce a named lens, bokeh character, aberrations, transmission, entrance-pupil geometry, perspective correction, or macro effective aperture.

## Testing

Regression tests cover known full-frame values, infinity, close/distant extremes, ultra-wide and telephoto values, custom sensors, invalid dimensions, floating-point safety, and unit conversion.
