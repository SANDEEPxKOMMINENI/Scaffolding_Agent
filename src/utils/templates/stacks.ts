export interface StackTemplate {
  name: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  folders: string[];
  files: Record<string, string>;
}

export interface StackTemplates {
  frontend: Record<string, StackTemplate>;
  backend: Record<string, StackTemplate>;
  fullstack: Record<string, StackTemplate>;
}

export const availableStacks: StackTemplates = {
  frontend: {
    react: {
      name: 'React',
      description: 'A React frontend with Vite, TypeScript, and TailwindCSS',
      dependencies: [
        'react',
        'react-dom',
        'react-router-dom'
      ],
      devDependencies: [
        'vite',
        '@vitejs/plugin-react',
        'typescript',
        '@types/react',
        '@types/react-dom',
        'tailwindcss',
        'postcss',
        'autoprefixer'
      ],
      folders: [
        'src',
        'src/components',
        'src/pages',
        'src/utils',
        'src/assets',
        'public'
      ],
      files: {
        'package.json': JSON.stringify({
          name: '{PROJECT_NAME}',
          private: true,
          version: '0.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
            preview: 'vite preview'
          }
        }, null, 2),
        'README.md': '# {PROJECT_NAME}\n\nA React project created with Blueprint.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```',
        '.gitignore': 'node_modules\ndist\n.env\n.DS_Store',
        'index.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>{PROJECT_NAME}</title>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.tsx"></script>\n</body>\n</html>'
      }
    },
    'next': {
      name: 'Next.js',
      description: 'A Next.js frontend with TypeScript and TailwindCSS',
      dependencies: [
        'next',
        'react',
        'react-dom'
      ],
      devDependencies: [
        'typescript',
        '@types/react',
        '@types/react-dom',
        '@types/node',
        'tailwindcss',
        'postcss',
        'autoprefixer'
      ],
      folders: [
        'pages',
        'pages/api',
        'components',
        'styles',
        'utils',
        'public'
      ],
      files: {
        'package.json': JSON.stringify({
          name: '{PROJECT_NAME}',
          version: '0.1.0',
          private: true,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint'
          }
        }, null, 2),
        'README.md': '# {PROJECT_NAME}\n\nA Next.js project created with Blueprint.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```',
        '.gitignore': 'node_modules\n.next\nout\n.env*.local\n.DS_Store'
      }
    }
  },
  backend: {
    express: {
      name: 'Express',
      description: 'An Express.js backend with TypeScript',
      dependencies: [
        'express',
        'cors',
        'dotenv'
      ],
      devDependencies: [
        'typescript',
        '@types/express',
        '@types/cors',
        '@types/node',
        'ts-node',
        'nodemon'
      ],
      folders: [
        'src',
        'src/controllers',
        'src/routes',
        'src/models',
        'src/middleware',
        'src/utils'
      ],
      files: {
        'package.json': JSON.stringify({
          name: '{PROJECT_NAME}',
          version: '1.0.0',
          main: 'dist/index.js',
          scripts: {
            dev: 'nodemon src/index.ts',
            build: 'tsc',
            start: 'node dist/index.js'
          }
        }, null, 2),
        'README.md': '# {PROJECT_NAME}\n\nAn Express.js project created with Blueprint.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```',
        '.gitignore': 'node_modules\ndist\n.env\n.DS_Store',
        '.env.example': 'PORT=3000\nMONGO_URI=mongodb://localhost:27017/{PROJECT_NAME}\nNODE_ENV=development'
      }
    },
    'fastapi': {
      name: 'FastAPI',
      description: 'A FastAPI backend with Python',
      dependencies: [],
      devDependencies: [],
      folders: [
        'app',
        'app/routers',
        'app/models',
        'app/schemas',
        'app/utils',
        'tests'
      ],
      files: {
        'requirements.txt': 'fastapi>=0.95.0\nuvicorn>=0.21.0\npydantic>=1.10.7\npython-dotenv>=1.0.0',
        'README.md': '# {PROJECT_NAME}\n\nA FastAPI project created with Blueprint.\n\n## Getting Started\n\n```bash\npip install -r requirements.txt\nuvicorn app.main:app --reload\n```',
        '.gitignore': '__pycache__\n.venv\n.env\n.DS_Store',
        '.env.example': 'DATABASE_URL=postgresql://postgres:postgres@localhost:5432/{PROJECT_NAME}\nSECRET_KEY=your_secret_key'
      }
    }
  },
  fullstack: {
    'react-express': {
      name: 'React + Express',
      description: 'A React frontend with Express backend',
      dependencies: [],
      devDependencies: [],
      folders: [
        'frontend',
        'backend',
        'docker'
      ],
      files: {
        'README.md': '# {PROJECT_NAME}\n\nA fullstack React + Express project created with Blueprint.\n\n## Getting Started\n\n```bash\n# Install dependencies for backend\ncd backend\nnpm install\n\n# Install dependencies for frontend\ncd ../frontend\nnpm install\n\n# Run both concurrently (from root directory)\nnpm run dev\n```',
        '.gitignore': 'node_modules\ndist\n.env\n.DS_Store\n.next\nout',
        'package.json': JSON.stringify({
          name: '{PROJECT_NAME}',
          version: '1.0.0',
          private: true,
          scripts: {
            'dev': 'concurrently "npm run dev:frontend" "npm run dev:backend"',
            'dev:frontend': 'cd frontend && npm run dev',
            'dev:backend': 'cd backend && npm run dev',
            'build': 'npm run build:frontend && npm run build:backend',
            'build:frontend': 'cd frontend && npm run build',
            'build:backend': 'cd backend && npm run build'
          },
          devDependencies: {
            'concurrently': '^8.0.1'
          }
        }, null, 2)
      }
    },
    'next-supabase': {
      name: 'Next.js + Supabase',
      description: 'A Next.js frontend with Supabase backend',
      dependencies: [],
      devDependencies: [],
      folders: [
        'app',
        'components',
        'lib',
        'public',
        'styles'
      ],
      files: {
        'package.json': JSON.stringify({
          name: '{PROJECT_NAME}',
          version: '0.1.0',
          private: true,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint'
          },
          dependencies: {
            'next': '13.4.2',
            'react': '18.2.0',
            'react-dom': '18.2.0',
            '@supabase/auth-helpers-nextjs': '^0.7.0',
            '@supabase/supabase-js': '^2.21.0'
          },
          devDependencies: {
            'typescript': '5.0.4',
            '@types/react': '18.2.6',
            '@types/react-dom': '18.2.4',
            '@types/node': '20.1.3',
            'autoprefixer': '10.4.14',
            'postcss': '8.4.23',
            'tailwindcss': '3.3.2'
          }
        }, null, 2),
        'README.md': '# {PROJECT_NAME}\n\nA Next.js + Supabase project created with Blueprint.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```',
        '.gitignore': 'node_modules\n.next\nout\n.env*.local\n.DS_Store',
        '.env.example': 'NEXT_PUBLIC_SUPABASE_URL=your-supabase-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key'
      }
    }
  }
};