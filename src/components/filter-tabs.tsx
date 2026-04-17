import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from './ui/button';
import ProjectsModel from '@/types/projects';
import { useTranslations } from 'next-intl';

interface FilterTabsProps {
  handleFilter: Dispatch<SetStateAction<ProjectsModel[]>>;
  projectsData: ProjectsModel[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ handleFilter, projectsData }) => {
  const t = useTranslations('Projects');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const filteredProjects = projectsData.filter((project) => {
      return filter === 'Deployed' ? project.deployed : project;
    });

    handleFilter(filteredProjects);
  }, [filter, handleFilter, projectsData]);

  return (
    <div className="block row-start-2">
      <div className="mb-6 inline-flex items-center justify-center rounded-md bg-muted p-1">
        <Button
          style={filter === 'All' ? 'bg-placeholder/50 text-foreground' : ''}
          variant="ghost"
          label={t('filterAll')}
          onClick={() => setFilter('All')}
          size="sm"
        />
        <Button
          style={filter === 'Deployed' ? 'bg-placeholder/50 text-foreground' : ''}
          variant="ghost"
          label={t('filterDeployed')}
          onClick={() => setFilter('Deployed')}
          size="sm"
        />
      </div>
    </div>
  );
};

export default FilterTabs;
