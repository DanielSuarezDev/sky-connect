import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Airport } from '@/modules/aviation-stack/types/aviation.types';
import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';

interface AirportsTableProps {
  airports: Airport[];
}

export function AirportsTable({ airports }: AirportsTableProps) {
  const router = useRouter();
  const setSelectedAirport = useAirportStore((state) => state.setSelectedAirport);

  const handleAirportClick = (airport: Airport) => {
    setSelectedAirport(airport);
    router.push(`/airport/${airport.iata_code}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>IATA Code</TableHead>
            <TableHead>ICAO Code</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {airports.map((airport) => (
            <TableRow
              key={airport.iata_code}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleAirportClick(airport)}
            >
              <TableCell className="font-medium">{airport.airport_name}</TableCell>
              <TableCell>{airport.iata_code}</TableCell>
              <TableCell>{airport.icao_code}</TableCell>
              <TableCell>{airport.city_name}</TableCell>
              <TableCell>{airport.country_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 