import { StudentForm } from '../components/student-form';

export const StudentCreatePage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Tambah Siswa</h1>

        <p className="mt-2 text-secondary">Masukkan data siswa baru.</p>
      </section>

      <StudentForm />
    </div>
  );
};
