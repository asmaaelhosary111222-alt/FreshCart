"use client";

import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    // Search behavior/route is not defined in the supplied project code.
    // Keep the query ready for the real search implementation.
    console.log(trimmedQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mx-2 flex min-w-0 max-w-xl flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 transition-colors duration-200 focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 sm:mx-4 sm:px-4 sm:py-2"
    >
      <label htmlFor="product-search" className="sr-only">
        Search for products, brands and more
      </label>

      <input
        id="product-search"
        type="search"
        name="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for products, brands and more..."
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent px-1 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      />

      <button
        type="submit"
        aria-label="Search"
        disabled={!query.trim()}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-all duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaSearch
          aria-hidden="true"
          size={14}
        />
      </button>
    </form>
  );
}