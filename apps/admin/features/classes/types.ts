export type Class = {
  id: string;
  code: string;
  name: string;
  level: string;
  academicLevel: string;
  gender: 'male' | 'female' | 'mixed';
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
