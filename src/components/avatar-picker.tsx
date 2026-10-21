'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaUser, FaArrowsRotate } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import Input from './ui/input';
import { getPresetAvatarsAction } from '@/app/actions/avatars';

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelectAvatar: (url: string) => void;
  disabled?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  selectedAvatar,
  onSelectAvatar,
  disabled = false,
}) => {
  const t = useTranslations('ProfileSettings');

  const [presetAvatars, setPresetAvatars] = useState<string[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(true);
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [imageHasError, setImageHasError] = useState(false);

  const loadPresets = useCallback(async () => {
    setLoadingPresets(true);
    try {
      const avatars = await getPresetAvatarsAction();
      setPresetAvatars(avatars);
    } catch (error) {
      console.error('Failed to load preset avatars:', error);
    } finally {
      setLoadingPresets(false);
    }
  }, []);

  useEffect(() => {
    loadPresets();
  }, [loadPresets]);

  useEffect(() => {
    if (selectedAvatar && selectedAvatar.startsWith('https://')) {
      setCustomUrl(selectedAvatar);
    }
  }, [selectedAvatar]);

  const handleSelectPreset = (presetUrl: string) => {
    if (disabled) return;
    setImageHasError(false);
    setUrlError(null);
    setCustomUrl('');
    onSelectAvatar(presetUrl);
  };

  const handleCustomUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomUrl(value);
    setImageHasError(false);

    const trimmed = value.trim();
    if (!trimmed) {
      setUrlError(null);
      onSelectAvatar('');
      return;
    }

    if (!trimmed.startsWith('https://')) {
      setUrlError(t('invalidHttpsUrl'));
      return;
    }

    setUrlError(null);
    onSelectAvatar(trimmed);
  };

  const renderPreview = () => {
    if (!selectedAvatar || imageHasError) {
      return (
        <div className="flex size-full items-center justify-center rounded-full bg-secondary text-primary">
          <FaUser className="size-8" />
        </div>
      );
    }

    return (
      <Image
        src={selectedAvatar}
        alt="Avatar Preview"
        width={72}
        height={72}
        unoptimized
        onError={() => setImageHasError(true)}
        className="size-full rounded-full object-cover"
      />
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative size-18 shrink-0 overflow-hidden rounded-full border-2 border-border p-0.5 shadow-sm">
          {renderPreview()}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text">{t('chooseAvatar')}</span>
          <span className="text-xs text-subtitle">{t('presetGallery')}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {loadingPresets && (
          <div className="flex items-center gap-2 py-4 text-xs text-subtitle">
            <FaArrowsRotate className="size-3.5 animate-spin text-primary" />
            {t('loadingAvatars')}
          </div>
        )}

        {!loadingPresets && presetAvatars.length === 0 && (
          <div className="py-2 text-xs text-subtitle">{t('emptyPresets')}</div>
        )}

        {!loadingPresets && presetAvatars.length > 0 && (
          <div className="grid max-h-40 grid-cols-4 sm:grid-cols-6 gap-2.5 overflow-y-auto p-1">
            {presetAvatars.map((preset) => {
              const isSelected = selectedAvatar === preset;
              const buttonStyle = isSelected
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                : 'opacity-70 hover:opacity-100 hover:scale-105';

              return (
                <button
                  key={preset}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectPreset(preset)}
                  className={`relative size-11 shrink-0 overflow-hidden rounded-full border border-border transition-all duration-150 cursor-pointer ${buttonStyle}`}
                >
                  <Image
                    src={preset}
                    alt="Preset avatar"
                    width={44}
                    height={44}
                    unoptimized
                    className="size-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-border/60">
        <label htmlFor="customAvatarUrl" className="text-xs font-medium text-text/80">
          {t('orCustomUrl')}
        </label>
        <Input
          id="customAvatarUrl"
          type="url"
          placeholder={t('customUrlPlaceholder')}
          value={customUrl}
          onChange={handleCustomUrlChange}
          disabled={disabled}
          style="w-full text-xs"
        />
        {urlError && <span className="text-xs text-danger font-medium">{urlError}</span>}
      </div>
    </div>
  );
};

export default AvatarPicker;
