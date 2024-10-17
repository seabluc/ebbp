/* good practices:
 * step 1: create models. models reflect tables on server accordingly 
 * instead of inserting directly on phpmyadmin, i should be populating the 
 * database solely through code, more specifically seed scripts.
 * seed scripts r super important devs always use them.
 * populating through code actually allows it to go through validation tests
 * ...
 * create modals through code so users dont mess up data on the server itself
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

/* WHY USE SEEDERS? I HAVE A GUI (PHPMYADMIN) TO VALIDATE DATA. 
 * It's true that a GUI like phpMyAdmin is helpful for checking & manipulating
 * data; however using seeders with Sequelize offers distinct advantages that 
 * complement the development workflow, such as automated data population, 
 * version contrl, consistency, ease of testing, and less manual work.
 * 
 * Seeders allow you to automate the process of populating your database with 
 * initial/test data. Seeders are a good practice for the initiial setup of the
 * database during the development & testing stages. You only run a seed script
 * once and that data stays on your database. The only instance where you will
 * have to rerun your seeders are when you want to update your initial data,
 * clearing existing data and repopulate it with fresh data (after implementing
 * a method to delete the existing data that is), and if the schema changes. `
 * tldr seeders allow consistency across different environments or team members
 * 
 * Version Control - since seeders are written in code, this means you can keep
 * track of changes over time. This provides a history of how the initial data
 * has evolved, making it easier to manage updates and migrations.
 * In a team environment, seeders can be versioned with your code in a Git
 * repo, ensuring all team members have access to the smae initial data set and
 * can easily apply changes.
 * 
*/