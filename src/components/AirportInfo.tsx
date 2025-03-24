import { Airport } from '@/modules/aviation-stack/types/aviation.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AirportInfoProps {
  airport: Airport;
}

export function AirportInfo({ airport }: AirportInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Basic details about the airport</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">IATA Code</h3>
            <p className="text-lg">{airport.iata_code}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">ICAO Code</h3>
            <p className="text-lg">{airport.icao_code}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Country</h3>
            <p className="text-lg">{airport.country_name} ({airport.country_iso2})</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">City IATA</h3>
            <p className="text-lg">{airport.city_iata_code || 'N/A'}</p>
          </div>
        </div>
        {airport.phone_number && (
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Phone</h3>
            <p className="text-lg">{airport.phone_number}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 