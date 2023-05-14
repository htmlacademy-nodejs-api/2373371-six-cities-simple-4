import { Command } from '../constants/cli.js';

import { CliCommandInterface } from '../core/cli-command/cli-command.interface.js';

type ParsedCommand = Record<string, string[]>;

export default class CLIApplication {
  private defaultCommand: Command = Command.Help;
  private commands: Record<string, CliCommandInterface> = {};

  public parseCommand(cliArguments: string[]): ParsedCommand {
    const commands: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, commands);
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]) {
    const parsedCommand = this.parseCommand(argv);
    const [firstCommandName] = Object.keys(parsedCommand);
    const command = this.getCommand(firstCommandName);
    const commandArguments = parsedCommand[firstCommandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandsList: CliCommandInterface[]) {
    this.commands = commandsList.reduce((acc, command) => ({ ...acc, [command.name]: command }), this.commands);
  }
}
