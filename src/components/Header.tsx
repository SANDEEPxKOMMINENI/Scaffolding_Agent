import React from 'react';
import { FileCode2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCode2 className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Blueprint</h1>
        </div>
        <div>
          <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  );
};