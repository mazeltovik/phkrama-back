import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ChildProcessService } from 'src/child-process/child-process.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly ChildProcessService: ChildProcessService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const { index } = await this.ChildProcessService.setRes(res);
    await this.ChildProcessService.imgProcessing(file.buffer, index);
  }
}
