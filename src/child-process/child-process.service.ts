import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ChildProcess, fork } from 'node:child_process';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as path from 'path';
import { ResNode, ChildMsg } from './helpers/responsesTypes';

const filePath = path.join(__dirname, '/child.js');

@Injectable()
export class ChildProcessService implements OnModuleInit {
  public childFork: ChildProcess = null;
  public resCount = 0;
  public resNodes = new Map<number, ResNode>();
  private readonly logger = new Logger(ChildProcessService.name);
  onModuleInit() {
    this.logger.log('Child process service has been initialized.');
    this.childFork = fork(filePath);
    this.childFork.on('message', async (msg: ChildMsg) => {
      if (msg.initMsg) {
        this.logger.log(msg.initMsg);
      } else {
        const { index, extractData, done } = msg;
        if (done) {
          const node = await this.getRes(index);
          if (node) {
            await this.sendExtractData(node.res, extractData);
            await this.removeNode(index);
          }
        }
      }
    });
    this.childFork.send('Init');
  }

  async setRes(res: Response) {
    const node = { index: this.resCount, res };
    this.resNodes.set(this.resCount, node);
    this.resCount += 1;
    return node;
  }
  async imgProcessing(buffer: Buffer, index: number) {
    this.childFork.send(JSON.stringify({ index, buffer }));
  }
  async getRes(index: number) {
    const node = this.resNodes.get(index);
    return node;
  }
  async removeNode(index: number) {
    this.resNodes.delete(index);
  }
  async sendExtractData(res: Response, data: ChildMsg['extractData']) {
    res.send(data);
  }
}
