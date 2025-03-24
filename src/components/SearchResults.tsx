'use client';

import React, { useEffect, useState } from 'react';
import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';
import { Airport } from '@/modules/aviation-stack/types/aviation.types';
import Link from 'next/link';

interface SearchResultsProps {
  query: string;
}

const ITEMS_PER_PAGE = 10;

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { airports, loading, error, fetchAirports } = useAirportStore();

  useEffect(() => {
    const loadAirports = async () => {
      const total = await fetchAirports(currentPage, ITEMS_PER_PAGE, query);
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    };
    loadAirports();
  }, [currentPage, fetchAirports, query]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (airports.length === 0) {
    return (
      <div className="text-center p-4">
        No airports found matching your search.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {airports.map((airport: Airport) => (
          <Link 
            href={`/airport/${airport.iata_code}`} 
            key={airport.id}
            className="block transform transition-transform hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{airport.airport_name}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {airport.city_name}, {airport.country_name}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    IATA: {airport.iata_code}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {airport.timezone}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border rounded-md shadow-sm disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border rounded-md shadow-sm disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 