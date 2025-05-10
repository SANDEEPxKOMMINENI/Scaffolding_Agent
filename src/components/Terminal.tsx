import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../utils/commandExecutor';

interface TerminalProps {
  output: string[];
  addOutput: (text: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ output, addOutput }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    addOutput(`> ${command}`);
    
    // Add to history
    setHistory(prev => [command, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    
    // Execute command
    const result = await executeCommand(command);
    addOutput(result);
    
    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0 && history[newIndex]) {
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0 && history[newIndex]) {
        setCommand(history[newIndex]);
      } else {
        setCommand('');
      }
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="p-4 h-[500px] overflow-y-auto font-mono text-sm text-green-400 bg-black"
      ref={terminalRef}
      onClick={handleFocus}
    >
      {output.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent outline-none caret-green-400"
          autoFocus
        />
      </form>
    </div>
  );
};