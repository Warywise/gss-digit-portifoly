'use client';

import { createClient } from '@/lib/supabase/client';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { FaGoogle, FaUserSecret, FaEnvelope } from 'react-icons/fa6';
import { useToast } from '@/components/ui/toast';
import { AuthError } from '@supabase/supabase-js';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AuthModal = ({ visible, onClose, onSuccess }: AuthModalProps) => {
  const supabase = createClient();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'options' | 'email'>('options');

  // Estados para Login por Email
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const onFinaly = (error: AuthError | null, message: string) => {
    if (error) {
      showToast('error', error.message);
    } else {
      showToast('success', message);
      onSuccess?.();
      onClose();
    }

    setLoading(false);
  };

  // 1. Login com Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    onFinaly(error, 'Login com Google realizado com sucesso!');
  };

  // 2. Login Anônimo
  const handleAnonymousLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          display_name: 'Viajante Curioso',
          is_anonymous: true,
        },
      },
    });

    onFinaly(error, 'Você entrou no modo anônimo!');
  };

  // 3. Login/Cadastro com Email
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let error;

    if (isSignUp) {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: email.split('@')[0],
            is_anonymous: false,
          },
        },
      });
      error = res.error;
    } else {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = res.error;
    }

    onFinaly(error, isSignUp ? 'Cadastro realizado com sucesso!' : 'Bem-vindo de volta!');
  };

  const showEmailForm = () => {
    setView('email');
    setIsSignUp(true);
  };

  useEffect(() => {
    if (!visible) {
      setView('options');
      setIsSignUp(false);
      setLoading(false);
    }
  }, [visible]);

  const Header = () => (
    <div className="text-center w-full">
      <h2 className="text-xl font-bold">Identifique-se</h2>
      <p className="text-sm text-subtitle mt-1">
        Para interagir com os projetos, precisamos saber quem você é. Seus dados estão seguros, veja
        nossa{' '}
        <a href="/policy" className="text-primary hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );

  const BodyOptions = () => (
    <div className="flex flex-col gap-3 py-4">
      <Button
        label={
          <>
            <FaGoogle /> Entrar com Google
          </>
        }
        onClick={handleGoogleLogin}
        variant="outline"
        style="w-full justify-center py-6 text-base"
        disabled={loading}
      />

      <Button
        label={
          <>
            <FaEnvelope /> Crie um login com E-mail e Senha
          </>
        }
        onClick={showEmailForm}
        variant="secondary"
        style="w-full justify-center"
      />

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-muted px-2 text-subtitle">Ou</span>
        </div>
      </div>

      <Button
        label={
          <>
            <FaUserSecret /> Continuar como Anônimo
          </>
        }
        onClick={handleAnonymousLogin}
        variant="ghost"
        style="w-full justify-center py-6 text-base"
        disabled={loading}
      />
    </div>
  );

  const BodyEmail = () => (
    <form onSubmit={handleEmailAuth} className="flex flex-col gap-4 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" name="email" placeholder="seu@email.com" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Senha</label>
        <Input type="password" name="password" placeholder="••••••••" minLength={6} required />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <Button
          type="submit"
          label={loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          style="w-full justify-center"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setView('options')}
          className="text-xs text-center text-subtitle hover:underline mt-2"
        >
          Voltar para opções
        </button>
      </div>

      <p className="text-xs text-center text-subtitle">
        {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
        <span
          className="text-primary cursor-pointer hover:underline font-bold"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Faça Login' : 'Cadastre-se'}
        </span>
      </p>
    </form>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      header={<Header />}
      body={view === 'options' ? <BodyOptions /> : <BodyEmail />}
      size="md"
      hideCancelButton
      hideOkButton
      closabe
    />
  );
};

export default AuthModal;
