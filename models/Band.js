const {DataTypes, Model, db} = require('../db');


class Band extends Model{};

Band.init(
{
name: DataTypes.STRING,
genre: DataTypes.STRING
},{
    sequelize: db,
    modelName: "Band",
});
async function init (){
    await Band.create({
           name:"bad bunny",
           genre:"trap",
          })
  }
  init()
module.exports = {
    Band
};