import Image from "next/image"
import { Search } from 'lucide-react'

export const HomeScreen = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a1525]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-layout.png"
          alt="Airport at night with planes"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center gap-10 px-4">
        {/* Title with gradient */}
        <h1 
          className="text-center font-['Gotham_Black'] text-[88.91px] leading-none tracking-[0%]"
          style={{ 
            background: "linear-gradient(90deg, #006AFF 0%, #00F9FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          SkyConnect Explorer
        </h1>
        
        {/* Search input */}
        <div className="w-full max-w-[500px]">
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Buscar aeropuertos..."
              className="w-full h-[45px] rounded-full py-3 px-6 text-black bg-white"
            />
            <button 
              className="bg-gradient-to-r from-[#006AFF] to-[#00F9FF] text-white rounded-full py-2 px-8 flex items-center justify-center gap-2 w-[120px]"
            >
              <Search className="h-4 w-4" />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
