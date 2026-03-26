import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

const PolicyPage = () => {
  const t = useTranslations('Policy');

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
      <main className="space-y-8 max-w-4xl mx-auto">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy')}</h2>
          <p className="text-sm text-subtitle mb-4">{t('effectiveDate')}</p>
          <p className="text-base text-text-800 mb-4">
            {t('introPart1')}{' '}
            <Link
              href="https://gss-digit.vercel.app"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://gss-digit.vercel.app
            </Link>
            {t('introPartPwrd')}{' '}
            <Link
              href="https://vercel.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </Link>
            .
          </p>
          <h3 className="text-lg font-medium mb-2">{t('infoWeCollect')}</h3>
          <p className="text-base text-text-800 mb-4">{t('infoCollectDesc')}</p>
          <ul className="list-disc list-inside mb-4">
            <li>{t('infoGoogle')}</li>
            <li>{t('infoDirect')}</li>
          </ul>
          <p className="text-base text-text-800 mb-4">{t('infoCollectEnd')}</p>
          <h3 className="text-lg font-medium mb-2">{t('howWeUse')}</h3>
          <p className="text-base text-text-800 mb-4">{t('howWeUseDesc')}</p>
          <ul className="list-disc list-inside mb-4">
            <li>{t('useDisplay')}</li>
            <li>{t('useAuth')}</li>
          </ul>
          <h3 className="text-lg font-medium mb-2">{t('dataSec')}</h3>
          <p className="text-base text-text-800 mb-4">
            {t('dataSecDesc1')}{' '}
            <Link
              className="text-primary hover:underline"
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase
            </Link>
            {t('dataSecDesc2')}
          </p>
          <h3 className="text-lg font-medium mb-2">{t('yourRights')}</h3>
          <p className="text-base text-text-800 mb-4">{t('yourRightsDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService')}</h2>
          <h3 className="text-lg font-medium mb-2">{t('userConduct')}</h3>
          <p className="text-base text-text-800 mb-4">{t('userConductDesc')}</p>
          <ul className="list-disc list-inside mb-4">
            <li>{t('conductSpam')}</li>
            <li>{t('conductDefamatory')}</li>
            <li>{t('conductHateful')}</li>
            <li>{t('conductUnlawful')}</li>
          </ul>
          <p className="text-base text-text-800 mb-4">{t('conductReserve')}</p>
          <h3 className="text-lg font-medium mb-2">{t('intellectualProperty')}</h3>
          <p className="text-base text-text-800 mb-4">{t('ipDesc')}</p>
          <h3 className="text-lg font-medium mb-2">{t('disclaimer')}</h3>
          <p className="text-base text-text-800 mb-4">{t('disclaimerDesc')}</p>
          <h3 className="text-lg font-medium mb-2">{t('limitationLiability')}</h3>
          <p className="text-base text-text-800 mb-4">{t('limitationDesc')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('contactUs')}</h2>
          <p className="text-base text-text-800">{t('contactDesc')}</p>
          <p className="text-base text-text-800">
            {t('emailLabel')}{' '}
            <a href="mailto:g_santanna@outlook.com" className="text-primary hover:underline">
              g_santanna@outlook.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default PolicyPage;
