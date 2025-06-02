'use client';
import Profile from '@/components/profile';
import ProjectCard from '@/components/project-card';
import projectsData from '@/PROJECTS_DATA';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_5fr] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <Profile />
      <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
