"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchCardAutocomplete, getCardByName } from "~/lib/scryfall";
import Image from "next/image";
import type { ChangeEvent } from "react";
import type { ScryfallCard } from "~/lib/scryfall";

export function CardSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<ScryfallCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle autocomplete
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchCardAutocomplete(query);
      setSuggestions(results);
    };

    void fetchSuggestions();
  }, [query, selectedCard]);

  // Handle card selection
  const handleCardSelect = async (cardName: string) => {
    setIsLoading(true);
    setQuery("");
    setSuggestions([]);

    const card = await getCardByName(cardName);
    setSelectedCard(card);
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedCard(null);
  };

  return (
    <div className="w-full max-w-3xl">
      <label
        htmlFor="card-search"
        className="mb-2 block text-lg font-medium text-yellow-900"
      >
        Search for Magic Cards 🔍
      </label>
      <div className="relative">
        {/* Search input */}
        <input
          type="search"
          id="card-search"
          className="w-full rounded-xl border-2 border-yellow-400 bg-yellow-50/80 px-4 py-3 pl-12 text-lg text-yellow-900 placeholder-yellow-700/50 shadow-inner transition-colors focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
          placeholder="Search by card name..."
          value={query}
          onChange={handleInputChange}
          aria-label="Search for Magic: The Gathering cards"
          autoComplete="off"
        />
        {/* Search icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-yellow-700/50"
            aria-hidden="true"
          />
        </div>

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-yellow-200 bg-white py-1 shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="cursor-pointer px-4 py-2 hover:bg-yellow-50"
                onClick={() => void handleCardSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-4 text-center text-yellow-900">
          Loading card data... 🍌
        </div>
      )}

      {/* Card display */}
      {selectedCard && (
        <div className="mt-8 rounded-lg border-2 border-yellow-400 bg-white p-4">
          <h2 className="text-xl font-bold text-yellow-900">
            {selectedCard.name}
          </h2>
          {selectedCard.image_uris?.normal && (
            <Image
              src={selectedCard.image_uris.normal}
              alt={selectedCard.name}
              width={488}
              height={680}
              className="mt-4 rounded-lg"
              priority
            />
          )}
          <p className="mt-2 text-sm text-yellow-800">
            Set: {selectedCard.set_name} • #{selectedCard.collector_number}
          </p>
        </div>
      )}

      {/* Search instructions */}
      {!suggestions.length && !selectedCard && (
        <div className="mt-2 text-sm text-yellow-800/80">
          <p>
            Type a card name to search (e.g., &ldquo;Black Lotus&rdquo;,
            &ldquo;Sol Ring&rdquo;)
          </p>
        </div>
      )}
    </div>
  );
}
