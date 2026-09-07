export type Role = 'orgAdmin' | 'manager' | 'salesRep';
export interface TestUser { email: string; password: string; role: Role }

export const testUsers: Record<Role, TestUser> = {
  orgAdmin: { role: 'orgAdmin', email: process.env.ORG_ADMIN_EMAIL ?? '', password: process.env.ORG_ADMIN_PASSWORD ?? '' },
  manager: { role: 'manager', email: process.env.MANAGER_EMAIL ?? '', password: process.env.MANAGER_PASSWORD ?? '' },
  salesRep: { role: 'salesRep', email: process.env.SALES_REP_EMAIL ?? '', password: process.env.SALES_REP_PASSWORD ?? '' },
};

export const hasCredentials = (role: Role) => Boolean(testUsers[role].email && testUsers[role].password);
export const credentialsRequired = (role: Role) => `${role} credentials are not configured; set the matching variables in .env.`;
