import { availableStacks } from '../templates/stacks';
import { fileTemplates } from '../templates/fileTemplates';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDuaENEyEu6bXEKE49KZr8rO2OymTmUNRU');

async function analyzeProjectRequirements(projectName: string): Promise<{
  features: string[];
  techStack: string;
  complexity: 'simple' | 'medium' | 'complex';
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze this project name and suggest features: "${projectName}"
    Return a JSON object with:
    1. features: array of key features needed
    2. techStack: suggested tech stack (one of: react, next, express, fastapi, react-express, next-supabase)
    3. complexity: project complexity (simple, medium, or complex)
    
    Example response:
    {
      "features": ["user-auth", "dashboard", "api"],
      "techStack": "react-express",
      "complexity": "medium"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text());

    return {
      features: analysis.features,
      techStack: analysis.techStack,
      complexity: analysis.complexity
    };
  } catch (error) {
    console.error('Error analyzing project with Gemini:', error);
    return {
      features: [],
      techStack: 'react',
      complexity: 'simple'
    };
  }
}

export const generateProject = async (projectName: string, stackName: string): Promise<string> => {
  // Analyze project requirements using Gemini API
  const analysis = await analyzeProjectRequirements(projectName);
  
  // Clean project name and create base path
  const cleanProjectName = projectName.toLowerCase().replace(/\s+/g, '-');
  
  // Use analyzed features to determine project structure
  const features = {
    hasAuth: analysis.features.some(f => 
      f.toLowerCase().includes('auth') || 
      f.toLowerCase().includes('login') ||
      f.toLowerCase().includes('user')
    ),
    hasSocial: analysis.features.some(f => 
      f.toLowerCase().includes('social') || 
      f.toLowerCase().includes('community') ||
      f.toLowerCase().includes('share')
    ),
    hasEcommerce: analysis.features.some(f => 
      f.toLowerCase().includes('shop') || 
      f.toLowerCase().includes('store') ||
      f.toLowerCase().includes('product')
    )
  };

  // Find the stack in available stacks
  let stack;
  let stackType: 'frontend' | 'backend' | 'fullstack' | null = null;
  
  // Override stackName if analysis suggests a different stack
  if (analysis.techStack !== stackName) {
    console.log(`AI Analysis suggests using ${analysis.techStack} stack instead of ${stackName}`);
    stackName = analysis.techStack;
  }

  for (const type of ['frontend', 'backend', 'fullstack'] as const) {
    if (availableStacks[type][stackName]) {
      stack = availableStacks[type][stackName];
      stackType = type;
      break;
    }
  }
  
  if (!stack || !stackType) {
    return `Error: Stack "${stackName}" not found. Use 'list' command to see available stacks.`;
  }

  // Create base folders
  const folders = [...stack.folders];
  
  // Add feature-specific folders based on AI analysis
  if (features.hasAuth) {
    folders.push(
      'src/features/auth',
      'src/features/auth/components',
      'src/features/auth/hooks',
      'src/features/auth/utils'
    );
  }
  
  if (features.hasSocial) {
    folders.push(
      'src/features/posts',
      'src/features/profiles',
      'src/features/comments',
      'src/features/notifications'
    );
  }
  
  if (features.hasEcommerce) {
    folders.push(
      'src/features/products',
      'src/features/cart',
      'src/features/checkout',
      'src/features/orders'
    );
  }

  // Add complexity-based folders
  if (analysis.complexity === 'complex') {
    folders.push(
      'src/features/analytics',
      'src/features/admin',
      'src/features/settings',
      'tests/e2e',
      'tests/integration'
    );
  }

  try {
    // Generate shell commands for different environments
    const commands = {
      windows: `
powershell -Command "
  Set-Location ${cleanProjectName}
  npm install
  npm run dev
"`,
      linux: `
#!/bin/bash
cd ${cleanProjectName}
npm install
npm run dev`,
      macos: `
#!/bin/bash
cd ${cleanProjectName}
npm install
npm run dev`
    };

    // Generate output message
    let output = `
✨ Created new ${stack.name} project: ${cleanProjectName}
📊 Project Analysis:
  - Complexity: ${analysis.complexity}
  - Detected Features: ${analysis.features.join(', ')}
  - Recommended Stack: ${analysis.techStack}

📁 Project structure:
${cleanProjectName}/
`;

    folders.forEach(folder => {
      output += `  └── ${folder}/\n`;
    });
    
    if (stack.dependencies.length > 0) {
      output += `\n📦 Dependencies:\n  ${stack.dependencies.join(', ')}\n`;
    }
    
    if (stack.devDependencies.length > 0) {
      output += `\n🔧 Dev Dependencies:\n  ${stack.devDependencies.join(', ')}\n`;
    }
    
    output += `\n🚀 Commands to run (choose based on your OS):

Windows PowerShell:
${commands.windows}

Linux:
${commands.linux}

macOS:
${commands.macos}

For more information, see the README.md file in your project directory.
`;

    return output;
  } catch (error) {
    return `Error creating project: ${error.message}`;
  }
};