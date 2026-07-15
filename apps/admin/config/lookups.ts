import type { SelectOption } from '@/components/ui';

export interface LookupItem extends SelectOption {
  class?: string;
}

export const CLASSES: LookupItem[] = [
  { value: 'class-1', label: 'Tahfidz A' },
  { value: 'class-2', label: 'Tahfidz B' },
  { value: 'class-3', label: 'Tahsin A' },
  { value: 'class-4', label: 'Tahsin B' },
];

export const SUBJECTS: LookupItem[] = [
  { label: 'Fikih (Safinatun Naja)', value: 'fikih_safinatun_naja', class: 'Tingkat Ibtidaiyah' },
  { label: 'Tauhid (Aqidatul Awam)', value: 'tauhid_aqidatul_awam', class: 'Tingkat Ibtidaiyah' },
  { label: 'Akhlak', value: 'akhlak_ibtidaiyah', class: 'Tingkat Ibtidaiyah' },
  { label: 'Nahwu (Al-Ajurumiyah)', value: 'nahwu_al_ajurumiyah', class: 'Tingkat Ibtidaiyah' },
  { label: 'Shorof', value: 'shorof_ibtidaiyah', class: 'Tingkat Ibtidaiyah' },
  { label: "Imla'", value: 'imla', class: 'Tingkat Ibtidaiyah' },
  { label: 'Quran', value: 'quran', class: 'Tingkat Ibtidaiyah' },
  { label: 'Nahwu (Mutammimah)', value: 'nahwu_mutammimah', class: 'Tingkat Tsanawiyah' },
  { label: 'Shorof (Al-Kailani)', value: 'shorof_al_kailani', class: 'Tingkat Tsanawiyah' },
  { label: 'Fikih (Fathul Qorib)', value: 'fikih_fathul_qorib', class: 'Tingkat Tsanawiyah' },
  { label: 'Hadits (Arbain Nawawi)', value: 'hadits_arbain_nawawi', class: 'Tingkat Tsanawiyah' },
  { label: 'Akhlak (Washoya)', value: 'akhlak_washoya', class: 'Tingkat Tsanawiyah' },
  { label: 'Nahwu (Alfiyah Ibnu Malik)', value: 'nahwu_alfiyah', class: 'Tingkat Aliyah' },
  { label: "Fikih (Fathul Mu'in)", value: 'fikih_fathul_muin', class: 'Tingkat Aliyah' },
  { label: 'Ushul Fikih', value: 'ushul_fikih', class: 'Tingkat Aliyah' },
  { label: 'Tafsir', value: 'tafsir', class: 'Tingkat Aliyah' },
  {
    label: 'Balaghah (Jauharul Maknun)',
    value: 'balaghah_jauharul_maknun',
    class: 'Tingkat Aliyah',
  },
  { label: 'Mantiq', value: 'mantiq', class: 'Tingkat Aliyah' },
  {
    label: 'Gramatika Arab Intensif',
    value: 'gramatika_arab_intensif',
    class: "Tingkat I'dadiyah",
  },
  { label: 'Dasar Ilmu Agama', value: 'dasar_ilmu_agama', class: "Tingkat I'dadiyah" },
];

export const TEACHERS: LookupItem[] = [
  { value: 'teacher-1', label: 'Ustadz Ahmad' },
  { value: 'teacher-2', label: 'Ustadzah Fatimah' },
  { value: 'teacher-3', label: 'Ustadz Muhammad' },
  { value: 'teacher-4', label: 'Ustadzah Aminah' },
];

export const ATTENDANCE_STATUSES = [
  { value: 'PRESENT', label: 'Hadir' },
  { value: 'SICK', label: 'Sakit' },
  { value: 'PERMISSION', label: 'Izin' },
  { value: 'ABSENT', label: 'Alpha' },
] as const;
