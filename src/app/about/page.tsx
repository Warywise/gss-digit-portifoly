import techsData from '@/TECHS_DATA';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface ExperienceProps {
  position: string;
  startAt: string;
  endAt: string | null;
  company: string;
  jobDescription: string;
}

const jobsData = [
  {
    position: 'Desenvolvedor de Software',
    startAt: 'Out 2024',
    endAt: null,
    company: 'Invenzi',
    jobDescription:
      'Desenvolvimento e manutenção de uma plataforma multi-idioma para controle de acesso. Atuei com diversas integrações com hardware e regras personalizadas por local. Envolvido em features novas, refatorações e melhorias contínuas.',
  },
  {
    position: 'Desenvolvedor Fullstack Jr II',
    startAt: 'Jun 2023',
    endAt: 'Out 2024',
    company: 'W3lcome',
    jobDescription:
      'Desenvolvimento de novas features e microserviços em uma plataforma multi-idioma de gerenciamento de visitas e reservas. Também trabalhei com integrações, manutenção e arquitetura de código.',
  },
  {
    position: 'Analista de Desenvolvimento Jr',
    startAt: 'Abr 2022',
    endAt: 'Mar 2023',
    company: 'PontuaX',
    jobDescription:
      'Atuação em produto voltado à pontuação por abastecimento de combustível, com alta prioridade em atualizações constantes em tempo real. Desenvolvi features, análises e refatorações, prezando pela performance e escalabilidade da aplicação.',
  },
];

const AboutPage = () => {
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
        <span className="text-sm text-subtitle">{`${job.startAt} - ${job.endAt || 'Present'}`}</span>
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
                <Image src="/profile_pic.png" alt="Gustavo Sant'Anna" fill objectFit="cover" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{"Gustavo Sant'Anna"}</h2>
              <p className="text-subtitle">Fullstack Developer</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">Location</h3>
                  <p>Nova Iguaçu, RJ</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">Email</h3>
                  <p>g_santanna@outlook.com</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-subtitle mb-1">Languages</h3>
                  <p>Portuguese (Native), English (Conversational)</p>
                </div>

                <Link href="/my_resume.pdf" download="currículo-gustavo-santanna.pdf">
                  <Button label="Download Resume" style="w-full" />
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Content Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Bio Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Biography</h2>
            <div className="prose max-w-none">
              <p className="mb-3">
                I&apos;m a full-stack developer from Brazil with over 3 years of experience building
                web and mobile applications. I specialize in Node.js, React, and TypeScript, and
                have worked with tools like PostgreSQL, AWS, React Native and others.
              </p>
              <p className="mb-3">
                Beyond code, I&apos;m a husband, a dad, and a guy who enjoys music, nature, and
                creating a positive vibe wherever I go. I value teamwork, clean communication, and
                delivering solutions that truly make a difference.
              </p>
              <p>
                Whether it&apos;s a new opportunity or just a good tech conversation, feel free to
                get in touch!
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techsData.map((data) => (
                <TechCard key={data.tag} tag={data.tag} techs={data.techs} />
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>

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
