import { ExifTags } from 'exifreader';
export default function getExif(exif: ExifTags) {
  const {
    Make: { description: make },
    Model: { description: model },
    DateTime: { description: dateTime },
    ExposureTime: { description: exposureTime },
    ISOSpeedRatings: { description: isoSpeenRatings },
    // LensModel: { description: lensModel },
    PixelXDimension: { description: pixelXDimension },
    PixelYDimension: { description: pixelYDimension },
    // GPSAltitude: { description: altitude = null },
    // GPSLongitude: { description: longitude = null },
  } = exif;
  return {
    make,
    model,
    dateTime,
    exposureTime,
    isoSpeenRatings,
    // lensModel,
    pixelXDimension,
    pixelYDimension,
    // altitude,
    // longitude,
  };
}
