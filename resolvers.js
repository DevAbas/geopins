const user = {
  _id: '1',
  name: 'Abas',
  email: 'thr@gmail.com',
  picture: 'http://google.com',
};

module.exports = {
  Query: {
    me: () => user,
  },
};
