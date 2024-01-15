import nock from 'nock';

export const scope = nock('http://localhost:4001')
  .get("/movie/user/")
  .reply(200, [
    {
      id: 1,
      name: 'Test Movie',
      poster_image: 'test_image.jpg',
      score: '8.5',
      genres: [{ genre: { name: 'Action', id: '1' } }],
    },
  ]);