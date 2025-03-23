'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAirportStore } from '@/store/useAirportStore';
import { Pagination } from '@/components/blocks/pagination';
import { CardItems } from '@/components/blocks/card-items';
import { HeaderSearch } from '@/components/blocks/header-search';
export default function SearchPage() {
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

  // Carga inicial de datos si es necesario
  useEffect(() => {
    if (shouldRefetchData()) {
      fetchAirports();
    }
  }, [fetchAirports, shouldRefetchData]);

  // Sincroniza el término de búsqueda con la URL
  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  // Obtiene los aeropuertos de la página actual
  const airports = getCurrentPageAirports();

  // Maneja el cambio de página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <main className="min-h-screen p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-4">
        <div className="text-center text-white p-4">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <HeaderSearch />

        <div className="text-center mb-4">
          <p className="text-blue-100">
            Se encontraron {totalItems} aeropuertos{searchTerm ? ` que coinciden con "${searchTerm}"` : ''}
          </p>
        </div>

        {airports.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center">
            <p className="text-gray-600">No airports found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {airports.map((airport) => (
              <CardItems key={airport.id} airport={airport} router={router} />
            ))}
          </div>
        )}

        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </main>
  );
}
