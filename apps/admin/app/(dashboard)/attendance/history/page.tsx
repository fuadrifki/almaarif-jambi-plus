import { redirect } from 'next/navigation';

export default function AttendanceHistoryPage() {
  redirect('/attendance?tab=history');
}
