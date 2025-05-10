import { helpCommand } from './commands/help';
import { initCommand } from './commands/init';
import { listCommand } from './commands/list';
import { versionCommand } from './commands/version';
import { clearCommand } from './commands/clear';

type CommandFunction = (args: string[]) => string | Promise<string>;

const commands: Record<string, CommandFunction> = {
  help: helpCommand,
  init: initCommand,
  list: listCommand,
  version: versionCommand,
  clear: clearCommand,
};

export const executeCommand = async (input: string): Promise<string> => {
  const args = input.trim().split(/\s+/);
  const commandName = args[0].toLowerCase();
  
  if (commandName in commands) {
    return await commands[commandName](args.slice(1));
  }
  
  return `Command not found: ${commandName}. Type 'help' to see available commands.`;
};