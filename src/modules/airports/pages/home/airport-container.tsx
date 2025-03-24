/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { GoBack } from "@/components/ui/go-back"
import { Airport } from "@/modules/aviation-stack/types/aviation.types"

import { TabType } from "../../types"
import { TabsAirport } from "../../components/tabs-airport"

const tabs = [
    { id: "general", label: "General" },
    { id: "location", label: "Ubicación" },
    { id: "timezone", label: "Zona Horaria" },
    { id: "statistics", label: "Estadísticas" },
] as const

export const AirportContainer = ({
    airport,
    activeTab,
    setActiveTab,
    iata,
    router
}: {
    airport: Airport
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    iata: string
    router: any
}) => {

    if (!airport) {
        return (
            <main className="min-h-screen bg-[#0a1629] p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-bold text-white">Airport Not Found</h1>
                        <p className="text-[#a2a2a2]">The airport with code {iata} was not found.</p>
                        <button onClick={() => router.back()} className="text-[#006fee] hover:text-[#3f8fff]">
                            Return to Search
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-4">
            <GoBack />
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold text-[#006fee]">{airport.airport_name}</h1>
                </div>

                <div className="bg-[#3F495F]/90 rounded-lg overflow-hidden mb-6">
                    <nav className="flex" aria-label="Tabs">
                        {tabs.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id as TabType)}
                                className={`py-4 px-6 m-2 rounded-lg font-medium cursor-pointer text-center flex-1 transition-colors ${activeTab === id ? "bg-[#006fee] text-white" : "bg-[#1a2942]/80 text-[#a2a2a2] hover:bg-[#1a2942]"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <TabsAirport
                        activeTab={activeTab}
                        airport={airport}
                    />
                </div>
            </div>
        </main>
    )
}