"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HomeScreenContainer } from "./home-screen-container"

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <HomeScreenContainer
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
    />
  )
}
