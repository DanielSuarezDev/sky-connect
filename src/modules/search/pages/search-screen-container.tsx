/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardItems } from '@/components/blocks/card-items';
import { Pagination } from '@/components/blocks/pagination';
import { HeaderSearch } from '@/components/blocks/header-search';
import { Airport } from '@/modules/aviation-stack/types/aviation.types';

export const SearchScreenContainer = ({
    loading,
    error,
    totalPages,
    currentPage,
    handlePageChange,
    airports,
    searchTerm,
    totalItems,
    router
}: {
    loading: boolean;
    error: string;
    getCurrentPageAirports: () => Airport[];
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
    airports: Airport[];
    searchTerm: string;
    totalItems: number;
    router: any;
}) => {
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
    <main className="p-4 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <HeaderSearch />

        <div className="text-center mb-4">
          <p className="text-blue-500 dark:text-blue-500">
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
