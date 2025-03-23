"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useAirportStore } from "@/store/useAirportStore"
import { Info } from "lucide-react"
import { GoBack } from "@/components/ui/go-back"
import { CardDetail } from "@/modules/airports/components/card-detail"
import { CardUbication } from "@/modules/airports/components/card-ubication"

interface AirportPageProps {
  params: Promise<{
    iata: string
  }>
}

type TabType = "general" | "location" | "timezone" | "statistics"

export default function AirportPage({ params }: AirportPageProps) {
  const router = useRouter()
  const { iata } = use(params)
  const { getAirportByCode } = useAirportStore()
  const [activeTab, setActiveTab] = useState<TabType>("general")
  const airport = getAirportByCode(iata)

  if (!airport) {
    return (
      <main className="min-h-screen bg-[#0a1629] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Airport Not Found</h1>
            <p className="text-[#a2a2a2]">The airport with code {iata} was not found.</p>
            <button onClick={() => router.push("/")} className="text-[#006fee] hover:text-[#3f8fff]">
              Return to Search
            </button>
          </div>
        </div>
      </main>
    )
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "location", label: "Ubicación" },
    { id: "timezone", label: "Zona Horaria" },
    { id: "statistics", label: "Estadísticas" },
  ] as const

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
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#1a2942] flex items-center justify-center">
                <Info className="w-6 h-6 text-[#006fee]" />
              </div>
              <h2 className="text-2xl font-bold text-[#006fee]">Zona Horaria</h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg">Zona Horaria:</span>
                <span className="text-white text-lg">{airport.timezone}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg">GMT Offset:</span>
                <span className="text-white text-lg">{airport.gmt}</span>
              </div>
            </div>
          </div>
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

        <div>{renderTabContent()}</div>
      </div>
    </main>
  )
}

