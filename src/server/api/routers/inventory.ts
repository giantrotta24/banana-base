import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const inventoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.inventoryItem.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        card: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  addCard: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        set: z.string(),
        collector_number: z.string(),
        scryfall_id: z.string(),
        image_url: z.string().optional(),
        quantity: z.number().int().positive().default(1),
        condition: z.enum(["NM", "LP", "MP", "HP", "DMG"]).default("NM"),
        isFoil: z.boolean().default(false),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // First, find or create the card
      const card = await ctx.db.card.upsert({
        where: { scryfall_id: input.scryfall_id },
        create: {
          name: input.name,
          set: input.set,
          collector_number: input.collector_number,
          scryfall_id: input.scryfall_id,
          image_url: input.image_url,
        },
        update: {}, // No updates needed if card exists
      });

      // Then, create or update the inventory item
      return ctx.db.inventoryItem.upsert({
        where: {
          cardId_userId_condition_isFoil: {
            cardId: card.id,
            userId: ctx.session.user.id,
            condition: input.condition,
            isFoil: input.isFoil,
          },
        },
        create: {
          cardId: card.id,
          userId: ctx.session.user.id,
          quantity: input.quantity,
          condition: input.condition,
          isFoil: input.isFoil,
          notes: input.notes,
        },
        update: {
          quantity: {
            increment: input.quantity,
          },
        },
      });
    }),
});
