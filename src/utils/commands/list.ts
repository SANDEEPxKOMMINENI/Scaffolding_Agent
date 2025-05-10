import { availableStacks } from '../templates/stacks';

export const listCommand = (_args: string[]): string => {
  const frontendStacks = Object.keys(availableStacks.frontend).join(', ');
  const backendStacks = Object.keys(availableStacks.backend).join(', ');
  const fullstackStacks = Object.keys(availableStacks.fullstack).join(', ');

  return `
Available Tech Stacks:

Frontend:
  ${frontendStacks}

Backend:
  ${backendStacks}

Fullstack:
  ${fullstackStacks}

Use 'init' command to start a new project with these stacks.
`;
};