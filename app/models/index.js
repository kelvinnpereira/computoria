'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../../config/database.json');
config = config[env] ? config[env] : config['development'];
const db = {};
const models = require(__dirname + '/../../database/models');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(models).forEach(name => {
  const model = models[name](sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;