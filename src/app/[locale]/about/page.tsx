import techsData from '@/TECHS_DATA';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface ExperienceProps {
  position: string;
  startAt: string;
  endAt: string | null;
  company: string;
  jobDescription: string;
}

const AboutPage = () => {
  const t = useTranslations('About');
  const locale = useLocale();

  const jobsData: ExperienceProps[] = [
    {
      position: t('jobs.invenzi.position'),
      startAt: t('jobs.invenzi.startAt'),
      endAt: null,
      company: t('jobs.invenzi.company'),
      jobDescription: t('jobs.invenzi.jobDescription'),
    },
    {
      position: t('jobs.w3lcome.position'),
      startAt: t('jobs.w3lcome.startAt'),
      endAt: t('jobs.w3lcome.endAt'),
      company: t('jobs.w3lcome.company'),
      jobDescription: t('jobs.w3lcome.jobDescription'),
    },
    {
      position: t('jobs.pontuax.position'),
      startAt: t('jobs.pontuax.startAt'),
      endAt: t('jobs.pontuax.endAt'),
      company: t('jobs.pontuax.company'),
      jobDescription: t('jobs.pontuax.jobDescription'),
    },
  ];

  const TechCard = ({ tag, techs }: { tag: string; techs: string[] }) => (
    <article className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-medium mb-2">{tag}</h3>
      <ul className="text-sm space-y-1 text-subtitle">
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );

  const ExperienceCard = (job: ExperienceProps) => (
    <div className={`border-l-2 ${job.endAt ? 'border-muted' : 'border-primary'} pl-4`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{job.position}</h3>
        <span className="text-sm text-subtitle">{`${job.startAt} - ${job.endAt || t('present')}`}</span>
      </div>
      <p className="text-sm text-subtitle mb-1">{job.company}</p>
      <p className="text-sm">{job.jobDescription}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-1">
        {/* Profile Column */}
        <div className="md:col-span-1">
          <article className="flex flex-col justify-between rounded-lg overflow-hidden shadow-sm border border-border animate-fade-in post-animation max-w-sm p-1">
            <div className="bg-primary/10 pt-8 pb-4 px-4 grid justify-center rounded-t-md">
              <div className="relative contain-content rounded-full size-[10em] inset-ring ring-2 ring-muted shadow-lg/40 shadow-foreground">
                <Image
                  src="/profile_pic.png"
                  alt="Gustavo Sant'Anna"
                  style={{ objectFit: 'cover' }}
                  fill
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{"Gustavo Sant'Anna"}</h2>
              <p className="text-subtitle">{t('role')}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">{t('locationLabel')}</h3>
                  <p>{t('locationValue')}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">{t('emailLabel')}</h3>
                  <p>g_santanna@outlook.com</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">{t('languagesLabel')}</h3>
                  <p>{t('languagesValue')}</p>
                </div>

                {locale === 'pt' && (
                  <Link
                    href="/Curriculo_Gustavo_SantAnna.pdf"
                    download="currículo-gustavo-santanna.pdf"
                  >
                    <Button label={t('downloadResume')} style="w-full" />
                  </Link>
                )}
                {locale === 'en' && (
                  <Link href="/Gustavo_SantAnna_Resume.pdf" download="gustavo-santanna-resume.pdf">
                    <Button label={t('downloadResume')} style="w-full" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </div>

        {/* Content Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Bio Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('biographyTitle')}</h2>
            <div className="prose max-w-none">
              <p className="mb-3">{t('biographyP1')}</p>
              <p className="mb-3">{t('biographyP2')}</p>
              <p>{t('biographyP3')}</p>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('skillsTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techsData.map((data) => (
                <TechCard key={data.tag} tag={data.tag} techs={data.techs} />
              ))}
              <TechCard
                key="Soft Skills"
                tag="Soft Skills"
                techs={[
                  t('softSkills.adaptability'),
                  t('softSkills.agileMethodologies'),
                  t('softSkills.communication'),
                  t('softSkills.empathy'),
                  t('softSkills.problemSolving'),
                  t('softSkills.teamwork'),
                ]}
              />
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('experienceTitle')}</h2>

            <div className="space-y-6">
              {jobsData.map((job, ind) => (
                <ExperienceCard key={`${job.company}-${ind}`} {...job} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
