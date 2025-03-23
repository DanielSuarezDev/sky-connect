import { AviationStackResponse } from '@/types/aviation';

export const aviationService = {
  getAirports: async (page: number, query?: string): Promise<AviationStackResponse> => {
    console.log('Fetching airports:', { page, query });
    
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: '6000'
      });

      if (query) {
        searchParams.append('q', query);
      }

      const response = await fetch(`/api/airports?${searchParams.toString()}`);
      
      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);
        throw new Error(error.error || 'Failed to fetch airports');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching airports:', error);
      throw error;
    }
  },

  getAirportDetails: async (iataCode: string): Promise<AviationStackResponse> => {
    try {
      const searchParams = new URLSearchParams({
        q: iataCode
      });

      const response = await fetch(`/api/airports?${searchParams}`);
      
      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);
        throw new Error(error.error || 'Failed to fetch airport details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching airport details:', error);
      throw error;
    }
  }
}; 