import { FormEvent } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import { useTranslations } from 'next-intl';

interface LoginEmailProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  setIsSignUp: (value: boolean) => void;
  loading?: boolean;
  isSignUp?: boolean;
}

const LoginEmail: React.FC<LoginEmailProps> = ({
  onSubmit,
  loading,
  onCancel,
  isSignUp,
  setIsSignUp,
}) => {
  const t = useTranslations('AuthModal');

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-4">
      {isSignUp ? (
        <h3 className="m-auto font-bold text-lg">{t('signUpTab')}</h3>
      ) : (
        <h3 className="m-auto font-bold text-lg">{t('signInTab')}</h3>
      )}
      {isSignUp && (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('displayNameLabel')}</label>
          <Input
            type="text"
            name="display_name"
            placeholder={t('displayNamePlaceholder')}
            minLength={3}
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('emailLabel')}</label>
        <Input type="email" name="email" placeholder={t('emailPlaceholder')} required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('passwordLabel')}</label>
        <Input
          type="password"
          name="password"
          placeholder={t('passwordPlaceholder')}
          minLength={6}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <Button
          type="submit"
          label={loading ? t('loadingBtn') : isSignUp ? t('createAccountBtn') : t('confirmBtn')}
          style="w-full justify-center"
          disabled={loading}
        />
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-center text-subtitle hover:underline mt-2"
        >
          {t('backToOptions')}
        </button>
      </div>

      <p className="text-sm text-center text-subtitle">
        {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
        <span
          className="text-primary cursor-pointer hover:underline font-bold"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? t('doLogin') : t('doSignUp')}
        </span>
      </p>
    </form>
  );
};

export default LoginEmail;
