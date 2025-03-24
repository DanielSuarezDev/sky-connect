import { Input } from "@/components/ui/input"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { SparklesText } from "@/components/ui/sparkles-text"
import { Search } from "lucide-react"
import React from "react"

export const HomeScreenContainer = ({
    searchTerm,
    setSearchTerm,
    handleSearch
}: {
    searchTerm: string
    setSearchTerm: (value: string) => void
    handleSearch: (e: React.FormEvent) => void
}) => {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
                <SparklesText text="SkyConnect Explorer" className="w-full" />
            <div className="relative z-10 w-full max-w-2xl text-center ">

                <div className="mt-12">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Buscar aeropuertos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-4 py-6 bg-white text-[#006FEE] rounded-full border-0 w-[80%] mx-auto"
                            />
                        </div>

                        <RainbowButton>
                            <Search className="mr-2 h-4 w-4" /> Buscar
                        </RainbowButton>
                    </form>
                </div>
            </div>
        </main>
    )
}