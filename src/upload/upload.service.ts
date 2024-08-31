import { Injectable } from '@nestjs/common';
import ExifReader from 'exifreader';
import getExif from '../child-process/helpers/getExif';

@Injectable()
export class UploadService {
  constructor() {}
  async parseImage(buffer: Buffer) {
    const tags = await ExifReader.load(buffer, {
      async: true,
      expanded: true,
    });
    const extractData = getExif(tags.exif);
    return extractData;
  }
}
