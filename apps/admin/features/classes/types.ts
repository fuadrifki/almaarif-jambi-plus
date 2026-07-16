export type Class = {
  id: number;
  code: string;
  name: string;
  level: number;
  academicLevel: string;
  gender: 'male' | 'female' | 'mixed';
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
