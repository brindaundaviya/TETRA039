import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { t } from '@/utils/translations';

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
    <Card className="mb-0 overflow-hidden border border-white/10 p-0">
      <CardHeader className="border-b border-white/5 p-4 sm:p-5 pb-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-white">
              <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('scan.title')}
            </CardTitle>
            <CardDescription className="mt-1 text-base text-slate-300">{t('scan.subtitle')}</CardDescription>
          </div>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
            Max 5 MB
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 sm:p-5">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />

        {!selectedImage ? (
          <div className="space-y-5">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer overflow-hidden rounded-[1.5rem] border-2 border-dashed p-6 text-center transition-all duration-300 sm:p-8 ${
                isDragging
                  ? 'scale-[0.99] border-primary-400 bg-primary-500/10 shadow-glow'
                  : 'border-white/15 bg-slate-900/50 hover:border-primary-500/40 hover:bg-white/[0.03]'
              }`}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-primary-500/15 text-primary-400">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <h3 className="mb-1 text-lg font-bold text-white">{t('scan.dropTitle')}</h3>
              <p className="text-sm text-slate-400">{t('scan.dropSubtitle')}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-primary-500/30 bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-200 transition-all hover:bg-primary-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <span className="text-2xl">📷</span>
                {t('scan.takePhoto')}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="text-2xl">🖼</span>
                {t('scan.uploadGallery')}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-400">
              <p>{t('scan.supportedFormats')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
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
                className="w-full px-6 py-3 text-base font-semibold shadow-glow sm:w-auto"
              >
                {isAnalyzing ? t('scan.analyzing') : 'Check Crop'}
              </Button>
            </div>
          </div>
        )}

        {/* Demo Preset Leaf Samples */}
        <div className="border-t border-white/5 pt-3">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Or try with sample leaf presets:
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onImageSelect(preset.imageUrl, preset.id)}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 text-left transition-all hover:border-primary-500/40 focus:outline-none"
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
