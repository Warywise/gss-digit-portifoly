'use client';
import { useState } from 'react';
import Profile from '@/components/profile';
import ProjectCard from '@/components/project-card';
import projectsData from '@/PROJECTS_DATA';
import { FaSearch } from 'react-icons/fa';
import { FaRegCircleQuestion } from 'react-icons/fa6';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projectsData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStacks.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="grid items-start justify-items-center min-h-screen p-8 gap-16 sm:p-16">
      <Profile />
      <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
          <h2 className="text-2xl font-bold">Projects</h2>

          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder h-3 w-3 md:h-4 md:w-4" />
            <input
              placeholder="Search projects..."
              className={`search-input ${searchTerm ? 'w-full!' : ''}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-10/12 md:w-full">
          {(searchTerm ? filteredProjects : projectsData).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {searchTerm && !filteredProjects.length && (
            <h4 className="text-lg flex gap-4 items-center">
              <FaRegCircleQuestion /> No projects found
            </h4>
          )}
        </div>
      </main>
    </div>
  );
}
