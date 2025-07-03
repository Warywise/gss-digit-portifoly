'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import projectsData from '@/PROJECTS_DATA';
import { FaSearch } from 'react-icons/fa';

interface SearcInputProps {
  handleSearch: Dispatch<
    SetStateAction<
      {
        id: string;
        name: string;
        img: string;
        description: string;
        deployed: boolean;
        techStacks: string[];
        comments: number;
        likes: number;
        commits: number;
        url: string;
        gitRepo: string;
      }[]
    >
  >;
}

const SearchInput: React.FC<SearcInputProps> = ({ handleSearch }) => {
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
  }, [searchTerm, handleSearch]);

  return (
    <div className="relative w-[75%] md:w-64 place-self-end row-start-1 col-start-3 mr-1">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder h-3 w-3 md:h-4 md:w-4" />
      <input
        placeholder="Search projects..."
        className={`search-input ${searchTerm ? 'w-full!' : ''}`}
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
