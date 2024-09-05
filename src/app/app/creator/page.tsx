"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ToastProvider } from "../../utils/ToastContext";
import { Main } from "./main";

export default function Page() {
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
            Painel de Criação de Arquivos
          </DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain>
          <Main />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
