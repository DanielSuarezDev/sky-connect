import { Airport } from '../types';

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const formatAirportName = (airport: Airport): string => {
  return `${airport.name} (${airport.code}) - ${airport.city}, ${airport.country}`;
};

export const sortAirportsByDistance = (
  airports: Airport[],
  referenceLat: number,
  referenceLon: number
): Airport[] => {
  return [...airports].sort((a, b) => {
    const distA = calculateDistance(referenceLat, referenceLon, a.latitude, a.longitude);
    const distB = calculateDistance(referenceLat, referenceLon, b.latitude, b.longitude);
    return distA - distB;
  });
}; 