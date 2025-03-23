import { Airport } from '@/types/aviation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AirportMap } from './AirportMap';

interface AirportLocationProps {
  airport: Airport;
}

export function AirportLocation({ airport }: AirportLocationProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>Geographical coordinates and location data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Latitude</h3>
            <p className="text-lg">{airport.latitude}°</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Longitude</h3>
            <p className="text-lg">{airport.longitude}°</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Geoname ID</h3>
            <p className="text-lg">{airport.geoname_id}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Map View</CardTitle>
          <CardDescription>Visual location on the map</CardDescription>
        </CardHeader>
        <CardContent className="aspect-square">
          <AirportMap airport={airport} />
        </CardContent>
      </Card>
    </div>
  );
} 