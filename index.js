const { Band } = require("./models/Band");
const { Musician } = require("./models/Musician");
const { Song } = require("./models/Song");
// Define associations here

// Band OneToMany Musitians 
Band.hasMany(Musician)
Musician.belongsTo(Band)

// async function main() { 
//     const band = await Band.create({ name: 'test', genre: 'pop'})
//     const musician = await Musician.create({ name: 'Test', instrument: 'guitar'})
//     const updatedBand = await band.addMusician(musician)
//     const musiciansInBands = await band.getMusicians()
//     // // console.log('GET MUSICIANS->',musiciansInBands)
//     // const bands = await Band.findAll()
//     // bands.forEach((band) => console.log(band.getMusicians()))
//     console.log(musician.__proto__)
// }
// main()

module.exports = {
  Band,
  Musician,
  Song,
};
