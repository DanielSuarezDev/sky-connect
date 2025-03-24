import React, { useState } from 'react';

// Versión simplificada del componente HeaderSearch para pruebas
export const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Mock implementation
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  return (
    <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div>SkyConnect Explorer</div>

      <div className="flex w-full max-w-xl items-center gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aeropuertos..."
              className="w-full rounded-full border-0 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={resetSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="Resetear búsqueda"
              >
                X
              </button>
            )}
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="flex items-center justify-center rounded-full px-4 py-2 text-white"
        >
          Buscar
        </button>
      </div>
    </header>
  );
}; 