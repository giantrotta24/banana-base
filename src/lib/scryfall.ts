export interface ScryfallCard {
  id: string;
  name: string;
  set_name: string;
  collector_number: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
  };
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
}

interface AutocompleteResponse {
  data: string[];
  total_values: number;
}

export async function searchCardAutocomplete(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(query)}`,
      { headers: { "Content-Type": "application/json" } },
    );

    if (!response.ok) throw new Error("Scryfall API error");

    const data = (await response.json()) as unknown as AutocompleteResponse;
    return data.data;
  } catch (error) {
    console.error("Autocomplete error:", error);
    return [];
  }
}

export async function getCardByName(
  cardName: string,
): Promise<ScryfallCard | null> {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`,
      { headers: { "Content-Type": "application/json" } },
    );

    if (!response.ok) throw new Error("Card not found");

    const data = (await response.json()) as unknown as ScryfallCard;
    return data;
  } catch (error) {
    console.error("Card fetch error:", error);
    return null;
  }
}
