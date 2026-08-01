import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface SamplePreset {
  id: string;
  name: string;
  crop: string;
  imageUrl: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'tomato-early-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'potato-late-blight',
    name: 'Potato Late Blight',
    crop: 'Potato',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'rice-healthy',
    name: 'Healthy Rice Leaf',
    crop: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&auto=format&fit=crop&q=80',
  },
];

interface ImageUploadCardProps {
  selectedImage: string | null;
  onImageSelect: (imageUrl: string, presetId?: string) => void;
  onImageRemove: () => void;
  isAnalyzing: boolean;
  onAnalyzeStart: () => void;
}

export function ImageUploadCard({
  selectedImage,
  onImageSelect,
  onImageRemove,
  isAnalyzing,
  onAnalyzeStart,
}: ImageUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB. Please select a smaller leaf photo.');
        return;
      }
      const url = URL.createObjectURL(file);
      onImageSelect(url);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5 MB. Please select a smaller leaf photo.');
        return;
      }
      const url = URL.createObjectURL(file);
      onImageSelect(url);
    }
  };

  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6">
      <CardHeader className="p-6 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Leaf Image
            </CardTitle>
            <CardDescription>Select or drop a clear photo of the crop leaf</CardDescription>
          </div>

          <span className="px-3 py-1 rounded-full glass text-xs font-mono text-emerald-400 border border-emerald-500/30">
            Max 5 MB
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />

        {/* Drag & Drop or Preview Area */}
        {!selectedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
              isDragging
                ? 'border-primary-400 bg-primary-500/10 shadow-glow scale-[0.99]'
                : 'border-white/15 hover:border-primary-500/40 bg-surface-50/40 hover:bg-white/[0.03]'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Drag & Drop leaf photo here
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              or click to browse from your device
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 group-hover:bg-primary-500/20 group-hover:text-primary-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Browse Files
            </div>

            <div className="mt-4 text-[11px] text-slate-500 font-mono">
              Supported Formats: PNG, JPG, JPEG (Max Size: 5MB)
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Image Preview Container */}
            <div className="relative aspect-video sm:aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden bg-slate-900 group">
              <img
                src={selectedImage}
                alt="Selected Crop Leaf"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-mono text-primary-300 border border-primary-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Image Loaded & Verified</span>
              </div>

              {/* Hover Overlay Action Controls */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-900/80 border-white/20 text-white"
                >
                  Replace Image
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={onImageRemove}
                >
                  Remove Image
                </Button>
              </div>
            </div>

            {/* Action Trigger Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onImageRemove}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 underline focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Selected Leaf
              </button>

              <Button
                variant="primary"
                size="lg"
                onClick={onAnalyzeStart}
                disabled={isAnalyzing}
                isLoading={isAnalyzing}
                className="w-full sm:w-auto px-8 shadow-glow font-semibold"
              >
                {isAnalyzing ? 'Analyzing Cellular Features...' : 'Run AI Leaf Diagnosis'}
              </Button>
            </div>
          </div>
        )}

        {/* Demo Preset Leaf Samples */}
        <div className="pt-4 border-t border-white/5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Or try with sample leaf presets:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onImageSelect(preset.imageUrl, preset.id)}
                className="p-2.5 rounded-2xl glass border border-white/10 hover:border-primary-500/40 text-left transition-all flex items-center gap-3 group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={preset.imageUrl} alt={preset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate group-hover:text-primary-300 transition-colors">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {preset.crop} Sample
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
