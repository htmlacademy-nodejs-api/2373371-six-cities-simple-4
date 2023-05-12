import { CliCommandInterface } from './cli-command.interface.js';
import { Command } from '../../constants/cli.js';
import TsvReader from '../file-reader/tsv-reader.js';
import { createRentOffer } from '../../helpers/rent-offers.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../helpers/index.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = Command.Import;

  public async execute(filename: string): Promise<void> {
    const rentReader = new TsvReader(filename);

    rentReader.on('line', this.onLine);
    rentReader.on('end', this.onComplete);

    try {
      await rentReader.read();
    } catch (err) {
      console.log(chalk.red(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }

  private onLine(line: string) {
    const offer = createRentOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(chalk.bgGray(`Import finished. Imported: ${count} rows`));
  }
}
