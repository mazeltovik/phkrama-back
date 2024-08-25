import { Injectable } from '@nestjs/common';
import ExifReader from 'exifreader';
@Injectable()
export class UploadService {
  async parseImage(buffer: Buffer) {
    const tags = await ExifReader.load(buffer, {
      async: true,
      expanded: true,
    });
    return tags;
  }
}
