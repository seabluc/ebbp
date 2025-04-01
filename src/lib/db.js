import { Sequelize } from "sequelize";
import { options } from "./config.mjs";

const dbOptions = options;
const mysql2 = await import("mysql2");
dbOptions.dialectModule = mysql2;

const sequelize = new Sequelize(dbOptions);

sequelize.authenticate().then(() => {
  console.log("\nsequelize.authenticate() ... Promise settled and fulfilled - connection successful\n");
}).catch((err) => {
  console.log("\nsequelize.authenticate() ... Promise settled and rejected - error: " + err + "\n");
});

export default sequelize;