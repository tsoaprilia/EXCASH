'use client';

import { IoSearch } from 'react-icons/io5';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
const Search = () => {
  const SearchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    //console.log(term);
    const params = new URLSearchParams(SearchParams);
    params.set("page", "1");
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex w-full">
      <input type="text" className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm" placeholder="Search.." onChange={(e) => handleSearch(e.target.value)} defaultValue={SearchParams.get('query')?.toString()} />
      <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default Search;
