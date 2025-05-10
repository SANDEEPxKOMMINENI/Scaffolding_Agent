export const helpCommand = (_args: string[]): string => {
  return `
Available commands:

  init [project-name]       Create a new project with interactive prompts
  list                      List available tech stacks and templates
  version                   Display the current version of Blueprint
  clear                     Clear the terminal output
  help                      Display this help message

Examples:
  init my-app               Start creating a new project called "my-app"
  init --stack react-express my-app   Create a React+Express project
`;
};