import { CliCommandInterface } from './cli-command.interface.js';
import { Command } from '../../constants/cli.js';
import RentReader from '../file-reader/rent-reader.js';
import chalk from 'chalk';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = Command.Import;

  public execute(filename: string): void {
    const rentReader = new RentReader(filename);

    try {
      rentReader.read();
      console.log(rentReader.parseFile());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(chalk.red(`Не удалось импортировать данные из файла по причине: «${err.message}»`));
    }
  }
}
