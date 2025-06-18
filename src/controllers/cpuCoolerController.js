'use server'
import 'server-only';
import { Part, CpuCooler, CpuCoolerSocket } from '@/models';

export const getAllCpuCoolers = async () => {
  return await CpuCooler.findAll({
    include: [
      { model: Part, as: 'part' },
      /*{ model: CpuCoolerSocket }*/
    ],
    raw: true,
    nest: true
  });
};

export const getCpuCooler = async (cpuCoolerId) => {
  return await CpuCooler.findByPk(cpuCoolerId, {
    include: [
      { model: Part, as: 'part' },
      { model: CpuCoolerSocket, as: 'CpuCoolerSockets' }
    ],
    //raw: true,
    //nest: true
  });
};

