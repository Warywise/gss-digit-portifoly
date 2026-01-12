'use client';

import { useEffect, useState } from 'react';
import SearchInput from './search-input';
import FilterTabs from './filter-tabs';
import ProjectCard from './project-card';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import ProjectDataType from '@/types/projects';

interface ProjectsMainPageProps {
  projectsData: ProjectDataType[];
}

export default function ProjectsMainPage({ projectsData }: ProjectsMainPageProps) {
  const [projects, setProjects] = useState(projectsData);

  // TODO: carregar atualização com filtros ativos
  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  return (
    <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full">
      <div className="mb-6 grid grid-cols-2 gap-4 w-full">
        <h2 className="text-xl md:text-2xl font-bold">Projects</h2>

        <SearchInput handleSearch={setProjects} projectsData={projectsData} />

        <FilterTabs handleFilter={setProjects} projectsData={projectsData} />
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
  );
}
