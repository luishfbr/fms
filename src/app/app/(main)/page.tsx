"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { NewModelSheet } from "./_components/new-model-sheet";
import { useEffect, useState } from "react";
import { checkButton } from "./_actions/dashboard";
import { ToastProvider } from "@/app/utils/ToastContext";
import { MainTableAndModel } from "./_components/main-table-and-modle";

export default function Page() {
  const [havePermission, setHavePermission] = useState<boolean>();

  useEffect(() => {
    const getPermission = async () => {
      const response = await checkButton();
      setHavePermission(response);
    };
    getPermission();
  }, []);

  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
          {havePermission ? (
            <DashboardPageHeaderNav>
              <DashboardPageHeaderNav>
                <NewModelSheet />
              </DashboardPageHeaderNav>
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
