"use client";

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
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
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [isCreator, setIsCreator] = useState<boolean>();

  const isActive = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await adminButton();
      setIsAdmin(adminStatus);
    };

    const checkCreator = async () => {
      const creatorStatus = await creatorButton();
      setIsCreator(creatorStatus);
    };

    checkAdmin();
    checkCreator();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (isCreator === null) {
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
            {isCreator || isAdmin ? (
              <DashboardSidebarNavLink
                href="/app/creator"
                active={isActive("/app/creator")}
              >
                Novo Arquivo
              </DashboardSidebarNavLink>
            ) : null}
            {isAdmin ? (
              <DashboardSidebarNavLink
                href="/app/admin"
                active={isActive("/app/admin")}
              >
                Configurações de Administrador
              </DashboardSidebarNavLink>
            ) : null}
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">
              Precisa de ajuda?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  );
}
