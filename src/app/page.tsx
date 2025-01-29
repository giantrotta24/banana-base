import { auth } from "~/server/auth";
import { Nav } from "./_components/nav";
import { BananaButton } from "./_components/banana-button";
import { CardSearch } from "./_components/card-search";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Nav />
      <div className="animate-sway fixed -left-4 top-1/4 rotate-12 text-6xl opacity-30">
        🌿
      </div>
      <div className="animate-sway-reverse fixed -right-4 top-1/3 -rotate-12 text-6xl opacity-30">
        🌿
      </div>
      <div className="animate-sway-slow fixed bottom-8 left-1/4 rotate-45 text-5xl opacity-20">
        🌴
      </div>
      <div className="animate-sway-slow-reverse fixed bottom-12 right-1/4 -rotate-45 text-5xl opacity-20">
        🌴
      </div>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-yellow-200 to-green-100">
        <div className="container relative flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session ? (
            <div className="flex w-full flex-col items-center gap-8">
              <h1 className="text-center text-4xl font-bold text-yellow-900">
                Welcome to the Jungle,{" "}
                <span className="text-green-700">{session.user?.name}</span>! 🦍
              </h1>
              <CardSearch />
            </div>
          ) : (
            <>
              <h1 className="animate-bounce-slow text-center text-5xl font-extrabold tracking-tight text-yellow-950 sm:text-[5rem]">
                Banana <span className="text-green-700">Base</span>
              </h1>

              <div className="flex flex-col items-center gap-4">
                <p className="animate-fade-in text-2xl text-green-800">
                  Join the ape colony! 🦍
                </p>
                <p className="animate-fade-in animation-delay-200 text-lg text-green-700">
                  Sign in to start tracking your MTG collection
                </p>
                <div className="animate-fade-in animation-delay-400">
                  <BananaButton href="/api/auth/signin">
                    🍌 Sign in with Discord 🦍
                  </BananaButton>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
