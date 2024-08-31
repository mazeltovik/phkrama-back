import { ExifTags } from 'exifreader';
export default function getExif(exif: ExifTags) {
  return {
    make: exif.Make ? exif.Make.description : null,
    model: exif.Model ? exif.Model.description : null,
    dateTime: exif.DateTime ? exif.DateTime.description : null,
    exposureTime: exif.ExposureTime ? exif.ExposureTime.description : null,
    isoSpeedRatings: exif.ISOSpeedRatings
      ? exif.ISOSpeedRatings.description
      : null,
    lensModel: exif.LensModel ? exif.LensModel.description : null,
    pixelXDimension: exif.PixelXDimension
      ? exif.PixelXDimension.description
      : null,
    pixelYDimension: exif.PixelYDimension
      ? exif.PixelYDimension.description
      : null,
    gpsAltitude: exif.GPSLatitude ? exif.GPSLatitude.description : null,
    gpsLongitude: exif.GPSLongitude ? exif.GPSLongitude.description : null,
  };
}
