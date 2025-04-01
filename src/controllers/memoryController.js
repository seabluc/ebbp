'use server'
import 'server-only';
import { Part, Memory } from '@/models';

export const getAllMemory = async () => {
  return await Memory.findAll({
    include: { model: Part },
    raw: true,
    nest: true
  });
};

export const getMemory = async (memoryId) => {
  return await Memory.findByPk(memoryId, {
    include: { model: Part },
    raw: true,
    nest: true
  });
};
