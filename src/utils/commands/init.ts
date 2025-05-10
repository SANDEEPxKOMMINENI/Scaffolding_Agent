import { generateProject } from '../generators/projectGenerator';

export const initCommand = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return `
Starting interactive project setup...

[This is a simulation - in a real CLI, this would prompt for inputs]
Please specify the following:
1. Project name
2. Tech stack (use 'list' command to see available options)
3. Optional features (Docker, CI/CD, etc.)

Example usage: init --stack react-express my-project
`;
  }
  
  // Join all arguments except --stack and its value to form project name
  const stackFlagIndex = args.findIndex(arg => arg === '--stack');
  let stack = 'react'; // default
  let projectName = stackFlagIndex !== -1 
    ? args.filter((_, i) => i !== stackFlagIndex && i !== stackFlagIndex + 1).join(' ')
    : args.join(' ');
  
  if (stackFlagIndex !== -1 && args.length > stackFlagIndex + 1) {
    stack = args[stackFlagIndex + 1];
  }
  
  return await generateProject(projectName, stack);
};