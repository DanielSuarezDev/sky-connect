import { SearchScreen } from '@/modules/search/pages/search-screen';
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchScreen />
    </Suspense>
  );
}
