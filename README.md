# 🍌 Banana Base

A modern web application for Magic: The Gathering card search and collection management, built with Next.js, Discord authentication, and the Scryfall API.

## Features

- 🔐 Secure Discord authentication
- 🔍 Real-time card search with autocomplete
- 🖼️ High-quality card image display
- 💰 Card pricing from multiple sources
- 📊 Detailed card information including:
  - Multiple printings and sets
  - Format legality
  - Oracle text and flavor text
  - Market prices for regular and foil versions
- 📝 Personal inventory management:
  - Track multiple copies of cards
  - Specify card condition (NM, LP, MP, HP, DMG)
  - Track foil and non-foil versions
  - Add personal notes to cards
  - Select specific printings from different sets
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🚀 Built on the T3 Stack for type-safe development

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database
- Discord application credentials

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/giantrotta24/banana-base.git
cd banana-base
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your PostgreSQL database:
   - Install PostgreSQL if you haven't already
   - Create a new database:
   ```sql
   createdb banana-base
   ```

4. Set up your environment variables:
```bash
cp .env.example .env
```

5. Update the `.env` file with your credentials:
```env
# Database URL (update with your PostgreSQL credentials)
DATABASE_URL="postgresql://username:password@localhost:5432/banana-base"

# Discord OAuth (get these from Discord Developer Portal)
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"

# Next Auth
# Generate a secret with: openssl rand -base64 32
AUTH_SECRET="your-generated-secret"
```

6. Set up your Discord application:
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to OAuth2 settings
   - Add redirect URI: `http://localhost:3000/api/auth/callback/discord`
   - Copy the Client ID and Client Secret to your `.env` file

7. Initialize the database:
```bash
pnpm db:push
```

8. Start the development server:
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

## Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Prisma Studio to view/edit database

## Database Schema

The application uses the following main models:
- `User` - User accounts and authentication
- `Card` - Card information from Scryfall
- `InventoryItem` - User's card inventory with condition and quantity
- `Deck` - User's deck lists (coming soon)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Scryfall API](https://scryfall.com/docs/api) - Magic: The Gathering card data
- [PostgreSQL](https://www.postgresql.org/) - Database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Scryfall](https://scryfall.com/) for their excellent Magic: The Gathering API
- [T3 Stack](https://create.t3.gg/) for the amazing full-stack template
- [Heroicons](https://heroicons.com/) for the beautiful icons
