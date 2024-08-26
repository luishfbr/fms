import { PropsWithChildren } from "react";
import { auth } from "@/services/auth";
import { MainSidebar } from "./_components/main-sidebar";
import { redirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="h-screen grid grid-cols-[20rem_1fr]">
      <MainSidebar user={session?.user} />
      <main>{children}</main>
    </div>
  );
}
