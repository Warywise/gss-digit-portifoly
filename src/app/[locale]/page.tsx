import Profile from '@/components/profile';
import { getProjectsStore } from '@/lib/store/projects-store';
import ProjectsMainPage from '@/components/projects-main-page';

export default async function Home() {
  const projectsData = await getProjectsStore();

  return (
    <div className="grid items-start justify-items-center min-h-screen p-4 gap-16 sm:p-16">
      <Profile />
      <ProjectsMainPage projectsData={projectsData} />
    </div>
  );
}
