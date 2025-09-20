import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import { generateBatikImage } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('a majestic peacock with its tail feathers unfurled');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateBatikImage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleDownloadImage = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    // Sanitize prompt to create a valid filename
    const filename = `${prompt.replace(/[^a-z0-9]/gi, '_').slice(0, 50)}_batik.jpeg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, prompt]);

  const handleDeleteImage = useCallback(() => {
    setGeneratedImage(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div 
        className="fixed inset-0 z-[-1] opacity-10" 
        style={{ backgroundImage: 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0 H4 V4 H0 Z M4 4 H8 V8 H4 Z" fill="%2394a3b8" fill-opacity="0.2" /></svg>\')' }}
      />
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateImage}
            isLoading={isLoading}
          />
          <ImageDisplay
            image={generatedImage}
            isLoading={isLoading}
            error={error}
            onDownload={handleDownloadImage}
            onDelete={handleDeleteImage}
          />
        </main>
        <footer className="text-center text-slate-500 mt-12 text-sm">
          <p>Powered by Gemini AI. Designed for creating beautiful Indonesian Batik art.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
