import { Injectable } from '@nestjs/common';
import ExifReader from 'exifreader';
import getExif from '../child-process/helpers/getExif';
import { createReadStream } from 'node:fs';
import { fork, spawn } from 'node:child_process';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import * as path from 'path';
// import { Stream } from 'node:stream';
import { Readable, Duplex } from 'node:stream';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
const filePath = path.join(__dirname, '/helpers', '/childProcess.js');
import { ChildProcessService } from '../child-process/child-process.service';

@Injectable()
export class UploadService {
  constructor(public readonly childProcessService: ChildProcessService) {}
  async parseImage(buffer: string) {
    this.childProcessService.imgProcessing(buffer);
  }
}
