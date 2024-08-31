import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChildProcess, fork } from 'node:child_process';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as path from 'path';

const filePath = path.join(__dirname, '/child.js');

@Injectable()
export class ChildProcessService {
  public childFork = null;
  async forkChildFile() {
    if (!this.childFork) {
      console.log('Fork');
      this.childFork = await fork(filePath);
      this.childFork.on('message', (msg: string) => {
        console.log('Message from child:', msg);
        // if (typeof msg == 'object') {
        //   console.log('hi');
        //   res.send(msg);
        // }
      });
      this.childFork.send('Hello');
    }
    this.childFork.send('Hello');
  }
  imgProcessing(buffer: string) {
    this.childFork.send(JSON.stringify(buffer));
  }
}
