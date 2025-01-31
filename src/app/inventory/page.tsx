import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { InventoryList } from "../_components/inventory-list";
import { Nav } from "../_components/nav";

export default async function InventoryPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-yellow-100 via-yellow-200 to-green-100 pt-20">
        <div className="container px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold text-yellow-900">
            My Inventory
          </h1>
          <InventoryList />
        </div>
      </main>
    </>
  );
}
