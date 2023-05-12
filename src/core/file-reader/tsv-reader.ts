import { FileReaderInterface } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16000;

export default class TSVReader extends EventEmitter implements FileReaderInterface {

  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, { encoding: 'utf-8', highWaterMark: CHUNK_SIZE });

    let remainingData = '';
    let positionOfSeparator = remainingData.indexOf('\n');
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();


      while ((positionOfSeparator = remainingData.indexOf('\n')) > -1) {
        const completeRow = remainingData.slice(0, positionOfSeparator);
        remainingData = remainingData.slice(positionOfSeparator + 1);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
