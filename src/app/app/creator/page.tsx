"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ToastProvider } from "../../utils/ToastContext";
import { Main } from "./_components/main";

export default function Page() {
  return (
    <ToastProvider>
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
            crie um novo modelo
          </DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain>
          <Main />
        </DashboardPageMain>
      </DashboardPage>
    </ToastProvider>
  );
}
