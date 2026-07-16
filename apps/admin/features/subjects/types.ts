export type Class = {
  id: string;
  code: string;
  name: string;
  level: number;
  academicLevel: string;
  gender: 'male' | 'female' | 'mixed';
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
