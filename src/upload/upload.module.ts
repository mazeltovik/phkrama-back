import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ChildProcessModule } from '../child-process/child-process.module';

@Module({
  imports: [ChildProcessModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
