import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChildProcess, fork } from 'node:child_process';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as path from 'path';

const filePath = path.join(__dirname, '/child.js');

@Injectable()
export class ChildProcessService {
  public childFork = null;
  forkChildFile(buffer: Buffer, res: Response) {
    console.log('Fork');
    this.childFork = fork(filePath);
    this.childFork.on('message', async (msg: string) => {
      console.log('Message from child:', msg);
      console.dir(res.headersSent);
      // res.setHeader('Content-Type', 'text/plain');
      await res.status(201).send('Hello');
      console.dir(res.headersSent);
      // res.end();
      return;
      // if (typeof msg == 'object') {
      //   console.log('Hi');
      //   res.send(msg);
      // }
    });
  }
  imgProcessing(buffer: Buffer) {
    this.childFork.send(JSON.stringify(buffer));
  }
}
