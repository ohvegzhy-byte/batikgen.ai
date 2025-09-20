import React from 'react';

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
  onDelete: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error, onDownload, onDelete }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <svg className="animate-spin h-12 w-12 text-teal-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold">Generating your Batik masterpiece...</p>
          <p className="text-slate-400 mt-1">This may take a moment. Please wait.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <p className="text-xl font-semibold">An error occurred</p>
          <p className="mt-1">{error}</p>
        </div>
      );
    }
    if (image) {
      return (
        <div className="group relative">
          <img 
            src={image} 
            alt="Generated batik-themed image" 
            className="w-full h-auto object-cover rounded-lg shadow-lg shadow-black/30"
            style={{ aspectRatio: '16 / 9' }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-4">
            <button
              onClick={onDownload}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-transform hover:scale-105"
              aria-label="Download image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-transform hover:scale-105"
              aria-label="Delete image"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xl font-semibold">Your generated image will appear here.</p>
        <p className="mt-1">Enter a prompt and click 'Generate' to create your batik art.</p>
      </div>
    );
  };

  return (
    <section aria-labelledby="image-display-heading" className="w-full aspect-video bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center p-4">
      <h2 id="image-display-heading" className="sr-only">Generated Image Display</h2>
      {renderContent()}
    </section>
  );
};

export default ImageDisplay;
