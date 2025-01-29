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
  legalities: Record<string, string>;
  power?: string;
  toughness?: string;
  flavor_text?: string;
  prices?: {
    usd?: string | null;
    usd_foil?: string | null;
  };
  released_at: string;
  set: string;
  rarity: string;
}

interface AutocompleteResponse {
  data: string[];
  total_values: number;
}

interface ScryfallSearchResponse {
  data: ScryfallCard[];
  total_cards: number;
  has_more: boolean;
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

export async function getCardPrintings(
  cardName: string,
): Promise<ScryfallCard[]> {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=!"${encodeURIComponent(cardName)}"&unique=prints`,
      { headers: { "Content-Type": "application/json" } },
    );

    if (!response.ok) throw new Error("Printings not found");

    const data = (await response.json()) as ScryfallSearchResponse;
    return data.data;
  } catch (error) {
    console.error("Printings fetch error:", error);
    return [];
  }
}
