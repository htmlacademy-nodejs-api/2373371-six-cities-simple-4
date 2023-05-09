import { CliCommandInterface } from '../core/cli-command/cli-command.interface.js';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { COMMANDS_DIR_PATH } from '../constants/cli.js';

export async function generateCommands(): Promise<CliCommandInterface[]> {
  try {
    const pathToThisDir = dirname(fileURLToPath(import.meta.url));
    const pathToCommandsDir = resolve(pathToThisDir, COMMANDS_DIR_PATH);
    const fileNames = readdirSync(pathToCommandsDir, { encoding: 'utf-8' });
    const commandFilenamePattern = /.+\.command\.js$/i;
    const filteredFiles = fileNames.filter((fileName) => fileName.match(commandFilenamePattern));

    return await Promise.all(filteredFiles.map(async (filename) => {
      const { default: Command } = await import(`${pathToCommandsDir}${filename}`);
      return new Command;
    }));
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }

    throw new Error(`Unknown error occurred while generating commands: ${err.message}`);
  }
}
