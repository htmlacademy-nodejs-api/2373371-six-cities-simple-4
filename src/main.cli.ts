#!/usr/bin/env node

import CLIApplication from './app/cli.js';
import { generateCommands } from './helpers/index.js';

const applicationManager = new CLIApplication();

(async function bootstrap() {
  const commands = await generateCommands();

  applicationManager.registerCommands(commands);
  applicationManager.processCommand(process.argv);
})();
