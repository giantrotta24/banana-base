"use client";

import { api } from "~/trpc/react";
import Image from "next/image";

export function InventoryList() {
  const { data: inventory, isLoading } = api.inventory.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="text-center text-yellow-900">
        Loading your inventory... 🍌
      </div>
    );
  }

  if (!inventory?.length) {
    return (
      <div className="text-center text-yellow-900">
        Your inventory is empty. Start by adding some cards! 🃏
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="flex rounded-lg border border-yellow-200 bg-white p-4 shadow-sm"
        >
          <div className="relative h-[88px] w-[64px] flex-shrink-0 overflow-hidden rounded-lg">
            {item.card.image_url && (
              <Image
                src={item.card.image_url}
                alt={item.card.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="ml-4 flex flex-col">
            <h3 className="font-medium text-yellow-900">{item.card.name}</h3>
            <p className="text-sm text-yellow-700">
              {item.card.set} #{item.card.collector_number}
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>Quantity: {item.quantity}</p>
              <p>Condition: {item.condition}</p>
              {item.isFoil && <p className="text-yellow-600">✨ Foil</p>}
            </div>
            {item.notes && (
              <p className="mt-2 text-sm italic text-yellow-600">
                {item.notes}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
