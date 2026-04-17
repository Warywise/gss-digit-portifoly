'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProjectsModel from '@/types/projects';
import { useTranslations } from 'next-intl';

interface SearcInputProps {
  handleSearch: Dispatch<SetStateAction<ProjectsModel[]>>;
  projectsData: ProjectsModel[];
}

const SearchInput: React.FC<SearcInputProps> = ({ handleSearch, projectsData }) => {
  const t = useTranslations('Projects');
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm || searchTerm !== null) {
      const filteredProjects = projectsData.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.techStacks.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      );

      handleSearch(filteredProjects);
    }
  }, [searchTerm, handleSearch, projectsData]);

  return (
    <div className="relative w-[75%] md:w-64 place-self-end row-start-1 col-start-3 mr-1">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder h-3 w-3 md:h-4 md:w-4" />
      <input
        placeholder={t('searchPlaceholder')}
        className={`search-input ${searchTerm ? 'w-full!' : ''}`}
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
