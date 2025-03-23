import { Search } from 'lucide-react';
import React from 'react';

export const HeaderSearch = () => {
    return (
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-3xl font-bold text-[#006fee] md:text-4xl">SkyConnect Explorer</h1>
          <div className="flex w-full max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar aeropuertos..."
                className="w-full rounded-full border-0 bg-white px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006fee]"
              />
            </div>
            <button className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#006fee] to-[#00c2ff] px-4 py-2 text-white">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </button>
          </div>
        </header>
    );
};