'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface SearcInputProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearcInputProps> = ({ searchTerm, setSearchTerm }) => {
  const t = useTranslations('Projects');

  return (
    <div className="relative w-[75%] md:w-64 place-self-end row-start-1 col-start-3 mr-1">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder h-3 w-3 md:h-4 md:w-4" />
      <input
        placeholder={t('searchPlaceholder')}
        className={`search-input ${searchTerm ? 'w-full!' : ''}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
