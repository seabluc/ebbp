/*
import connection from '@/lib/db.js';

const seedData = async () => {
  try {
    const processors = [
      { manufacturer: 'Intel', lineup: 'i7', model: 12700, base_clock: 3.6, 
        boost_clock: 4.9, cores: 10, threads: 20, socket: 'LGA1200', 
        max_mem: 128, mem_types: 'DDR5', tdp: 110, pcie_gen: 5 },
    ];

    for (const processor of processors) {
      await connection.query('INSERT INTO processors (manufacturer, lineup, model, base_clock, boost_clock, cores, threads, socket, max_mem, mem_types, tdp, pcie_gen)',
      [processor.manufacturer, processor.lineup, processor.model, processor.base_clock, processor.boost_clock, processor.cores, processor.threads, processor.socket, processor.max_mem, processor.mem_types, processor.tdp, processor.pcie_gen]
      );
    }
    console.log('Data seeded successfully');
    await connection.end(); // close the connection pool
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
*/