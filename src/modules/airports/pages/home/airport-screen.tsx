"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Airport } from "@/modules/aviation-stack/types/aviation.types"
import { useAirportStore } from "@/modules/aviation-stack/store/use-airport.store"

import { AirportContainer } from "./airport-container"
import { TabType } from "../../types"

export const AirportScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general")

  const params = useParams() as { iata: string };
  const { iata } = params;
  const router = useRouter()
  
  const { getAirportByCode } = useAirportStore()
  const airport = getAirportByCode(iata)

  useEffect(() => {
    if (!airport) {
      router.back()
    }
  }, [airport])

  return (
    <AirportContainer
      airport={airport as Airport}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      iata={iata}
      router={router}
    />
  )
}

