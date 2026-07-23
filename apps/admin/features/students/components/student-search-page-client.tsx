'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Breadcrumb, Button, Card, Field, Input, PageLayout, toast } from '@/components/ui';

type StudentSearchPageClientProps = {
  searchAction: (formData: FormData) => Promise<{ id: number }>;
};

export const StudentSearchPageClient = ({ searchAction }: StudentSearchPageClientProps) => {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.set('nis', nis);
      formData.set('guardianPhone', guardianPhone);

      const student = await searchAction(formData);

      toast.success('Siswa ditemukan.');

      router.push(`/students/${student.id}`);
    } catch {
      toast.error('Data siswa tidak ditemukan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout className="bg-background min-h-screen">
      <PageLayout.Header>
        <Breadcrumb homePath="/" items={[{ label: 'Cari Siswa', href: '/' }]} />
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="container mx-auto flex items-center justify-center">
          <div className="mx-auto max-w-md">
            <Card className="space-y-6">
              <div className="container mx-auto text-center flex flex-col justify-center">
                <h1 className="text-3xl font-bold">Pencarian Siswa</h1>
                <p className="text-muted-foreground mt-2">
                  Cari siswa menggunakan NIS dan nomor telepon orang tua/wali.
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <Field label="NIS" required>
                  <Input
                    value={nis}
                    onChange={(e) => setNis(e.target.value)}
                    placeholder="Masukkan NIS siswa"
                    disabled={isLoading}
                  />
                </Field>

                <Field label="Nomor Telepon Orang Tua/Wali" required>
                  <Input
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="Masukkan nomor telepon"
                    disabled={isLoading}
                  />
                </Field>
              </div>

              <div className="flex justify-center">
                <Button disabled={!nis || !guardianPhone} onClick={handleSearch}>
                  Cari
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};
