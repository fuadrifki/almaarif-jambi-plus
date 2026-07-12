export type UserRole = 'admin' | 'teacher';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};
