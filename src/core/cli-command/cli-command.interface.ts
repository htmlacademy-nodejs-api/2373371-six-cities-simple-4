import { Command } from '../../constants/cli.js';

export interface CliCommandInterface {
  readonly name: Command;
  execute(...parameters: string[]): void;
}
