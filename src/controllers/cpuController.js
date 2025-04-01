'use server'
import 'server-only';
import { Part, Cpu } from '@/models';

export const getAllCpus = async () => {
  return await Cpu.findAll({
    include: { model: Part },
    raw: true, // turn sequelize instance into JS object
    nest: true // to show/access Part properties (e.g. {cpu.Part?.name})
  });

  /*
  try {
    const cpus = await Cpu.findAll({ include: Part });
    return Response.json(cpus, { status: 200 });
  } catch (err) {
    return Response.json({ err: "Failed to fetch CPUs." }, { status: 500 });
  }
  */
};

export const getCpu = async (cpuId) => {
  return await Cpu.findByPk(cpuId, {
    include: { model: Part },
    raw: true,
    nest: true
  });

  /*
  const cpuRow = await Cpu.findByPk(cpuId, {
    include: { model: Part },
    raw: true,
    nest: true
  });
  console.log(`\nCpu retrieved ... cpuId: ${cpuId}`);
  return cpuRow;
  */
};