import { cpuColumns } from './cpu'
import { motherboardColumns } from './motherboard'
import { memoryColumns } from './memory'
import { storageColumns } from './storage'
import { videoCardColumns } from './videoCard'
import { cpuCoolerColumns } from './cpuCooler'
import { powerSupplyColumns } from './powerSupply'

export const productColumns = {
  cpu: cpuColumns,
  motherboard: motherboardColumns,
  memory: memoryColumns,
  storage: storageColumns,
  "video-card": videoCardColumns,
  "cpu-cooler": cpuCoolerColumns,
  "power-supply": powerSupplyColumns,
}