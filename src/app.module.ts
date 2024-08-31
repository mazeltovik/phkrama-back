import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ChildProcessModule } from './child-process/child-process.module';

@Module({
  imports: [UploadModule, ChildProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
