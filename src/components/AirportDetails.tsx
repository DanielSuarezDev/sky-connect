import React, { useEffect, useState } from 'react';
import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';
import { Airport } from '@/modules/aviation-stack/types/aviation.types';

interface AirportDetailsProps {
  iataCode: string;
}

export const AirportDetails: React.FC<AirportDetailsProps> = ({ iataCode }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'location' | 'timezone'>('general');
  const { selectedAirport, loading, error, fetchAirportDetails } = useAirportStore();

  useEffect(() => {
    fetchAirportDetails(iataCode);
  }, [iataCode, fetchAirportDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!selectedAirport) {
    return (
      <div className="text-center p-4">
        Airport not found
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General Information' },
    { id: 'location', label: 'Location' },
    { id: 'timezone', label: 'Time Zone' },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Airport Name</h3>
              <p>{selectedAirport.airport_name}</p>
            </div>
            <div>
              <h3 className="font-semibold">IATA Code</h3>
              <p>{selectedAirport.iata_code}</p>
            </div>
            <div>
              <h3 className="font-semibold">ICAO Code</h3>
              <p>{selectedAirport.icao_code}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{selectedAirport.phone_number || 'Not available'}</p>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Country</h3>
              <p>{selectedAirport.country_name} ({selectedAirport.country_iso2})</p>
            </div>
            <div>
              <h3 className="font-semibold">City</h3>
              <p>{selectedAirport.city_name} ({selectedAirport.city_iata_code})</p>
            </div>
            <div>
              <h3 className="font-semibold">Coordinates</h3>
              <p>Latitude: {selectedAirport.latitude}</p>
              <p>Longitude: {selectedAirport.longitude}</p>
            </div>
          </div>
        );
      case 'timezone':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Time Zone</h3>
              <p>{selectedAirport.timezone}</p>
            </div>
            <div>
              <h3 className="font-semibold">GMT Offset</h3>
              <p>{selectedAirport.gmt}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{selectedAirport.airport_name}</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}; 