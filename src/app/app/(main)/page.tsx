"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";

import { useEffect, useState } from "react";
import { checkButton } from "./_actions/dashboard";
import { ToastProvider } from "@/app/utils/ToastContext";
import { MainTableAndModel } from "./_components/main-table-and-modle";
import { NewArchive } from "./_components/new-archive";

export default function Page() {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getPermission = async () => {
      const { id, havePermission } = await checkButton();
      setHavePermission(havePermission);
      setUserId(id);
    };
    getPermission();
  }, []);

  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
          {havePermission && userId ? (
            <DashboardPageHeaderNav>
              <NewArchive id={userId} />
            </DashboardPageHeaderNav>
          ) : null}
        </DashboardPageHeader>
        <DashboardPageMain>
          <MainTableAndModel />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
