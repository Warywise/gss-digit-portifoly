'use client';

import React, { useState, useRef } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '../ui/toast';
import { useTranslations } from 'next-intl';

const PasswordUpdateSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const toast = useToast();
  const t = useTranslations('AuthModal');

  const handleUpdatePassword = async () => {
    const newPassword = passwordRef.current?.value || '';

    if (newPassword.length < 6) {
      toast('warning', t('passwordMinLength'));
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);

    if (error) {
      toast('error', `${t('updatePasswordError')}${error.message}`);
    } else {
      toast('success', t('updatePasswordSuccess'));
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Button
        variant="outline"
        label={t('passwordUpdateTitle')}
        onClick={() => setIsEditing(true)}
        style="w-full"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-background p-4 shadow-sm">
      <span className="text-sm font-medium text-text/90">{t('passwordUpdateTitle')}</span>
      <Input
        type="password"
        placeholder={t('newPasswordPlaceholder')}
        ref={passwordRef}
        minLength={6}
        disabled={isLoading}
        style="w-full"
      />
      <div className="mt-1 flex justify-end gap-2">
        <Button
          variant="ghost"
          label={t('cancelBtn')}
          onClick={() => setIsEditing(false)}
          disabled={isLoading}
        />
        <Button
          variant="default"
          label={isLoading ? t('updatingBtn') : t('updatePasswordBtn')}
          onClick={handleUpdatePassword}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default PasswordUpdateSection;
