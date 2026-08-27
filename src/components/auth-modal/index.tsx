'use client';

import { createClient } from '@/lib/supabase/client';
import Modal from '@/components/ui/modal';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import { AuthError } from '@supabase/supabase-js';
import { generateRandomNickname } from '@/utils/getRandomNicknames';
import ModalHeader from './modal-header';
import AnonymousExplanation from './anonymous-explanation';
import LoginOptions from './login-options';
import LoginEmail from './email-login';
import { useTranslations } from 'next-intl';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AuthModal = ({ visible, onClose, onSuccess }: AuthModalProps) => {
  const supabase = createClient();
  const showToast = useToast();
  const t = useTranslations('AuthModal');

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'options' | 'email' | 'anonymous'>('anonymous');

  const [isSignUp, setIsSignUp] = useState(false);
  const [randomNickname, setRandomNickname] = useState('');

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

    onFinaly(error, t('loginGoogleSuccess'));
  };

  // 2. Login Anônimo
  const handleAnonymousLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          display_name: randomNickname,
          is_anonymous: true,
        },
      },
    });

    onFinaly(error, t('anonymousSuccess'));
  };

  // 3. Login/Cadastro com Email
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('display_name') as string;

    let error;

    if (isSignUp) {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
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

    if (error?.code === `user_already_exists`) {
      setIsSignUp(false);
    }

    onFinaly(error, isSignUp ? t('signUpSuccess') : t('loginSuccess'));
  };

  const showEmailForm = () => {
    setView('email');
    setIsSignUp(true);
  };

  const handleRandomNickname = useCallback(() => {
    const nickname = generateRandomNickname();
    setRandomNickname(nickname);
  }, []);

  const getBodyModal = () => {
    switch (view) {
      case 'options':
        return (
          <LoginOptions
            onGoogleLogin={handleGoogleLogin}
            onEmailLogin={showEmailForm}
            onAnonymousLogin={() => setView('anonymous')}
            loading={loading}
          />
        );
      case 'email':
        return (
          <LoginEmail
            onSubmit={handleEmailAuth}
            loading={loading}
            onCancel={() => setView('options')}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        );
      case 'anonymous':
        return (
          <AnonymousExplanation
            onCancel={() => setView('options')}
            loading={loading}
            onConfirm={handleAnonymousLogin}
            displayName={randomNickname}
            changeNickname={handleRandomNickname}
          />
        );
      default:
        return (
          <LoginOptions
            onGoogleLogin={handleGoogleLogin}
            onEmailLogin={showEmailForm}
            onAnonymousLogin={() => setView('anonymous')}
            loading={loading}
          />
        );
    }
  };

  useEffect(() => {
    if (!visible) {
      setView('options');
      setIsSignUp(false);
      setLoading(false);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      header={<ModalHeader />}
      body={getBodyModal()}
      index={9999}
      hideCancelButton
      hideOkButton
      closable
    />
  );
};

export default AuthModal;
