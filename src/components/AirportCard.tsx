import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Airport } from '@/types/aviation';
import { useAirportStore } from '@/store/useAirportStore';

interface AirportCardProps {
  airport: Airport;
}

export function AirportCard({ airport }: AirportCardProps) {
  const router = useRouter();
  const setSelectedAirport = useAirportStore((state) => state.setSelectedAirport);

  const handleClick = () => {
    setSelectedAirport(airport);
    router.push(`/airport/${airport.iata_code}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-xl">{airport.airport_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">IATA:</span>
            <span className="text-sm">{airport.iata_code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">ICAO:</span>
            <span className="text-sm">{airport.icao_code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Location:</span>
            <span className="text-sm">{airport.city_name}, {airport.country_name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 