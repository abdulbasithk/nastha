'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Event extends Model{}
  Event.init({
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    participant: DataTypes.STRING,
    date: DataTypes.DATE,
    note: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};