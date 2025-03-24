export interface Airport {
  id: string;
  airport_name: string;
  iata_code: string;
  icao_code: string;
  latitude: string;
  longitude: string;
  geoname_id: string;
  timezone: string;
  gmt: string;
  phone_number: string | null;
  country_name: string;
  country_iso2: string;
  city_iata_code: string;
  city_name: string;
}

export interface AviationStackResponse {
  data: Airport[];
  pagination: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface AirportStore {
  // Estado
  airports: Airport[];
  filteredAirports: Airport[];
  selectedAirport: Airport | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;

  // Acciones básicas
  setAirports: (airports: Airport[]) => void;
  setSelectedAirport: (airport: Airport | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;

  // Acciones complejas
  fetchAirports: (page: number, query?: string) => Promise<void>;
  getAirportByCode: (code: string) => Airport | null;

  // Selectores computados
  getCurrentPageAirports: () => Airport[];
  getTotalPages: () => number;
} 