export const testData = {
  validUser: {
    email: process.env.FETCHTAB_EMAIL || 'suraj12@yopmail.com',
    password: process.env.FETCHTAB_PASSWORD || 'Suraj@1234'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword@123'
  },
  bookmark: {
    title: 'Google',
    url: 'https://www.google.com'
  },
  secondBookmark: {
    title: 'GitHub',
    url: 'https://github.com'
  }
};