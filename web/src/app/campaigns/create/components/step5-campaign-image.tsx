'use client';

import { Button } from '@heroui/react';
import { Upload } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Step5CampaignImageProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function Step5CampaignImage({
  image,
  onImageChange,
}: Step5CampaignImageProps) {
  const t = useTranslations('campaigns.create.step5');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (image) {
      // Revoke old URL if it exists
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      // Create new URL
      const newUrl = URL.createObjectURL(image);
      objectUrlRef.current = newUrl;
      setImagePreview(newUrl);
    } else {
      // Cleanup when image is removed
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setImagePreview(null);
    }

    // Cleanup on unmount
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    setError(null);

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(t('error_too_large'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError(t('error_invalid'));
      return;
    }

    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {t('title')} <span className="text-primary">{t('title_highlight')}</span>
        </h2>
        <p className="text-default-500">
          {t('subtitle')} <span className="font-semibold text-foreground">{t('subtitle_bold')}</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {imagePreview ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden border-2 border-primary">
              <img src={imagePreview} alt="Preview" className="w-full h-auto" />
            </div>
            <p className="text-sm text-default-500">
              {image?.name}
            </p>
            <Button
              variant="light"
              color="danger"
              size="sm"
              onPress={handleRemoveImage}
            >
              {t('remove_image')}
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div
              onClick={handleClick}
              className="w-full bg-default-100 border-2 border-dashed border-default-300 rounded-lg p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="w-12 h-12 text-default-400" />
              <Button
                color="primary"
                onPress={handleClick}
                className="w-full"
              >
                {t('choose_image')}
              </Button>
              <p className="text-sm text-default-500 text-center">
                {t('click_to_select')}
              </p>
            </div>
            {error && (
              <div className="w-full bg-danger-50 border border-danger-200 rounded-lg p-4 flex gap-3">
                <div className="text-danger text-xl">⚠️</div>
                <p className="text-sm text-danger">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
