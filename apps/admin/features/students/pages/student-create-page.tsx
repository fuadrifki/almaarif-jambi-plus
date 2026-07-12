import { StudentForm } from '../components/student-form';

export const StudentCreatePage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">Tambah Siswa</h1>

        <p className="mt-2 text-(--text-secondary)">Masukkan data siswa baru.</p>
      </section>

      <StudentForm />
    </div>
  );
};
