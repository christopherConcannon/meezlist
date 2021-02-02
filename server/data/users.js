import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'wacko',
    email: 'wacko@gmail.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    name: 'jacko',
    email: 'jacko@gmail.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    name: 'smacko',
    email: 'smacko@gmail.com',
    password: bcrypt.hashSync('password123', 10)
  },
]

export default users