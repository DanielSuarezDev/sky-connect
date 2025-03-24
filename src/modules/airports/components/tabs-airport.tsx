import React from "react"
import { Airport } from "@/modules/aviation-stack/types/aviation.types"
import { CardDetail } from "./card-detail"
import { CardUbication } from "./card-ubication"
import { TimeZone } from "./time-zone"

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
        }
    }

    return (
        <div className="space-y-4">
            {renderTabContent()}
        </div>
    )
}