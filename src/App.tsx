import React, { useState } from 'react';
import { Terminal } from './components/Terminal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [output, setOutput] = useState<string[]>([
    "Welcome to Blueprint - Project Scaffolding Agent",
    "Type 'help' to see available commands"
  ]);

  const addOutput = (text: string) => {
    setOutput(prev => [...prev, text]);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <Terminal output={output} addOutput={addOutput} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;