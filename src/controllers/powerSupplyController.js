'use server'
import 'server-only';
import { Part, PowerSupply } from '@/models';

export const getAllPowerSupplies = async () => {
  return await PowerSupply.findAll({
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

export const getPowerSupply = async (psuId) => {
  return await PowerSupply.findByPk(psuId, {
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

