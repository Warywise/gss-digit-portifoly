'use client';
import { useState } from 'react';
import Profile from '@/components/profile';
import ProjectCard from '@/components/project-card';
import projectsData from '@/PROJECTS_DATA';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import SearchInput from '@/components/search-input';
import FilterTabs from '@/components/filter-tabs';

export default function Home() {
  const [projects, setProjects] = useState(projectsData);

  return (
    <div className="grid items-start justify-items-center min-h-screen p-8 gap-16 sm:p-16">
      <Profile />
      {/* TODO: ajustar grid em telas sm */}
      <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <h2 className="text-2xl font-bold">Projects</h2>

          <SearchInput handleSearch={setProjects} />

          <FilterTabs handleFilter={setProjects} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-10/12 md:w-full">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {!projects.length && (
            <h4 className="text-lg flex gap-4 items-center">
              <FaRegCircleQuestion /> No projects found
            </h4>
          )}
        </div>
      </main>
    </div>
  );
}
