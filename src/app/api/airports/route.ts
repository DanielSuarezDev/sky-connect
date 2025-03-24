import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Airport } from '@/modules/aviation-stack/types/aviation.types';

const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
const BASE_URL = 'https://api.aviationstack.com/v1';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const itemsPerPage = parseInt(searchParams.get('per_page') || '10');

    if (!query) {
      const response = await fetch(
        `${BASE_URL}/airports?access_key=${API_KEY}&limit=${limit}`,
        {
          cache: 'force-cache'
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch airports API');
      }

      const data = await response.json();
      
      return NextResponse.json({
        data: data.data,
        pagination: {
          total: data.data.length,
          page,
          per_page: itemsPerPage,
          total_pages: Math.ceil(data.data.length / itemsPerPage)
        }
      });
    }
    else {
      const response = await fetch(
        `${BASE_URL}/airports?access_key=${API_KEY}&limit=${limit}`,
        {
          cache: 'force-cache'
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch airports');
      }

      const data = await response.json();
      
      const filteredData = data.data.filter((airport: Airport) => {
        const searchLower = query.toLowerCase();
        return (
          airport.airport_name.toLowerCase().includes(searchLower) ||
          airport.iata_code.toLowerCase().includes(searchLower) ||
          airport.icao_code.toLowerCase().includes(searchLower) ||
          airport.city_name.toLowerCase().includes(searchLower)
        );
      });

      return NextResponse.json({
        data: filteredData,
        pagination: {
          total: filteredData.length,
          page,
          per_page: itemsPerPage,
          total_pages: Math.ceil(filteredData.length / itemsPerPage)
        }
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch airports' },
      { status: 500 }
    );
  }
}
