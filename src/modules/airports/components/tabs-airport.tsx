import React from "react"
import { Airport } from "@/modules/aviation-stack/types/aviation.types"
import { CardDetail } from "./card-detail"
import { CardUbication } from "./card-ubication"
import { TimeZone } from "./time-zone"
import { Info } from "lucide-react"

export const TabsAirport = ({
    activeTab,
    airport
}: {
    activeTab: string
    airport: Airport
}) => {
    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return (
                    <CardDetail airport={airport} />
                )
            case "location":
                return (
                    <CardUbication airport={airport} />
                )
            case "timezone":
                return (
                    <TimeZone airport={airport} />
                )
            case "statistics":
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#1a2942] flex items-center justify-center">
                                <Info className="w-6 h-6 text-[#006fee]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#006fee]">Estadísticas</h2>
                        </div>

                        <div className="space-y-4">
                            <p className="text-white text-lg">Información estadística no disponible.</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="space-y-4">
            {renderTabContent()}
        </div>
    )
}