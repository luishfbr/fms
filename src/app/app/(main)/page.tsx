"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ToastProvider } from "@/app/utils/ToastContext";
import { MainTableAndModel } from "./_components/main-table-and-modle";

export default function Page() {
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain>
          <MainTableAndModel />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
