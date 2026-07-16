export type UserRole = 'admin' | 'teacher';

export type User = {
  id: string;
  name: string;
  code: string;
  email: string;
  password: string;
  role: UserRole;
};
