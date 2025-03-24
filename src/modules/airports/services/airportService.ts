import { Airport, AirportDetails } from '../types';

export const airportService = {
  async searchAirports(query: string): Promise<Airport[]> {
    const response = await fetch(`/api/airports/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch airports');
    }
    return response.json();
  },

  async getAirportDetails(id: string): Promise<AirportDetails> {
    const response = await fetch(`/api/airports/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch airport details');
    }
    return response.json();
  },

  async getNearbyAirports(latitude: number, longitude: number, radius: number = 100): Promise<Airport[]> {
    const response = await fetch(
      `/api/airports/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch nearby airports');
    }
    return response.json();
  }
}; 