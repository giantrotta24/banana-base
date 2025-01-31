import { type ScryfallCard } from "~/lib/scryfall";
import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";

interface AddToInventoryModalProps {
  card: ScryfallCard;
  printings: ScryfallCard[];
  isOpen: boolean;
  onClose: () => void;
}

export function AddToInventoryModal({
  card,
  printings,
  isOpen,
  onClose,
}: AddToInventoryModalProps) {
  const [selectedPrinting, setSelectedPrinting] = useState<ScryfallCard>(card);
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState<"NM" | "LP" | "MP" | "HP" | "DMG">(
    "NM",
  );
  const [isFoil, setIsFoil] = useState(false);
  const [notes, setNotes] = useState("");

  const addToInventory = api.inventory.addCard.useMutation({
    onSuccess: () => {
      alert("Card added to inventory!");
      onClose();
    },
    onError: (error) => {
      alert(`Error adding card: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToInventory.mutate({
      name: selectedPrinting.name,
      set: selectedPrinting.set,
      collector_number: selectedPrinting.collector_number,
      scryfall_id: selectedPrinting.id,
      image_url: selectedPrinting.image_uris?.normal,
      quantity,
      condition,
      isFoil,
      notes: notes || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-yellow-900">
          Add {card.name} to Inventory
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Set selection */}
          <div>
            <label className="block text-sm font-medium text-yellow-700">
              Set
            </label>
            <select
              value={selectedPrinting.id}
              onChange={(e) => {
                const printing = printings.find((p) => p.id === e.target.value);
                if (printing) setSelectedPrinting(printing);
              }}
              className="mt-1 block w-full rounded-md border border-yellow-300 p-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              {printings.map((printing) => (
                <option key={printing.id} value={printing.id}>
                  {printing.set_name} (#{printing.collector_number}) -{" "}
                  {printing.prices?.usd ? `$${printing.prices.usd}` : "N/A"}
                </option>
              ))}
            </select>
            {/* Show selected printing details */}
            {selectedPrinting.image_uris?.small && (
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-2">
                <div className="relative h-[44px] w-[32px] flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={selectedPrinting.image_uris.small}
                    alt={selectedPrinting.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-yellow-900">
                    {selectedPrinting.set_name}
                  </p>
                  <p className="text-sm text-yellow-700">
                    #{selectedPrinting.collector_number} ·{" "}
                    {selectedPrinting.rarity}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-yellow-900">
                    {selectedPrinting.prices?.usd
                      ? `$${selectedPrinting.prices.usd}`
                      : "N/A"}
                  </p>
                  <p className="text-yellow-700">
                    Foil:{" "}
                    {selectedPrinting.prices?.usd_foil
                      ? `$${selectedPrinting.prices.usd_foil}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border border-yellow-300 p-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as typeof condition)}
              className="mt-1 block w-full rounded-md border border-yellow-300 p-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              <option value="NM">Near Mint</option>
              <option value="LP">Lightly Played</option>
              <option value="MP">Moderately Played</option>
              <option value="HP">Heavily Played</option>
              <option value="DMG">Damaged</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="foil"
              checked={isFoil}
              onChange={(e) => setIsFoil(e.target.checked)}
              className="h-4 w-4 rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500"
            />
            <label
              htmlFor="foil"
              className="text-sm font-medium text-yellow-700"
            >
              Foil
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border border-yellow-300 p-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              rows={3}
              placeholder="Optional notes about this card..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addToInventory.isPending}
              className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 disabled:bg-yellow-300"
            >
              {addToInventory.isPending ? "Adding..." : "Add to Inventory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
