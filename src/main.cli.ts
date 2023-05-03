#!/usr/bin/env node

import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/help.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';

const applicationManager = new CLIApplication();

applicationManager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new ImportCommand,
]);

applicationManager.processCommand(process.argv);
