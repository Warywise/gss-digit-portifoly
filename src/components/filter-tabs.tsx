import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import projectsData from '@/PROJECTS_DATA';
import Button from './ui/button';

interface FilterTabsProps {
  handleFilter: Dispatch<
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

const FilterTabs: React.FC<FilterTabsProps> = ({ handleFilter }) => {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const filteredProjects = projectsData.filter((project) => {
      return filter === 'Deployed' ? project.deployed : project;
    });

    handleFilter(filteredProjects);
  }, [filter, handleFilter]);

  return (
    <div className="block row-start-2">
      <div className="mb-6 inline-flex items-center justify-center rounded-md bg-muted p-1">
        <Button
          style={filter === 'All' ? 'bg-placeholder/50 text-foreground' : ''}
          variant="ghost"
          label="All"
          onClick={() => setFilter('All')}
          size="sm"
        />
        <Button
          style={filter === 'Deployed' ? 'bg-placeholder/50 text-foreground' : ''}
          variant="ghost"
          label="Deployed"
          onClick={() => setFilter('Deployed')}
          size="sm"
        />
      </div>
    </div>
  );
};

export default FilterTabs;
