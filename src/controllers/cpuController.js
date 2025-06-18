'use server'
import 'server-only';
import { Part, Cpu } from '@/models';

export const getAllCpus = async () => {
  return await Cpu.findAll({
    include: { model: Part, as: 'part' },
    raw: true, // turn sequelize instance into JS object
    nest: true // to show/access Part properties (e.g. {cpu.part?.name})
  });
};

export const getCpu = async (cpuId) => {
  return await Cpu.findByPk(cpuId, {
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};