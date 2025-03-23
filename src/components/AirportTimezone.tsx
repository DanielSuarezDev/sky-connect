import { useEffect, useState } from 'react';
import { Airport } from '@/types/aviation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AirportTimezoneProps {
  airport: Airport;
}

export function AirportTimezone({ airport }: AirportTimezoneProps) {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateLocalTime = () => {
      try {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: airport.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        setLocalTime(date.toLocaleTimeString('en-US', options));
      } catch (error) {
        setLocalTime('Unable to determine local time');
      }
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);

    return () => clearInterval(interval);
  }, [airport.timezone]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timezone Information</CardTitle>
        <CardDescription>Time zone and current local time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Timezone</h3>
            <p className="text-lg">{airport.timezone}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">GMT Offset</h3>
            <p className="text-lg">{airport.gmt}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Current Local Time</h3>
          <p className="text-2xl font-mono">{localTime}</p>
        </div>
      </CardContent>
    </Card>
  );
} 