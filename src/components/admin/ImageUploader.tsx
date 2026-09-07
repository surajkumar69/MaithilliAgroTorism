'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl?: string | null;
  onUploadSuccess: (url: string) => void;
  onDelete?: () => void;
  label?: string;
}

export function ImageUploader({ currentImageUrl, onUploadSuccess, onDelete, label = 'Upload Image' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Max 5MB allowed.');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      onUploadSuccess(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-semibold text-forest-900">{label}</label>}
      
      {currentImageUrl ? (
        <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden border border-earth-300 shadow-sm group">
          <Image src={currentImageUrl} alt="Preview" fill className="object-cover" />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-forest-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-earth-100 transition"
              type="button"
            >
              Replace
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full max-w-md h-48 rounded-xl border-2 border-dashed border-earth-300 flex flex-col items-center justify-center cursor-pointer hover:bg-earth-100 transition ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-forest-600">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-earth-500">
              <UploadCloud className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium text-forest-800">Click to upload image</span>
              <span className="text-xs mt-1">JPG, PNG, WebP up to 5MB</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/jpeg, image/png, image/webp" 
        className="hidden" 
      />
    </div>
  );
}
