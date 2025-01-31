"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  searchCardAutocomplete,
  getCardByName,
  getCardPrintings,
} from "~/lib/scryfall";
import Image from "next/image";
import type { ChangeEvent } from "react";
import type { ScryfallCard } from "~/lib/scryfall";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { AddToInventoryModal } from "./add-to-inventory-modal";

export function CardSearch() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<ScryfallCard | null>(null);
  const [printings, setPrintings] = useState<ScryfallCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrinting, setSelectedPrinting] = useState<ScryfallCard | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToInventory = api.inventory.addCard.useMutation({
    onSuccess: () => {
      alert("Card added to inventory!");
    },
    onError: (error) => {
      alert(`Error adding card: ${error.message}`);
    },
  });

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

    const [card, cardPrintings] = await Promise.all([
      getCardByName(cardName),
      getCardPrintings(cardName),
    ]);

    setSelectedCard(card);
    setPrintings(cardPrintings);
    setSelectedPrinting(card);
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedCard(null);
  };

  // Format price with currency symbol
  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "N/A";
    return `$${price}`;
  };

  // Format legality status with color
  const getLegalityColor = (status: string) => {
    switch (status) {
      case "legal":
        return "text-green-600";
      case "not_legal":
        return "text-gray-400";
      case "banned":
        return "text-red-600";
      case "restricted":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-6xl">
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
        <div className="mt-8 rounded-lg border-2 border-yellow-400 bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left column - Image and Printings */}
            <div className="flex flex-col items-center space-y-4">
              {selectedPrinting?.image_uris?.normal && (
                <div className="relative h-[352px] w-[252px] overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105">
                  <Image
                    src={selectedPrinting.image_uris.normal}
                    alt={selectedPrinting.name}
                    width={252}
                    height={352}
                    className="rounded-lg"
                    priority
                  />
                </div>
              )}

              {/* Printings selector */}
              <div className="w-full rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-center text-lg font-semibold text-yellow-900">
                  Available Printings
                </h3>
                <div className="max-h-48 overflow-y-auto">
                  {printings.map((printing) => (
                    <div
                      key={printing.id}
                      onClick={() => setSelectedPrinting(printing)}
                      className={`mb-2 cursor-pointer rounded-lg p-2 transition-colors ${
                        selectedPrinting?.id === printing.id
                          ? "bg-yellow-200"
                          : "hover:bg-yellow-100"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-yellow-900">
                            {printing.set_name}
                          </p>
                          <p className="text-sm text-yellow-700">
                            #{printing.collector_number} · {printing.rarity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-yellow-900">
                            {formatPrice(printing.prices?.usd)}
                          </p>
                          <p className="text-sm text-yellow-700">
                            Foil: {formatPrice(printing.prices?.usd_foil)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Card details */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-900">
                    {selectedCard.name}
                  </h2>
                  <p className="mt-1 text-sm text-yellow-700">
                    {selectedCard.type_line}
                  </p>
                </div>
                {session && (
                  <button
                    onClick={() => {
                      if (!selectedPrinting) return;
                      setIsModalOpen(true);
                    }}
                    className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    Add to Inventory
                  </button>
                )}
              </div>

              {/* Set information */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  Set Info
                </h3>
                <p className="text-yellow-800">
                  {selectedCard.set_name} (#{selectedCard.collector_number})
                </p>
                <p className="text-sm text-yellow-700">
                  Released:{" "}
                  {new Date(selectedCard.released_at).toLocaleDateString()}
                </p>
              </div>

              {/* Oracle text */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  Card Text
                </h3>
                <p className="whitespace-pre-wrap text-yellow-800">
                  {selectedCard.oracle_text}
                </p>
                {selectedCard.flavor_text && (
                  <p className="mt-2 italic text-yellow-700">
                    {selectedCard.flavor_text}
                  </p>
                )}
              </div>

              {/* Game stats */}
              {(selectedCard.power ?? selectedCard.toughness) && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900">
                    Stats
                  </h3>
                  <p className="text-yellow-800">
                    Power/Toughness: {selectedCard.power}/
                    {selectedCard.toughness}
                  </p>
                </div>
              )}

              {/* Legality section */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  Format Legality
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(selectedCard.legalities).map(
                    ([format, status]) => (
                      <div key={format} className="flex items-center space-x-2">
                        <span className="text-sm capitalize text-yellow-700">
                          {format.replace("_", " ")}:
                        </span>
                        <span className={`text-sm ${getLegalityColor(status)}`}>
                          {status.replace("_", " ")}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
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

      {selectedPrinting && (
        <AddToInventoryModal
          card={selectedPrinting}
          printings={printings}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
