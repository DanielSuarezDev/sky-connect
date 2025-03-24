import { useState, useCallback } from 'react';
import { Airport, AirportDetails } from '../types';
import { airportService } from '../services/airportService';

export const useAirports = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<AirportDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAirports = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await airportService.searchAirports(query);
      setAirports(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search airports');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAirportDetails = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const details = await airportService.getAirportDetails(id);
      setSelectedAirport(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch airport details');
    } finally {
      setLoading(false);
    }
  }, []);

  const getNearbyAirports = useCallback(async (latitude: number, longitude: number, radius?: number) => {
    try {
      setLoading(true);
      setError(null);
      const results = await airportService.getNearbyAirports(latitude, longitude, radius);
      setAirports(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch nearby airports');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    airports,
    selectedAirport,
    loading,
    error,
    searchAirports,
    getAirportDetails,
    getNearbyAirports,
  };
}; 