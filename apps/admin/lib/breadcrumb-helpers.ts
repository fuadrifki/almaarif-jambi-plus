import type { BreadcrumbItem } from '@/components/ui/breadcrumb';

export const createBreadcrumbItems = {
  student: {
    list: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Students', href: '/students' },
      ] as BreadcrumbItem[],
    create: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Students', href: '/students' },
        { label: 'Create' },
      ] as BreadcrumbItem[],
    detail: (name: string) =>
      [
        { label: 'Home', href: '/' },
        { label: 'Students', href: '/students' },
        { label: name },
      ] as BreadcrumbItem[],
    edit: (name: string, id: string) =>
      [
        { label: 'Home', href: '/' },
        { label: 'Students', href: '/students' },
        { label: name, href: `/students/${id}` },
        { label: 'Edit' },
      ] as BreadcrumbItem[],
  },
  class: {
    list: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Classes', href: '/classes' },
      ] as BreadcrumbItem[],
    create: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Classes', href: '/classes' },
        { label: 'Create' },
      ] as BreadcrumbItem[],
    detail: (name: string) =>
      [
        { label: 'Home', href: '/' },
        { label: 'Classes', href: '/classes' },
        { label: name },
      ] as BreadcrumbItem[],
    edit: (name: string, id: string) =>
      [
        { label: 'Home', href: '/' },
        { label: 'Classes', href: '/classes' },
        { label: name, href: `/classes/${id}` },
        { label: 'Edit' },
      ] as BreadcrumbItem[],
  },
  attendance: {
    list: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Attendance', href: '/attendance' },
      ] as BreadcrumbItem[],
    reports: () =>
      [
        { label: 'Home', href: '/' },
        { label: 'Attendance', href: '/attendance' },
        { label: 'Reports', href: '/attendance/reports' },
      ] as BreadcrumbItem[],
    detail: (name: string) =>
      [
        { label: 'Home', href: '/' },
        { label: 'Attendance', href: '/attendance' },
        { label: name },
      ] as BreadcrumbItem[],
  },
} as const;

export type BreadCrumbHelpers = typeof createBreadcrumbItems;
export type StudentBreadcrumb = BreadCrumbHelpers['student'];
export type ClassBreadcrumb = BreadCrumbHelpers['class'];
export type AttendanceBreadcrumb = BreadCrumbHelpers['attendance'];

export const getStudentBreadcrumbs = {
  list: createBreadcrumbItems.student.list,
  create: createBreadcrumbItems.student.create,
  detail: (name: string) => createBreadcrumbItems.student.detail(name),
  edit: (name: string, id: string) => createBreadcrumbItems.student.edit(name, id),
} as const;

export const getClassBreadcrumbs = {
  list: createBreadcrumbItems.class.list,
  create: createBreadcrumbItems.class.create,
  detail: (name: string) => createBreadcrumbItems.class.detail(name),
  edit: (name: string, id: string) => createBreadcrumbItems.class.edit(name, id),
} as const;

export const getAttendanceBreadcrumbs = {
  list: createBreadcrumbItems.attendance.list,
  reports: createBreadcrumbItems.attendance.reports,
  detail: (name: string) => createBreadcrumbItems.attendance.detail(name),
} as const;
