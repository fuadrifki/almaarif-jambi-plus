export const TEACHER_POSITIONS = [
  'Guru',
  'Guru Tahfidz',
  'Kepala Sekolah',
  'Waka Kurikulum',
  'Waka Kesiswaan',
] as const;

export type TeacherPosition = (typeof TEACHER_POSITIONS)[number];

export type Teacher = {
  id: number;
  code: string;
  name: string;
  email: string;
  password: string;
  role: 'teacher';
  photo: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  phone: string;
  formalEducation: string;
  boardingEducation: string;
  position: TeacherPosition;
  createdAt: Date;
  updatedAt: Date;
};

export type TeacherListItem = Pick<
  Teacher,
  'id' | 'code' | 'name' | 'email' | 'photo' | 'position'
>;
