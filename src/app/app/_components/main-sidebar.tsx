"use client";

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarFooter,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "@/components/logo";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { adminButton, creatorButton } from "../_actions/sidebar";

type MainSidebarProps = {
  user: Session["user"];
};

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await adminButton();
      setIsAdmin(adminStatus || false);
    };

    const checkCreator = async () => {
      const creatorStatus = await creatorButton();
      setIsCreator(creatorStatus || false);
    };

    checkAdmin();
    checkCreator();
  }, []);

  if (isAdmin === null || isCreator === null) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive("/app")}>
              Tabela de Arquivos
            </DashboardSidebarNavLink>
            {isAdmin && (
              <DashboardSidebarNavLink
                href="/app/admin"
                active={isActive("/app/admin")}
              >
                Configurações de Administrador
              </DashboardSidebarNavLink>
            )}
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  );
}
