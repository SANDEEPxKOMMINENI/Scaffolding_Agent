import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm">
        <p>© 2025 Blueprint. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-white flex items-center transition-colors">
            <Github className="h-4 w-4 mr-1" />
            <span>GitHub</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
      </div>
    </footer>
  );
};