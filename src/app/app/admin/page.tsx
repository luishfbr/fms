"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { Main } from "./_components/main";
import { ToastProvider } from "./ToastContext";

export default function Page() {
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
            Painel de Desenvolvedor
          </DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain>
          <Main />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
