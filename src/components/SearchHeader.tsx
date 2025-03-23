'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  initialQuery: string;
}

export function SearchHeader({ initialQuery }: SearchHeaderProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', searchTerm.trim());
      params.set('page', '1'); // Reset to first page on new search
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="font-bold text-lg"
        >
          Airport Search
        </Button>
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-lg">
          <Input
            type="search"
            placeholder="Search airports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
} 