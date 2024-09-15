"use server";

import { FileData, NewModelProps } from "@/app/types/types";
import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";
import { FieldType } from "@prisma/client";
import { FileInfo } from "../_components/menu/menu-component";

export const checkButton = async () => {
  const session = await auth();
  if (session?.user) {
    const { role, id } =
      (await prisma.user.findUnique({
        where: { email: session.user.email as string },
        select: { role: true, id: true },
      })) || {};
    return { id, havePermission: role === "CREATOR" || role === "ADMIN" };
  }
  return { id: null, havePermission: false };
};

export const getSectors = async () => {
  const session = await auth();
  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { sectors: { select: { name: true, id: true } } },
    });
    return user?.sectors || [];
  }
  return [];
};

export const getSectorByUserId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { sectors: { select: { id: true, name: true } } },
  });
  return user?.sectors || [];
};

export const getModelsBySectorId = async (sectorId: string) => {
  return await prisma.fileTemplate.findMany({
    where: { sectorId },
    select: { id: true, modelName: true },
  });
};

export const User = async () => {
  const session = await auth();
  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { id: true, role: true },
    });
    return { id: user?.id, role: user?.role };
  }
};

export const getSectorsById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { sectors: { select: { id: true, name: true } } },
  });
  return user?.sectors || [];
};

export const createNewModel = async (formData: NewModelProps) => {
  const { modelName, sectorId, fields } = formData;
  const newModel = await prisma.fileTemplate.create({
    data: { modelName, sectorId },
  });

  if (newModel) {
    const standardFields = [
      { fieldType: FieldType.prateleira, fieldLabel: "Prateleira" },
      { fieldType: FieldType.caixa, fieldLabel: "Caixa" },
      { fieldType: FieldType.pasta, fieldLabel: "Pasta" },
    ];

    const allFields = [
      ...standardFields,
      ...fields.map((field) => ({
        fieldType: field.type as FieldType,
        fieldLabel: field.value,
      })),
    ].map((field) => ({ ...field, fileTemplateId: newModel.id }));

    await prisma.field.createMany({ data: allFields });
    return newModel;
  }
  return null;
};

export const GetModelsById = async (id: string) => {
  return await prisma.fileTemplate.findUnique({
    where: { id },
    select: { id: true, modelName: true },
  });
};

export const GetHeadersByFileTemplateId = async (id: string) => {
  return await prisma.field.findMany({
    where: { fileTemplateId: id },
    select: { fieldType: true, fieldLabel: true, id: true },
  });
};

export const fieldsByFiletemplateId = async (fileTemplateId: string) => {
  return await prisma.field.findMany({ where: { fileTemplateId } });
};

export const getModelById = async (id: string) => {
  return await prisma.fileTemplate.findUnique({ where: { id } });
};

export const createNewFile = async (fileData: FileData[]) => {
  return await prisma.file.createMany({ data: fileData });
};

export const GetFilesByFieldIds = async (fieldIds: string[]) => {
  const files = await prisma.file.findMany({
    where: { fieldId: { in: fieldIds } },
    select: { id: true, value: true, fieldId: true },
  });

  const groupedFiles = files.reduce((acc, file) => {
    if (!acc[file.fieldId]) acc[file.fieldId] = [];
    acc[file.fieldId].push(file);
    return acc;
  }, {} as Record<string, typeof files>);

  return (
    Object.values(groupedFiles)[0]?.map((_, index) =>
      fieldIds.reduce((acc, fieldId) => {
        const file = groupedFiles[fieldId]?.[index];
        if (file) {
          acc[fieldId] = file.value;
          acc.id = file.id;
        }
        return acc;
      }, {} as Record<string, string>)
    ) || []
  );
};

export const deleteFile = async (fileId: string) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId },
    select: { commonId: true },
  });

  if (file) {
    return await prisma.file.deleteMany({
      where: { commonId: file.commonId },
    });
  }
  return null;
};

export const getFileById = async (id: string) => {
  const file = await prisma.file.findUnique({
    where: { id },
    select: { commonId: true },
  });
  if (file) {
    return await prisma.file.findMany({
      where: { commonId: file.commonId },
      select: {
        id: true,
        value: true,
        fieldId: true,
        field: { select: { fieldType: true, fieldLabel: true } },
      },
    });
  }
  return null;
};

export const updateFile = async (fileId: string, fileInfos: FileInfo[]) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId },
    select: { commonId: true },
  });

  if (!file) {
    throw new Error("File not found");
  }

  const updatePromises = fileInfos.map((info) =>
    prisma.file.update({
      where: {
        commonId: file.commonId,
      },
      data: { value: info.value },
    })
  );

  try {
    const results = await prisma.$transaction(updatePromises);
    return results.length > 0;
  } catch (error) {
    console.error("Error updating files:", error);
    throw new Error("Failed to update files");
  }
};
