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
import { SheetNewModel } from "./_components/new-model/sheet-new-model";

interface User {
  id: string;
  role: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    const data = await User();
    if (data && data.id && data.role) {
      setUser({ id: data.id, role: data.role });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
          {user && (user.role === "CREATOR" || user.role === "ADMIN") && (
            <DashboardPageHeaderNav className="flex gap-4">
              <SheetNewModel id={user.id} />
              <SheetNewArchive id={user.id} />
            </DashboardPageHeaderNav>
          )}
        </DashboardPageHeader>
        <DashboardPageMain>
          <ContainerTables />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
