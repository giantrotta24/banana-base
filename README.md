# 🍌 Banana Base

A modern web application for Magic: The Gathering card search and collection management, built with Next.js, Discord authentication, and the Scryfall API.

## Features

- 🔐 Secure Discord authentication
- 🔍 Real-time card search with autocomplete
- 🖼️ High-quality card image display
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

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:
```env
# Discord OAuth
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"

# Database URL
DATABASE_URL="postgresql://user:password@localhost:5432/banana-base"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

5. Initialize the database:
```bash
pnpm db:push
```

6. Start the development server:
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

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Scryfall API](https://scryfall.com/docs/api) - Magic: The Gathering card data

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
