import { FileWriterInterface } from './file-writer.interface.js';
import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { KB64 } from '../../constants/cli';

const CHUNK_SIZE = KB64; // 64KB

export default class TSVWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
      autoClose: true,
      flags: 'w',
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
