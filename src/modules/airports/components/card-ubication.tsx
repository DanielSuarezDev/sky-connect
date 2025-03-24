"use client"
import Image from "next/image";
import React from "react";
import { Airport } from "@/modules/aviation-stack/types/aviation.types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export const CardUbication = ({ airport }: { airport: Airport }) => {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey:
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "tu_api_key",
        libraries: ["places"],
    });

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const center = {
        lat: parseFloat(airport.latitude),
        lng: parseFloat(airport.longitude)
    };

    if (!isLoaded) return <div>Cargando...</div>;

    return (
        <div className="space-y-4">
            <div
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #3F495F, #0E1934)',
                }}
                className="relative overflow-hidden text-left rounded-lg border-1 border-white">
                <div className="flex">
                    <div className="w-full lg:w-1/2 space-y-4 z-10 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                <Image src="/ubication.svg" alt="Info" width={30} height={30} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#006fee]">Ubicación</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex">
                                <span className="text-white font-semibold mr-2 text-lg">Latitud:</span>
                                <span className="text-white text-lg">{airport.latitude}</span>
                            </div>

                            <div className="flex">
                                <span className="text-white font-semibold mr-2 text-lg">Longitud:</span>
                                <span className="text-white text-lg">{airport.longitude}</span>
                            </div>

                            <div className="flex">
                                <span className="text-white font-semibold mr-2 text-lg">Geoname ID:</span>
                                <span className="text-white text-lg">{airport.geoname_id}</span>
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

            <div className="space-y-4">
                <div className="mt-6 aspect-video rounded-lg overflow-hidden shadow-lg">

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        <Marker
                            label={{
                                text: airport.airport_name,
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                className: 'absolute -top-6 -left-20'
                            }}                            
                            animation={google.maps.Animation.DROP}
                            clickable
                            icon={{
                                url: "/airplane-map.png",
                                scaledSize: new google.maps.Size(160, 70),
                                anchor: new google.maps.Point(20, 50),
                                labelOrigin: new google.maps.Point(130, 50),
                            }}
                            position={{ lat: parseFloat(airport.latitude), lng: parseFloat(airport.longitude) }} />
                    </GoogleMap>

                </div>
            </div>
        </div>
    )
}