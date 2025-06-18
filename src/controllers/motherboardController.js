'use server'
import 'server-only';
import { Part, Motherboard, MotherboardMemorySpeed } from '@/models';

export const getAllMotherboards = async () => {
  return await Motherboard.findAll({
    include: [
      { model: Part },
      //{ model: MotherboardMemorySpeed }
    ],
    raw: true,
    nest: true
  });
};

export const getMotherboard = async (motherboardId) => {
  return await Motherboard.findByPk(motherboardId, {
    include: [
      { model: Part },
      { model: MotherboardMemorySpeed, as: 'MotherboardMemorySpeeds' }
    ],
    //raw: true,
    //nest: true
  });
};

