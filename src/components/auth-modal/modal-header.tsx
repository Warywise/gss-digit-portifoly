import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ModalHeader: React.FC = () => {
  const t = useTranslations('AuthModal');

  return (
    <section className="text-center w-full">
      <h2 className="text-xl font-bold">{t('title')}</h2>
      <p className="text-sm text-subtitle mt-1">
        {t('modalHeaderDesc1')}
        <Link href="/policy" className="text-primary hover:underline">
          {t('modalHeaderDesc2')}
        </Link>
        {t('modalHeaderDesc3')}
      </p>
    </section>
  );
};

export default ModalHeader;
