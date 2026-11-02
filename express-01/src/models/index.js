import Sequelize from "sequelize";
import pg from "pg";
import User from "./User.js";
import Academico from "./academico.js";
import Profissional from "./Profissional.js";
import Projetos from "./Projetos.js";

import getUserModel from "./User.js";
import getMessageModel from "./message.js";

User.hasMany(Academico, { foreignKey: 'userId', onDelete: 'CASCADE' });
Academico.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Profissional, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profissional.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Projetos, { foreignKey: 'userId', onDelete: 'CASCADE' });
Projetos  .belongsTo(User, { foreignKey: 'userId' });


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Academico: Academico,
  Profissional: Profissional,
  Projetos: Projetos,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});


export { sequelize, User, Message, Academico, Profissional, Projetos };

export default models;
