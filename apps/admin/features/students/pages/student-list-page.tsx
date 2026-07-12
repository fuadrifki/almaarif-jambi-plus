import { studentRepository } from '@/lib/data';

import { StudentList } from '../components/student-list';

export const StudentListPage = async () => {
  const students = studentRepository.findAll();

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">Siswa</h1>

        <p className="mt-2 text-(--text-secondary)">Kelola data siswa pesantren.</p>
      </section>

      <StudentList students={students} />
    </div>
  );
};
