export const testData = {
  validUser: {
    email: process.env.FETCHTAB_EMAIL || 'suraj2@yopmail.com',
    password: process.env.FETCHTAB_PASSWORD || 'Suraj@1234'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword@123'
  },
  shareRecipientEmail: process.env.FETCHTAB_SHARE_RECIPIENT_EMAIL || 'suraj1@yopmail.com',
  signup: {
    fullName: process.env.FETCHTAB_SIGNUP_NAME || 'Suraj Sharma',
    role: process.env.FETCHTAB_SIGNUP_ROLE || 'QA Engineer',
    email: process.env.FETCHTAB_SIGNUP_EMAIL || `suraj2@yopmail.com`,
    password: process.env.FETCHTAB_SIGNUP_PASSWORD || 'Suraj@1234'
  },
  bookmark: {
    //title: 'Google',
    title: 'GitHub',
    url: 'https://github.com'
    //url: 'https://www.google.com'
  },
  secondBookmark: {
    title: 'GitHub',
    url: 'https://github.com'
  }
};