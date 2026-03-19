'use client';

import React, { useState, useEffect, useRef } from 'react';
import Modal from './ui/modal';
import Input from './ui/input';
import Button from './ui/button';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/lib/providers/auth-provider';
import { createClient } from '@/lib/supabase/client';
import { useToast } from './ui/toast';
import { revalidateProjectsCache } from '@/lib/actions/interactions';
import PasswordUpdateSection from './auth-modal/password-update-section';

interface ProfileSettingsModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const { user } = useAuth();
  const supabase = createClient();
  const toast = useToast();

  const displayNameRef = useRef<HTMLInputElement>(null);
  const avatarUrlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.user_metadata) {
      if (displayNameRef.current) {
        displayNameRef.current.value = user.user_metadata.display_name || '';
      }
      if (avatarUrlRef.current) {
        avatarUrlRef.current.value = user.user_metadata.avatar_url || '';
      }
    }
  }, [user, visible]);

  const handleUpdateProfile = async () => {
    const displayName = displayNameRef.current?.value || '';
    const avatarUrl = avatarUrlRef.current?.value || '';

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName, avatar_url: avatarUrl },
    });
    setIsLoading(false);

    if (error) {
      toast('error', `Erro ao atualizar: ${error.message}`);
    } else {
      revalidateProjectsCache();
      toast('success', 'Seus dados foram atualizados com sucesso.');
      if (onConfirm) onConfirm();
      onCancel();
    }
  };

  const handleLinkGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.linkIdentity({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    setIsLoading(false);

    if (error) {
      toast('error', `Erro ao vincular Google: ${error.message}`);
    }
  };

  const handleLinkEmail = async () => {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (!email || !password) {
      toast('warning', 'Preencha E-mail e Senha para vincular.');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ email, password });
    setIsLoading(false);

    if (error) {
      toast('error', `Erro ao vincular E-mail: ${error.message}`);
    } else {
      toast('success', 'Sua conta foi promovida com sucesso!');
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
    }
  };

  const ModalBody = () => (
    <div className="flex flex-col gap-5">
      {/* Formulário */}
      <div className="flex flex-col gap-4">
        {user?.email && (
          <div className="flex flex-col gap-2">
            <label htmlFor="userEmail" className="text-sm font-medium text-text/90">
              E-mail Vinculado
            </label>
            <Input
              id="userEmail"
              type="email"
              value={user.email}
              readOnly
              disabled
              style="w-full opacity-70 cursor-not-allowed"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="displayName" className="text-sm font-medium text-text/90">
            Nome de Exibição
          </label>
          <Input
            id="displayName"
            placeholder="Insira seu nome de exibição"
            style="w-full"
            ref={displayNameRef}
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="avatarUrl" className="text-sm font-medium text-text/90">
            URL do Avatar
          </label>
          <Input
            id="avatarUrl"
            type="url"
            placeholder="https://exemplo.com/avatar.jpg"
            style="w-full"
            ref={avatarUrlRef}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Seção abaixo do formulário */}
      <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
        <Button
          variant="outline"
          style="flex w-full items-center justify-center gap-2"
          disabled={isLoading || user?.app_metadata?.providers?.includes('google')}
          onClick={handleLinkGoogle}
          label={
            <>
              <FaGoogle className="text-lg" />
              {user?.app_metadata?.providers?.includes('google')
                ? 'Google Vinculado'
                : 'Vincular Conta Google'}
            </>
          }
        />

        {user?.is_anonymous && (
          <>
            <span className="mt-2 text-xs font-medium text-text/75">Ou vincular com E-mail</span>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Digite um E-mail"
                type="email"
                style="w-full"
                ref={emailRef}
                disabled={isLoading}
              />
              <Input
                placeholder="Digite uma Senha"
                type="password"
                style="w-full"
                ref={passwordRef}
                disabled={isLoading}
              />
              <Button
                variant="secondary"
                style="w-full"
                label="Vincular com E-mail"
                onClick={handleLinkEmail}
                disabled={isLoading}
              />
            </div>
          </>
        )}

        {user?.app_metadata?.providers?.includes('email') && (
          <div className="mt-2 border-t border-border pt-4 flex flex-col items-center">
            <div className="w-full">
              <PasswordUpdateSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onConfirm={handleUpdateProfile}
      header="Configurações de Perfil"
      confirmLabel={isLoading ? 'Salvando...' : 'Salvar Alterações'}
      body={<ModalBody />}
    />
  );
};

export default ProfileSettingsModal;
