'use server'
import 'server-only';
import { Part } from '@/models';

export const getAllParts = async () => {
  return await Part.findAll({
    raw: true,
    nest: true
  });
};

export const getPart = async (partId) => {
  return await Part.findByPk(partId, {
    raw: true,
    nest: true
  });
};