const { Band } = require('./models/Band');
const { Musician } = require('./models/Musician');
const { Song } = require('./models/Song');
// Define associations here

// Band OneToMany Musitians
Band.hasMany(Musician);
Musician.belongsTo(Band);

Song.belongsToMany(Band, { through: 'Songs-Band' });
Band.belongsToMany(Song, { through: 'Songs-Band' });

module.exports = {
  Band,
  Musician,
  Song,
};
