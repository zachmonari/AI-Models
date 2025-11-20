import React, { useState } from 'react';
import { AspectRatio, GeneratedImage } from './types';
import { generateImageFromPrompt } from './services/geminiService';
import { SparklesIcon, LoaderIcon, AlertCircleIcon } from './components/Icons';
import { Controls } from './components/Controls';
import { ImageResult } from './components/ImageResult';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const newImage = await generateImageFromPrompt(prompt, aspectRatio);
      setImages((prev) => [newImage, ...prev]);
      // Optional: clear prompt after success? kept for refinement for now.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while generating the image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
      setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleGenerate();
      }
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col items-center relative overflow-x-hidden">
        
        {/* Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <header className="w-full max-w-6xl mx-auto p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-brand-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            LuminaGen
          </h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center z-10">
        
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Turn ideas into <span className="text-brand-400">Visual Masterpieces</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            ZachTechs Powered by Google's Imagen 3. Describe what you want to see, choose a style, and watch the magic happen.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full bg-dark-900/50 border border-gray-800 rounded-2xl p-2 shadow-2xl backdrop-blur-sm transition-all duration-300 focus-within:border-brand-500/50 focus-within:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="A futuristic city floating in the clouds, cyberpunk style, cinematic lighting..."
            className="w-full bg-transparent text-white placeholder-gray-600 p-4 text-lg resize-none focus:outline-none min-h-[60px] md:min-h-[80px]"
            rows={2}
            disabled={isGenerating}
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2 pb-2">
             <div className="w-full md:w-auto overflow-x-auto">
                 <Controls 
                    selectedRatio={aspectRatio} 
                    onRatioChange={setAspectRatio} 
                    disabled={isGenerating}
                 />
             </div>
             
             <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg
                  ${isGenerating || !prompt.trim()
                    ? 'bg-gray-800 cursor-not-allowed text-gray-500' 
                    : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transform hover:-translate-y-0.5'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                    Dreaming...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 w-full bg-red-900/20 border border-red-900/50 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
            <AlertCircleIcon className="w-6 h-6 text-red-400 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img) => (
            <ImageResult key={img.id} image={img} onDelete={handleDelete} />
          ))}
        </div>
        
        {images.length === 0 && !isGenerating && !error && (
            <div className="mt-20 flex flex-col items-center text-gray-600">
                <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4">
                    <SparklesIcon className="w-8 h-8 opacity-20" />
                </div>
                <p>No images generated yet. Start dreaming above!</p>
            </div>
        )}

      </main>
      
      <footer className="w-full p-6 text-center text-gray-700 text-sm z-10">
          <p>&copy; {new Date().getFullYear()} ZachTechs. Powered by Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;