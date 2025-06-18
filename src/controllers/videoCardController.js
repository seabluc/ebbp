'use server'
import 'server-only';
import { Part, VideoCard } from '@/models';

export const getAllVideoCards = async () => {
  return await VideoCard.findAll({
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

export const getVideoCard = async (videoCardId) => {
  return await VideoCard.findByPk(videoCardId, {
    include: { model: Part, as: 'part' },
    raw: true,
    nest: true
  });
};

