"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (trimmed) {
      // Si hay texto, vamos a /search?q=texto
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } else {
      // Si está vacío, vamos a /search sin query param (mostrar todos)
      router.push("/search")
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
 
      
      {/* Capa de opacidad */}
      
      
      {/* Contenido */}
      <div className="relative z-10 w-full max-w-lg text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          SkyConnect Explorer
        </h1>

        <div className="mt-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar aeropuertos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 py-6 bg-white text-[#0a1629] rounded-full border-0 w-full"
              />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 px-8 rounded-full"
            >
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
