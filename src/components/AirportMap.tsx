import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Airport } from '@/types/aviation';
import { Icon } from 'leaflet';

interface AirportMapProps {
  airport: Airport;
}

export function AirportMap({ airport }: AirportMapProps) {
  // Fix for default marker icon in react-leaflet
  const icon = new Icon({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[airport.latitude, airport.longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[airport.latitude, airport.longitude]}
          icon={icon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{airport.airport_name}</p>
              <p>{airport.city_name}, {airport.country_name}</p>
              <p>IATA: {airport.iata_code}</p>
              <p>ICAO: {airport.icao_code}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
} 