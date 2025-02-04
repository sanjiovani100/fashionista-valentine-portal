import { useState, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import type { ModelFormData } from '../types/model.types';

interface FileUploadHookProps {
  setValue: UseFormSetValue<ModelFormData>;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: string[];
  fieldName: 'portfolio.images' | 'portfolio.video';
}

export const useFileUpload = ({
  setValue,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  fieldName,
}: FileUploadHookProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    if (file.size > maxFileSize) {
      return `File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`;
    }
    return null;
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setUploadError(null);

      const files = Array.from(e.dataTransfer.files);

      if (fieldName === 'portfolio.video' && files.length > 1) {
        setUploadError('Only one video file can be uploaded');
        return;
      }

      if (files.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate each file
      for (const file of files) {
        const error = validateFile(file);
        if (error) {
          setUploadError(error);
          return;
        }
      }

      // Update form value
      if (fieldName === 'portfolio.video') {
        setValue(fieldName, files[0]);
      } else {
        setValue(fieldName, files);
      }
    },
    [setValue, maxFiles, fieldName]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setUploadError(null);
      const files = Array.from(e.target.files || []);

      if (fieldName === 'portfolio.video' && files.length > 1) {
        setUploadError('Only one video file can be uploaded');
        return;
      }

      if (files.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate each file
      for (const file of files) {
        const error = validateFile(file);
        if (error) {
          setUploadError(error);
          return;
        }
      }

      // Update form value
      if (fieldName === 'portfolio.video') {
        setValue(fieldName, files[0]);
      } else {
        setValue(fieldName, files);
      }
    },
    [setValue, maxFiles, fieldName]
  );

  return {
    isDragging,
    uploadError,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
  };
}; 