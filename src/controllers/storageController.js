'use server'
import 'server-only';
import { Part, Storage } from '@/models';

export const getAllStorage = async () => {
  return await Storage.findAll({
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

export const getStorage = async (storageId) => {
  return await Storage.findByPk(storageId, {
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

