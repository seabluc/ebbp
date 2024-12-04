"use server"
import connection from "@/lib/mysql/db";

export async function getCpuComponents() {
  const [rows] = await connection.query(`
    SELECT Cpu.*, Cpu.memoryMax AS cpuMemoryMax, Part.*, 
      Cpu.socket AS cpuSocket, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM Cpu
    JOIN Part ON Cpu.partId = Part.partId
    WHERE image NOT LIKE '%no-image%'
  `);
  return rows;
}

export async function getMotherboardComponents() {
  const [rows] = await connection.query(`
    SELECT Motherboard.*, Part.*, Motherboard.memoryMax AS motherboardMemoryMax, 
      Motherboard.memoryType AS motherboardMemoryType, 
      Motherboard.socket AS motherboardSocket,
      CAST(Part.price AS DECIMAL(10,2)) AS price,
      GROUP_CONCAT(MotherboardMemorySpeed.memorySpeed) AS supportedSpeeds
    FROM Motherboard
    JOIN Part ON Motherboard.partId = Part.partId
    LEFT JOIN MotherboardMemorySpeed ON Motherboard.motherboardId = MotherboardMemorySpeed.motherboardId
    WHERE image NOT LIKE '%no-image%'
    GROUP BY Motherboard.motherboardId
  `);
  return rows;
}

export async function getMemoryComponents() {
  const [rows] = await connection.query(`
    SELECT Memory.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM Memory
    JOIN Part ON Memory.partId = Part.partId
    WHERE Memory.formFactor IN ('288-pin DIMM (DDR4)', '288-pin DIMM (DDR5)') AND image NOT LIKE '%no-image%'
  `);
  return rows;
}

export async function getStorageComponents() {
  const [rows] = await connection.query(`
    SELECT Storage.*, Part.*, Storage.type AS storageType, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM Storage
    JOIN Part ON Storage.partId = Part.partId
    WHERE image NOT LIKE '%no-image%' AND Storage.type NOT LIKE 'Hybrid'
  `);
  return rows;
}

export async function getVideoCardComponents() {
  const [rows] = await connection.query(`
    SELECT VideoCard.*, Part.*, VideoCard.memoryType AS videoCardMemoryType, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM VideoCard
    JOIN Part ON VideoCard.partId = Part.partId
    WHERE image NOT LIKE '%no-image%'
  `);
  return rows;
}

export async function getCpuCoolerComponents() {
  const [rows] = await connection.query(`
    SELECT CpuCooler.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price,
      GROUP_CONCAT(CpuCoolerSocket.socket) AS supportedSockets
    FROM CpuCooler
    JOIN Part ON CpuCooler.partId = Part.partId
    LEFT JOIN CpuCoolerSocket ON CpuCooler.cpuCoolerId = CpuCoolerSocket.cpuCoolerId
    WHERE image NOT LIKE '%no-image%'
    GROUP BY CpuCooler.cpuCoolerId
  `);
  return rows;
}

export async function getPowerSupplyComponents() {
  const [rows] = await connection.query(`
    SELECT PowerSupply.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM PowerSupply
    JOIN Part ON PowerSupply.partId = Part.partId
    WHERE image NOT LIKE '%no-image%'
  `);
  return rows;
}