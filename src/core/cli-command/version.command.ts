import { readFileSync } from 'node:fs';
import path from 'node:path';

import { CliCommandInterface } from './cli-command.interface.js';
import { Command } from '../../constants/cli.js';
import chalk from 'chalk';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = Command.Version;

  public execute(): void {
    const version = this.readVersion();
    console.log(chalk.green(version));
  }

  private readVersion() {
    const jsonContent = readFileSync(path.resolve('./package.json'), 'utf-8');
    const content = JSON.parse(jsonContent);

    return content.version;
  }
}
