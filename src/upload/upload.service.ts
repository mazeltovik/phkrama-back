import { Injectable } from '@nestjs/common';
import ExifReader from 'exifreader';
import getExif from './helpers/getExif';
@Injectable()
export class UploadService {
  async parseImage(buffer: Buffer) {
    const tags = await ExifReader.load(buffer, {
      async: true,
      expanded: true,
    });
    const extractData = getExif(tags.exif);
    return extractData;
  }
}
