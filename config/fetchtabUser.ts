export const fetchTabUser = {
  email: process.env.FETCHTAB_EMAIL ?? '',
  password: process.env.FETCHTAB_PASSWORD ?? '',
};

export const hasFetchTabCredentials = () => Boolean(fetchTabUser.email && fetchTabUser.password);
