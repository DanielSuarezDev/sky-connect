export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface AirportLocation {
  latitude: number;
  longitude: number;
  name: string;
  code: string;
}

export interface AirportDetails {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  runways: number;
}

export type TabType = "general" | "location" | "timezone" | "statistics"

export interface AirportPageProps {
  params: {
    iata: string
  }
}


export * from './index'; 