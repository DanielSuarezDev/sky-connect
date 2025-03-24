import { Search, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { SparklesText } from '../ui/sparkles-text';
import { useRouter } from 'next/navigation';
import { useAirportStore } from '@/modules/aviation-stack/store/use-airport.store';

export const HeaderSearch = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const { 
      airports,
      fetchAirports,
      setSearchTerm: setStoreSearchTerm
    } = useAirportStore();

    useEffect(() => {
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }

      fetchAirports();
      const handleClickOutside = (e: MouseEvent) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) && 
            inputRef.current && !inputRef.current.contains(e.target as Node)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [fetchAirports]);

    useEffect(() => {
      if (searchTerm.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      const term = searchTerm.toLowerCase();
      
      const airportSuggestions = airports
        .filter(airport => 
          airport?.airport_name?.toLowerCase().includes(term) || 
          airport?.iata_code?.toLowerCase().includes(term) || 
          airport?.city_name?.toLowerCase().includes(term))
        .map(airport => `${airport?.airport_name || ''} (${airport?.iata_code || ''})`)
        .slice(0, 5);

      setSuggestions(airportSuggestions);
    }, [searchTerm, airports]);

    const handleSearch = () => {
      if (searchTerm.trim()) {
        const newHistory = [
          searchTerm,
          ...searchHistory.filter(item => item !== searchTerm)
        ].slice(0, 5);
        
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));

        setStoreSearchTerm(searchTerm);
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const selectSuggestion = (suggestion: string) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
      
      const iataMatch = suggestion.match(/\(([A-Z]{3})\)$/);
      if (iataMatch && iataMatch[1]) {
        const iataCode = iataMatch[1];
        setStoreSearchTerm(iataCode);
        router.push(`/search?q=${encodeURIComponent(iataCode)}`);
      } else {
        setStoreSearchTerm(suggestion);
        router.push(`/search?q=${encodeURIComponent(suggestion)}`);
      }

      const newHistory = [
        suggestion,
        ...searchHistory.filter(item => item !== suggestion)
      ].slice(0, 5);
      
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    const resetSearch = () => {
      setSearchTerm('');
      setSuggestions([]);
      setStoreSearchTerm('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <SparklesText text="SkyConnect Explorer" className="text-4xl" />

          <div className="flex w-full max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar aeropuertos..."
                  className="w-full rounded-full border-0 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006fee]"
                />
                {searchTerm && (
                  <button 
                    onClick={resetSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#006fee] transition-colors"
                    aria-label="Resetear búsqueda"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {showSuggestions && (searchHistory.length > 0 || suggestions.length > 0) && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  {searchHistory.length > 0 && (
                    <div className="px-2 py-1">
                      <div className="text-xs font-semibold text-gray-500 pb-1">Historial de búsqueda</div>
                      {searchHistory.map((item, index) => (
                        <div 
                          key={`history-${index}`}
                          className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer rounded-md flex items-center"
                          onClick={() => selectSuggestion(item)}
                        >
                          <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
                          <span className="text-[#006fee]">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {suggestions.length > 0 && (
                    <div className="px-2 py-1 border-t border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 pb-1">Sugerencias</div>
                      {suggestions.map((suggestion, index) => (
                        <div 
                          key={`suggestion-${index}`}
                          className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer rounded-md"
                          onClick={() => selectSuggestion(suggestion)}
                        >
                          <span className="text-[#006fee]">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#006fee] to-[#00c2ff] px-4 py-2 text-white"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </button>
          </div>
        </header>
    );
};