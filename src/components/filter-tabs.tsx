import React, { Dispatch, SetStateAction } from 'react';
import Button from './ui/button';
import { useTranslations } from 'next-intl';

interface FilterTabsProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filter, setFilter }) => {
  const t = useTranslations('Projects');

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
