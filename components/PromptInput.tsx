import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  return (
    <section aria-labelledby="prompt-heading">
      <h2 id="prompt-heading" className="sr-only">Prompt Input</h2>
      <div className="relative">
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a majestic peacock with its tail feathers unfurled"
          className="w-full h-28 p-4 pr-32 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all resize-none"
          aria-label="Batik image prompt"
          disabled={isLoading}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all flex items-center justify-center"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Generate'}
        </button>
      </div>
    </section>
  );
};

export default PromptInput;
