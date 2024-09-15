"use server";

import { NewModelProps } from "@/app/types/types";
import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";
import { Field } from "../_components/new-model/sheet-new-model";
import { FieldType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

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

  const newModelName = await prisma.fileTemplate.create({
    data: {
      modelName: modelName,
      sectorId: sectorId,
    },
  });

  if (newModelName) {
    const fileTemplateId = newModelName.id as string;

    const standardFields = [
      {
        fieldType: FieldType.prateleira,
        fieldLabel: "Prateleira",
        fileTemplateId: fileTemplateId,
      },
      {
        fieldType: FieldType.caixa,
        fieldLabel: "Caixa",
        fileTemplateId: fileTemplateId,
      },
      {
        fieldType: FieldType.pasta,
        fieldLabel: "Pasta",
        fileTemplateId: fileTemplateId,
      },
    ];

    const customFields = fields.map((field) => ({
      fieldType: field.type as FieldType,
      fieldLabel: field.value,
      fileTemplateId: fileTemplateId,
    }));

    const allFields = [...standardFields, ...customFields];

    await prisma.field.createMany({
      data: allFields,
    });

    return newModelName;
  }

  return null;
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
      id: true,
    },
  });

  if (response) {
    return response;
  }
};

export const fieldsByFiletemplateId = async (fileTemplateId: string) => {
  return await prisma.field.findMany({
    where: {
      fileTemplateId: fileTemplateId,
    },
  });
};

export const getModelById = async (id: string) => {
  const response = await prisma.fileTemplate.findUnique({
    where: {
      id: id,
    },
  });
  return response;
};

export const createNewFile = async (data: any) => {
  const commonId = uuidv4();
  const dataWithCommonId = data.map((item: any) => ({
    ...item,
    commonId: commonId,
  }));
  const response = await prisma.file.createMany({
    data: dataWithCommonId,
  });
  return response;
};

export const GetFilesByFieldIds = async (fieldIds: string[]) => {
  const response = await prisma.file.findMany({
    where: {
      fieldId: {
        in: fieldIds,
      },
    },
    select: {
      id: true,
      value: true,
      fieldId: true,
    },
  });

  // Agrupar arquivos por fieldId
  const groupedFiles = response.reduce((acc, file) => {
    if (!acc[file.fieldId]) {
      acc[file.fieldId] = [];
    }
    acc[file.fieldId].push(file);
    return acc;
  }, {} as Record<string, typeof response>);

  // Formatar resposta como um array de linhas (cada linha é um objeto com fieldId como chave e adicionando o ID do arquivo)
  const formattedResponse =
    Object.values(groupedFiles)[0]?.map((_, index) => {
      const row = fieldIds.reduce((acc, fieldId) => {
        const file = groupedFiles[fieldId]?.[index];
        if (file) {
          acc[fieldId] = file.value;
          acc.id = file.id; // Adiciona o id do arquivo ao objeto da linha
        }
        return acc;
      }, {} as Record<string, string>);
      return row;
    }) || [];

  return formattedResponse;
};

export const deleteFile = async (fileId: string) => {
  const getCommonId = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
    select: {
      commonId: true,
    },
  });

  if (getCommonId) {
    const response = await prisma.file.deleteMany({
      where: {
        commonId: getCommonId.commonId,
      },
    });
    return response;
  }
  return null;
};
