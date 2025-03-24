import { Airport } from '@/modules/aviation-stack/types/aviation.types';
import Image from 'next/image';
import React from 'react';

export const CardDetail = ({ airport }: { airport: Airport }) => {
    return (
        <div 
        style={{
            backgroundImage: 'linear-gradient(to bottom, #3F495F, #0E1934)',
          }}
        className="relative overflow-hidden text-left rounded-lg border-1 border-white">
            <div className="flex">
                <div className="w-full lg:w-1/2 space-y-4 z-10 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                            <Image src="/info-circle.svg" alt="Info" width={30} height={30} />
                        </div>
                        <h2 className="text-2xl font-bold text-[#006fee]">Información General</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex">
                            <span className="text-white font-semibold mr-2 text-lg">Código IATA:</span>
                            <span className="text-white text-lg">{airport.iata_code}</span>
                        </div>

                        <div className="flex">
                            <span className="text-white font-semibold mr-2 text-lg">Código ICAO:</span>
                            <span className="text-white text-lg">{airport.icao_code}</span>
                        </div>

                        <div className="flex">
                            <span className="text-white font-semibold mr-2 text-lg">País:</span>
                            <span className="text-white text-lg">{airport.country_name}</span>
                        </div>

                        <div className="flex">
                            <span className="text-white font-semibold mr-2 text-lg">Ciudad IATA:</span>
                            <span className="text-white text-lg">{airport.city_name}</span>
                        </div>

                        <div className="flex">
                            <span className="text-white font-semibold mr-2 text-lg">Teléfono:</span>
                            <span className="text-white text-lg">{airport.phone_number || "No disponible"}</span>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src="/airplane.png"
                            alt="Airplane silhouette"
                            fill
                            className="object-contain opacity-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};