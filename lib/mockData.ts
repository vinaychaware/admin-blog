// src/lib/mockData.ts

export const mockUsers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    updatedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    posts: [{}, {}, {}],
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'editor',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    updatedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    posts: [{}],
  },
  {
    id: '3',
    name: 'Carol Lee',
    email: 'carol@example.com',
    role: 'author',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    updatedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    posts: [{}, {}],
  },
];