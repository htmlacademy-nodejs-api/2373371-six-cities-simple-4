export enum Command {
  Help = '--help',
  Version = '--version',
  Import = '--import',
  Generate = '--generate',
}

export const COMMANDS_DIR_PATH = 'core/cli-command';

export const KB16 = 16384; // 16KB
export const KB64 = 2 ** 16; // 64KB
