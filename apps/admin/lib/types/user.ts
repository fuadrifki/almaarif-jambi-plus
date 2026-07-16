export type UserRole = 'admin' | 'teacher';

export type User = {
  id: number;
  name: string;
  code: string;
  email: string;
  password: string;
  role: UserRole;
};
