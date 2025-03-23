/* eslint-disable @typescript-eslint/no-explicit-any */
import FlyIcon from "@/assets/icons/fly";
import Image from "next/image";
import React, { FC } from "react";

interface Airport {
    airport: {
        id?: string;
        airport_name: string;
        country_name: string;
        iata_code: string;
    }
    router?: any;
}

export const CardItems: FC<Airport> = ({ airport, router }) => {
    return (
        <div
            onClick={() => router.push(`/airport/${airport.iata_code}`)}
            className="relative overflow-hidden rounded-lg bg-[#1a2942] shadow-lg cursor-pointer text-left">
            <div className="flex h-full ">
                <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                        <h2 className="mb-1 text-lg font-semibold text-white">{airport.airport_name}</h2>
                        <p className="text-sm text-gray-300">{airport.country_name}</p>
                    </div>
                    <div className="mt-4">
                        <span className="text-4xl font-bold text-[#006fee]">{airport.iata_code}</span>
                    </div>
                </div>
                <div className="relative min-h-[180px] w-1/2 overflow-hidden">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <Image src="/airplane.png?height=400&width=600" alt="Airplane silhouette" fill className="object-cover opacity-30" />
                    <div className="absolute right-4 top-4 flex items-center justify-center rounded-full bg-[#006fee]">
                        <FlyIcon className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
};

