'use client';

import { useState } from 'react';
import SearchInput from './search-input';
import FilterTabs from './filter-tabs';
import ProjectCard from './project-card';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import ProjectsModel from '@/types/projects';
import { useTranslations } from 'next-intl';

interface ProjectsMainPageProps {
  projectsData: ProjectsModel[];
}

export default function ProjectsMainPage({ projectsData }: ProjectsMainPageProps) {
  const t = useTranslations('Projects');
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    const matchFilter = filter === 'Deployed' ? project.deployed : true;

    const term = searchTerm.toLowerCase();
    const matchSearch =
      project.name.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.techStacks.some((tech) => tech.toLowerCase().includes(term));

    return matchFilter && matchSearch;
  });

  return (
    <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full">
      <div className="mb-6 grid grid-cols-2 gap-4 w-full">
        <h2 className="text-xl md:text-2xl font-bold">{t('title')}</h2>

        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterTabs filter={filter} setFilter={setFilter} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-10/12 md:w-full">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {!filteredProjects.length && (
          <h4 className="text-lg flex gap-4 items-center">
            <FaRegCircleQuestion /> {t('noProjectsFound')}
          </h4>
        )}
      </div>
    </main>
  );
}
