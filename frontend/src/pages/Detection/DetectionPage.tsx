import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Select } from '@/components/ui';

const detectionSchema = z.object({
  cropType: z.string().min(1, 'Please select a crop type'),
  notes: z.string().optional(),
});

type DetectionFormData = z.infer<typeof detectionSchema>;

const cropOptions = [
  { value: 'tomato', label: 'Tomato' },
  { value: 'potato', label: 'Potato' },
  { value: 'corn', label: 'Corn' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
];

export function DetectionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetectionFormData>({
    resolver: zodResolver(detectionSchema),
    defaultValues: { cropType: '', notes: '' },
  });

  const onSubmit = (_data: DetectionFormData) => {
    // Detection logic will be implemented by the team
  };

  return (
    <MainLayout title="Detection">
      <PageHeader
        title="Crop Disease Detection"
        subtitle="Upload a crop leaf image for AI-powered disease analysis"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select a clear photo of the affected crop leaf</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-primary-500/30 transition-colors cursor-pointer">
              <svg className="w-12 h-12 mx-auto text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-slate-400">Drag & drop or click to upload</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <Select
                label="Crop Type"
                options={cropOptions}
                placeholder="Select crop type"
                error={errors.cropType?.message}
                {...register('cropType')}
              />
              <Input
                label="Notes (optional)"
                placeholder="Additional observations..."
                error={errors.notes?.message}
                {...register('notes')}
              />
              <Button type="submit" fullWidth disabled>
                Analyze Crop — Coming Soon
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detection Results</CardTitle>
            <CardDescription>AI prediction and recommendations will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-8">
              <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 text-center">
                Upload an image and run detection to see results
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
