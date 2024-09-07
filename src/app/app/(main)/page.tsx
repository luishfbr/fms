"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ToastProvider } from "@/app/utils/ToastContext";
import { ContainerTables } from "./_components/container-tables";
import { SheetNewArchive } from "./_components/new-archive/sheet-new-archive";
import { User } from "./_actions/dashboard";
import { useEffect, useState } from "react";

interface User {
  id: string;
  role: string;
}

export default function Page() {
  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const data = await User();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
          {user?.role === "creator" || user?.role === "admin" ? (
            <DashboardPageHeaderNav>
              <SheetNewArchive id={user.id} />
            </DashboardPageHeaderNav>
          ) : null}
        </DashboardPageHeader>
        <DashboardPageMain>
          <ContainerTables />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
