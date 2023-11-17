const { db } = require('./db');
const { Band, Musician, Song } = require('./index');

describe('Band, Musician, and Song Models', () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await db.sync({ force: true });
  });

  test('can create a Band', async () => {
    // TODO - test creating a band
    const testBand = await Band.create({ name: 'test', genre: 'fake' });
    expect(testBand).toMatchObject({ name: 'test', genre: 'fake' });
  });

  test('can create a Musician', async () => {
    // TODO - test creating a musician
    const testMusician = await Musician.create({
      name: 'testM',
      instrument: 'fakeM',
    });

    expect(testMusician).toMatchObject({ name: 'testM', instrument: 'fakeM' });
  });

  test('can update a Band', async () => {
    // TODO - test updating a band
    const testBand = await Band.create({ name: 'test', genre: 'fake' });
    testBand.update({ name: 'updated' });
    expect(testBand).toMatchObject({ name: 'updated', genre: 'fake' });
  });

  test('can update a Musician', async () => {
    // TODO - test updating a musician
    const testMusician = await Musician.create({
      name: 'testM',
      instrument: 'fakeM',
    });
    testMusician.update({ name: 'updatedM' });
    expect(testMusician).toMatchObject({
      name: 'updatedM',
      instrument: 'fakeM',
    });
  });

  test('can delete a Band', async () => {
    // TODO - test deleting a band
    const testBand = await Band.create({ name: 'test', genre: 'fake' });
    let res = await testBand.destroy();
    console.log(res);
    expect(res).toMatchObject({ name: 'test', genre: 'fake' });
  });

  test('can delete a Musician', async () => {
    // TODO - test deleting a musician

    const testMusician = await Musician.create({
      name: 'testM',
      instrument: 'fakeM',
    });
    let res = await testMusician.destroy();
    console.log(res);
    expect(res).toMatchObject({ name: 'testM', instrument: 'fakeM' });
  });

  test('OneToMany Relations Band - Musician', async () => {
    const band = await Band.create({ name: 'test', genre: 'pop' });
    const musician = await Musician.create({
      name: 'Test',
      instrument: 'guitar',
    });
    const musicianWithBand = await musician.setBand(band);
    const updatedBand = await band.addMusician(musician);
    const response = await updatedBand.getMusicians();
    const idMusician = musicianWithBand.BandId;
    expect(response[0].BandId).toEqual(idMusician);
  });

  test('A song can be associated with many bands and vice versa', async () => {
    // Create instances of models
    const band1 = await Band.create({ name: 'test', genre: 'pop' });
    const band2 = await Band.create({ name: 'test2', genre: 'metal' });
    const song1 = await Song.create({
      title: 'whatever',
      year: '2010',
      length: 3,
    });

    const song2 = await Song.create({
      title: 'whatever2',
      year: '2011',
      length: 4,
    });

    // Associate song with bands
    await song1.addBands([band1, band2]);

    // Fetch the song with associated bands
    const fetchedSong1 = await Song.findByPk(song1.id, {
      include: Band,
    });

    // Check if the song is associated with the bands
    expect(fetchedSong1.Bands).toHaveLength(2);
    expect(fetchedSong1.Bands.map((band) => band.id)).toEqual(
      expect.arrayContaining([band1.id, band2.id])
    );

    // Similarly, you can test the reverse relationship
    const fetchedBand1 = await Band.findByPk(band1.id, {
      include: Song,
    });

    //band1 also has song1 associated with it
    expect(fetchedBand1.Songs).toContainEqual(
      expect.objectContaining({ id: song1.id })
    );
  });
});
