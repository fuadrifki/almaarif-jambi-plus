import { classRepository } from '@/lib/data/class-repository';
import { ClassListPageClient } from './class-list-page-client';

export const ClassListPage = async () => {
  const classes = await classRepository.findAll();

  return <ClassListPageClient classes={classes} />;
};
