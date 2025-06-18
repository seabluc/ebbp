'use server'
import 'server-only';
import { Part, CpuCooler, CpuCoolerSocket } from '@/models';

export const getAllCpuCoolers = async () => {
  return await CpuCooler.findAll({
    include: [
      { model: Part },
      /*{ model: CpuCoolerSocket }*/
    ],
    raw: true,
    nest: true
  });
};

export const getCpuCooler = async (cpuCoolerId) => {
  return await CpuCooler.findByPk(cpuCoolerId, {
    include: [
      { model: Part },
      { model: CpuCoolerSocket, as: 'CpuCoolerSockets' }
    ],
    //raw: true,
    //nest: true
  });
};

