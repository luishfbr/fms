"use server";

import { WorkContractProps } from "@/app/types/types";
import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";

export const checkButton = async () => {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email as string;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        role: true,
        id: true,
      },
    });

    console.log(response);

    if (response?.role === "creator" || response?.role === "admin") {
      return { id: response.id, havePermission: true };
    }
  }
  return { id: null, havePermission: false };
};

export const getSectors = async () => {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email as string;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        sectors: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return response;
  }
};

export const getSectorByUserId = async (id: string) => {
  const response = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      sectors: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (response) {
    return response.sectors;
  }
  return [];
};

export const getModelsBySectorId = async (sectorId: string) => {
  const response = await prisma.fileTemplate.findMany({
    where: {
      sectorId: sectorId,
    },
    select: {
      id: true,
      modelName: true,
      url: true,
    },
  });

  if (response) {
    return response;
  }
  return [];
};

export const saveWorkContract = async (data: WorkContractProps) => {
  const response = await prisma.fields.create({
    data,
  });
  if (response) {
    return true;
  }
};

export const getWorkContractByIdModel = async (id: string) => {
  const response = await prisma.fields.findMany({
    where: {
      fileTemplateId: id,
    },
    select: {
      id: true,
      shelf: true,
      box: true,
      folder: true,
      name: true,
      cpf: true,
      registration: true,
      addData: true,
      logoutDate: true,
    },
  });
  if (response) {
    return response;
  }
  return [];
};

export const getTableWorkContract = async (id: string) => {
  const response = await prisma.fields.findMany({
    where: {
      fileTemplateId: id,
    },
    select: {
      id: true,
      shelf: true,
      box: true,
      folder: true,
      name: true,
      cpf: true,
      registration: true,
      addData: true,
      logoutDate: true,
    },
  });
  if (response) {
    return response;
  }
  return [];
};

export const getTablePoint = async (id: string) => {
  const response = await prisma.fields.findMany({
    where: {
      fileTemplateId: id,
    },
    select: {
      id: true,
      shelf: true,
      box: true,
      folder: true,
      name: true,
      cpf: true,
      registration: true,
      addData: true,
      logoutDate: true,
      month: true,
      year: true,
    },
  });
  if (response) {
    return response;
  }
  return [];
};
