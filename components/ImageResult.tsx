import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon, TrashIcon } from './Icons';

interface ImageResultProps {
  image: GeneratedImage;
  onDelete: (id: string) => void;
}

export const ImageResult: React.FC<ImageResultProps> = ({ image, onDelete }) => {
  const [loaded, setLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `luminagen-${image.timestamp}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-dark-800 border border-gray-800 shadow-2xl animate-fade-in">
      {/* Aspect Ratio container handled by CSS or simply fit content */}
      <div className="relative w-full min-h-[300px] bg-gray-900 flex items-center justify-center">
         {!loaded && (
             <div className="absolute inset-0 flex items-center justify-center text-gray-500 animate-pulse bg-gray-800">
                 Loading image...
             </div>
         )}
        <img
          src={image.url}
          alt={image.prompt}
          className={`w-full h-auto object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
              <button
                  onClick={() => onDelete(image.id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                  title="Remove"
              >
                  <TrashIcon className="w-5 h-5" />
              </button>
          </div>
          <div>
            <p className="text-white/90 text-sm line-clamp-2 font-medium mb-3 drop-shadow-md">
              {image.prompt}
            </p>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <DownloadIcon className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};