'use client';

import React, { useState, useRef } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '../ui/toast';

const PasswordUpdateSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const toast = useToast();

  const handleUpdatePassword = async () => {
    const newPassword = passwordRef.current?.value || '';

    if (newPassword.length < 6) {
      toast('warning', 'A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);

    if (error) {
      toast('error', `Erro ao alterar senha: ${error.message}`);
    } else {
      toast('success', 'Sua senha foi atualizada com sucesso!');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Button
        variant="outline"
        label="Alterar Senha"
        onClick={() => setIsEditing(true)}
        style="w-full"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-background p-4 shadow-sm">
      <span className="text-sm font-medium text-text/90">Nova Senha</span>
      <Input
        type="password"
        placeholder="Digite a nova senha"
        ref={passwordRef}
        minLength={6}
        disabled={isLoading}
        style="w-full"
      />
      <div className="mt-1 flex justify-end gap-2">
        <Button
          variant="ghost"
          label="Cancelar"
          onClick={() => setIsEditing(false)}
          disabled={isLoading}
        />
        <Button
          variant="default"
          label={isLoading ? 'Salvando...' : 'Salvar Senha'}
          onClick={handleUpdatePassword}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default PasswordUpdateSection;
