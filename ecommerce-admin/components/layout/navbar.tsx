import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import NavMenu from "@/components/layout/nav-menu";
import StoreSwitcher from "@/components/layout/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <NavMenu className="mx-6" />
        <div className="flex items-center ml-auto space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
