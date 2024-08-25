"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { getUserTodos } from "./actions";
import { NewModelSheet } from "./_components/new-model-sheet";

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Arquivos</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            <NewModelSheet />
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div>teste</div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
