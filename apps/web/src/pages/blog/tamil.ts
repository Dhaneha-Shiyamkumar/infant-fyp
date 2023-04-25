import { faker } from '@faker-js/faker';

export default [
  {
    id: faker.datatype.uuid(),
    title: 'tamil blog post example',
    cover: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    para: ['first para', 'secodn para'],
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    author: {
      name: faker.name.fullName(),
      avatarUrl: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    },
  },
  {
    id: faker.datatype.uuid(),
    title: 'tamil blog post example',
    cover: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    para: ['first para', 'secodn para'],
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    author: {
      name: faker.name.fullName(),
      avatarUrl: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    },
  },
  {
    id: faker.datatype.uuid(),
    title: 'tamil blog post example',
    cover: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    para: ['first para', 'secodn para'],
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    author: {
      name: faker.name.fullName(),
      avatarUrl: `https://cdn.pixabay.com/photo/2014/02/06/18/35/fountain-260307_960_720.jpg`,
    },
  },
];
