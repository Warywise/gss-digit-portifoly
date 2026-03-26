import { Card, CardContent, InfoCard } from '@/components/ui/card';
import { JSX } from 'react';
import Link from 'next/link';
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapLocationDot,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa6';
import ContactUsForm from '@/components/contact-us-form';
import { useTranslations } from 'next-intl';

const SocialItem = ({ icon, link }: { link: string; icon: JSX.Element }) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-hover hover:bg-primary hover:text-muted transition-colors"
  >
    {icon}
  </Link>
);

const ContactUsPage = () => {
  const t = useTranslations('Contact');

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">{t('letsConnect')}</h2>
          <p className="text-subtitle">{t('intro')}</p>

          <div className="space-y-4 mt-8">
            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaEnvelope size={18} />}
                  title={t('emailLabel')}
                  label="g_santanna@outlook.com"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaPhone size={18} />}
                  title={t('phoneLabel')}
                  label="55 (21) 97249-9255"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaMapLocationDot size={18} />}
                  title={t('locationLabel')}
                  label={t('locationValue')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-medium mb-3">{t('socialMedia')}</h3>
                <div className="flex space-x-4">
                  <SocialItem
                    icon={<FaLinkedin size={18} />}
                    link="https://www.linkedin.com/in/g-s-s"
                  />
                  <SocialItem icon={<FaGithub size={18} />} link="https://github.com/Warywise" />
                  <SocialItem
                    icon={<FaWhatsapp size={18} />}
                    link={`https://wa.me/5521972499255?text=${encodeURIComponent(t('whatsappText'))}`}
                  />
                  <SocialItem
                    icon={<FaInstagram size={18} />}
                    link="https://www.instagram.com/gustavo.santnn"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <ContactUsForm />
      </main>
    </div>
  );
};

export default ContactUsPage;
