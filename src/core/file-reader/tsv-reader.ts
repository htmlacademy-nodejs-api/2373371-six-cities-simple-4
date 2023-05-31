import { FileReaderInterface } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { KB16 } from '../../constants/cli.js';

const CHUNK_SIZE = KB16; // 16KB

export default class TSVReader extends EventEmitter implements FileReaderInterface {

  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      encoding: 'utf-8',
      highWaterMark: CHUNK_SIZE
    });

    let remainingData = '';
    let positionOfSeparator = remainingData.indexOf('\n');
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();


      while ((positionOfSeparator = remainingData.indexOf('\n')) > -1) {
        const completeRow = remainingData.slice(0, positionOfSeparator);
        remainingData = remainingData.slice(positionOfSeparator + 1);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
