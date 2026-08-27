import { FaUserSecret } from 'react-icons/fa6';
import Button from '../ui/button';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface AnonymousExplanationProps {
  onCancel: () => void;
  loading: boolean;
  onConfirm: () => void;
  changeNickname: () => void;
  displayName?: string;
}

const AnonymousExplanation: React.FC<AnonymousExplanationProps> = ({
  onCancel,
  loading,
  onConfirm,
  changeNickname,
  displayName,
}) => {
  const t = useTranslations('AuthModal');

  useEffect(() => {
    changeNickname();
  }, [changeNickname]);

  return (
    <div className="flex flex-col gap-4 py-4 text-center">
      <article className="bg-secondary/25 p-4 rounded-lg flex flex-col items-center gap-2">
        <FaUserSecret size={32} className="text-primary" />
        <h3 className="font-bold text-lg">{t('anonymousMode')}</h3>
        <p className="text-sm text-text/70 subtitle text-justify px-2 mb-2">
          {t('anonymousP1')}
          <strong className="font-extrabold">{t('anonymousP1Strong')}</strong>
          {t('anonymousP1End')}
          <span className="block h-3" />
          {t('anonymousP2')}
        </p>

        <div className="bg-secondary/10 p-4 rounded-sm">
          <h3 className="text-sm font-medium">{t('anonymousUsernameTitle')}</h3>
          <h4 className="mt-1 font-bold text-md font-mono">{displayName}</h4>
          <Button
            label={t('generateOtherNameBtn')}
            variant="secondary"
            size="sm"
            style="mt-2"
            onClick={changeNickname}
            disabled={loading}
          />
        </div>
      </article>

      <div className="flex gap-3 mt-2">
        <Button
          label={t('cancelBtn')}
          variant="outline"
          style="flex-1 justify-center"
          onClick={onCancel}
        />
        <Button
          label={loading ? t('creatingBtn') : t('understandCreateBtn')}
          variant="default"
          style="flex-1 justify-center"
          onClick={onConfirm}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default AnonymousExplanation;
