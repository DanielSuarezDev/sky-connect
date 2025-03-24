'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';

import { SearchScreenContainer } from './search-screen-container';

export const SearchScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    searchTerm,
    setSearchTerm,
    loading,
    error,
    getCurrentPageAirports,
    totalPages,
    currentPage,
    setCurrentPage,
    fetchAirports,
    shouldRefetchData,
    totalItems
  } = useAirportStore();

  useEffect(() => {
    if (shouldRefetchData()) {
      fetchAirports();
    }
  }, [fetchAirports, shouldRefetchData]);

  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  const airports = getCurrentPageAirports();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SearchScreenContainer
      loading={loading}
      error={error || ''}
      getCurrentPageAirports={getCurrentPageAirports}
      totalPages={totalPages}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      airports={airports}
      searchTerm={searchTerm}
      totalItems={totalItems}
      router={router}
    />
  );
}
