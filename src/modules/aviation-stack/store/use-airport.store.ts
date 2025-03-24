/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { aviationService } from '@/modules/aviation-stack/services/aviation.service';
import { Airport } from '@/modules/aviation-stack/types/aviation.types';

interface AirportStore {
  airports: Airport[];
  filteredAirports: Airport[];
  selectedAirport: Airport | null;

  loading: boolean;
  error: string | null;

  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  lastFetchTime: number | null;
  cacheDuration: number;

  fetchAirports: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  getCurrentPageAirports: () => Airport[];
  getAirportByCode: (code: string) => Airport | null;
  shouldRefetchData: () => boolean;
  
  fetchAirportDetails: (iataCode: string) => Promise<void>;
}

export const useAirportStore = create<AirportStore>((set, get) => ({
  airports: [],
  filteredAirports: [],
  selectedAirport: null,
  loading: false,
  error: null,

  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 1,
  lastFetchTime: null,
  cacheDuration: 5 * 60 * 1000,

  shouldRefetchData: () => {
    const { lastFetchTime, cacheDuration } = get();
    if (!lastFetchTime) return true;
    return Date.now() - lastFetchTime > cacheDuration;
  },

  fetchAirports: async () => {
    const { shouldRefetchData } = get();
    
    if (!shouldRefetchData() && get().airports.length > 0) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await aviationService.getAirports(1);
      const all = response.data || [];

      const totalItems = all.length;
      const itemsPerPage = get().itemsPerPage;
      const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

      set({
        airports: all,
        filteredAirports: all,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: 1,
        lastFetchTime: Date.now()
      });
    } catch (error: any) {
      console.error('Error fetching airports:', error);
      set({ error: error.message || 'Failed to fetch airports' });
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (term) => {
    const { airports, itemsPerPage } = get();

    const q = term.toLowerCase();
    let filtered = airports;
    if (q.length > 0) {
      filtered = airports.filter((airport) =>
        airport.iata_code?.toLowerCase().includes(q) ||
        airport.icao_code?.toLowerCase().includes(q) ||
        airport.airport_name?.toLowerCase().includes(q) ||
        airport.city_name?.toLowerCase().includes(q)
      );
    }

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    set({
      searchTerm: term,
      filteredAirports: filtered,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: 1
    });
  },

  setCurrentPage: (page) => {
    const { totalPages } = get();
    const newPage = Math.max(1, Math.min(page, totalPages));
    set({ currentPage: newPage });
  },

  getCurrentPageAirports: () => {
    const { filteredAirports, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAirports.slice(startIndex, endIndex);
  },

  getAirportByCode: (code: string) => {
    const { airports } = get();
    const codeLC = code.toLowerCase();
    return airports.find(
      (airport) =>
        airport.iata_code?.toLowerCase() === codeLC ||
        airport.icao_code?.toLowerCase() === codeLC
    ) || null;
  },
  
  fetchAirportDetails: async (iataCode: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/airports/${iataCode}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        set({ selectedAirport: data[0] });
      } else {
        set({ error: 'Airport not found' });
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch airport details';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  }
}));
