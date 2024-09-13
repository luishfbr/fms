"use server";

import { NewModelProps } from "@/app/types/types";
import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";
import { Field } from "../_components/new-model/sheet-new-model";
import { FieldType } from "@prisma/client";

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

    if (response?.role === "CREATOR" || response?.role === "ADMIN") {
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
    if (response) {
      return response.sectors;
    } else {
      return [];
    }
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
    },
  });

  if (response) {
    return response;
  }
  return [];
};

export const User = async () => {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email as string;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
      },
    });

    const data = {
      id: response?.id as string,
      role: response?.role as string,
    };

    return data;
  }
};

export const getSectorsById = async (id: string) => {
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

export const createNewModel = async (formData: NewModelProps) => {
  const modelName = formData.modelName as string;
  const sectorId = formData.sectorId as string;
  const fields = formData.fields as Field[];

  // Criar o novo modelo
  const newModelName = await prisma.fileTemplate.create({
    data: {
      modelName: modelName,
      sectorId: sectorId,
    },
  });

  if (newModelName) {
    const fileTemplateId = newModelName.id as string;

    // Criar os campos do modelo, adaptando para o formato correto esperado pelo Prisma
    const fieldsData = fields.map((field) => ({
      fieldType: field.type as FieldType, // Certifique-se de que o tipo de campo está correto
      fieldLabel: field.value,
      fileTemplateId: fileTemplateId,
    }));

    await prisma.field.createMany({
      data: fieldsData,
    });

    return newModelName; // Retorna o modelo criado para confirmar a criação
  }

  return null; // Retorna null se houver falha
};

export const GetModelsById = async (id: string) => {
  const response = await prisma.fileTemplate.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      modelName: true,
    },
  });

  if (response) {
    return response;
  }
  return null;
};

export const GetHeadersByFileTemplateId = async (id: string) => {
  const response = await prisma.field.findMany({
    where: {
      fileTemplateId: id,
    },
    select: {
      fieldType: true,
      fieldLabel: true,
    },
  });

  if (response) {
    return response;
  }
};
