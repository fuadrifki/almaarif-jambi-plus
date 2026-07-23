'use server';

import { searchStudent } from '@/features/students/server-actions/search-student';

import { StudentSearchPageClient } from '@/features/students/components/student-search-page-client';

export const StudentSearchPage = async () => {
  return <StudentSearchPageClient searchAction={searchStudent} />;
};
