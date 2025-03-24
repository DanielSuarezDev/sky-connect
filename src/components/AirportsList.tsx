'use client';

import { useEffect, useState } from 'react';
import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';
import { aviationService } from '@/modules/aviation-stack/services/aviation.service';
import { AirportCard } from './AirportCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';

export function AirportsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { airports, loading, error, setAirports, setLoading, setError } = useAirportStore();
  const ITEMS_PER_PAGE = 12; // Reduced for better card layout
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchAirports = async (page: number, search?: string) => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await aviationService.getAirports(offset, ITEMS_PER_PAGE, search);
      setAirports(response.data);
      setTotalPages(Math.ceil(response.pagination.total / ITEMS_PER_PAGE));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch airports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
    fetchAirports(1, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      fetchAirports(currentPage, debouncedSearch);
    } else {
      fetchAirports(currentPage);
    }
  }, [currentPage]);

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button
          onClick={() => fetchAirports(currentPage, debouncedSearch)}
          className="mt-4"
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        <Input
          type="search"
          placeholder="Search airports by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading airports...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {airports.map((airport) => (
              <AirportCard key={airport.iata_code} airport={airport} />
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="py-2 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 