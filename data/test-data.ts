export const testData = {
  validUser: {
    email: process.env.FETCHTAB_EMAIL || 'suraj12@yopmail.com',
    password: process.env.FETCHTAB_PASSWORD || 'Suraj@1234'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword@123'
  },
  signup: {
    fullName: process.env.FETCHTAB_SIGNUP_NAME || 'Suraj Playwright',
    role: process.env.FETCHTAB_SIGNUP_ROLE || 'QA Engineer',
    email: process.env.FETCHTAB_SIGNUP_EMAIL || `suraj22@yopmail.com`,
    password: process.env.FETCHTAB_SIGNUP_PASSWORD || 'Password@123'
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