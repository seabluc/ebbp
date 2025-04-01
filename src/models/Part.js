import { Model, DataTypes } from "sequelize";
import sequelize from "@/lib/db";

class Part extends Model { }

Part.init(
  {
    partId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partNum: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: 'Part',
    sequelize
  }
);

export default Part;