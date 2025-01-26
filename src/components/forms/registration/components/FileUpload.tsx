import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, Upload, FileIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  role: string;
  maxFiles: number;
  maxSizeMB: number;
  onUploadComplete: (urls: string[]) => void;
  acceptedFileTypes?: string[];
}

export const FileUpload = ({ 
  role, 
  maxFiles, 
  maxSizeMB,
  onUploadComplete,
  acceptedFileTypes = ['image/*', 'application/pdf']
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      toast({
        variant: "destructive",
        title: "Upload limit exceeded",
        description: `You can only upload up to ${maxFiles} files.`
      });
      return;
    }

    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSizeMB * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Files must be smaller than ${maxSizeMB}MB.`
      });
      return;
    }

    setFiles(prev => [...prev, ...acceptedFiles]);
  }, [files, maxFiles, maxSizeMB, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSizeMB * 1024 * 1024,
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);
    setProgress(0);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('role', role);

        const { data, error } = await supabase.functions.invoke('upload-application-files', {
          body: formData,
        });

        if (error) throw error;
        if (data.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }

        setProgress(((i + 1) / files.length) * 100);
      }

      onUploadComplete(uploadedUrls);
      setFiles([]);
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file${files.length === 1 ? '' : 's'} uploaded.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-fashion-pink bg-fashion-pink/5' : 'border-gray-300'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select files"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Up to {maxFiles} files, max {maxSizeMB}MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <FileIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {uploading ? (
            <div className="space-y-2">
              <Progress value={progress} />
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </div>
            </div>
          ) : (
            <Button
              onClick={uploadFiles}
              className="w-full bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90"
            >
              Upload {files.length} file{files.length === 1 ? '' : 's'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};