import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib';

import type { BreadcrumbItem, BreadcrumbProps } from './breadcrumb.types';

const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
  const hasHref = item.href && !isLast;

  const content = (
    <span className="ads-breadcrumb__link ads-breadcrumb__link--current" aria-current="page">
      {item.icon && <item.icon className="ads-breadcrumb__icon" />}
      {item.label}
      {isLast && !item.href && <ChevronRight className="ads-breadcrumb__chevron" />}
    </span>
  );

  if (hasHref) {
    return (
      <a href={item.href} className="ads-breadcrumb__link">
        {item.icon && <item.icon className="ads-breadcrumb__icon" />}
        {item.label}
      </a>
    );
  }

  return content;
};

export const Breadcrumb = ({ showHome = false, items, className, ...props }: BreadcrumbProps) => {
  const homeItem = {
    label: 'Home',
    href: '/',
  };

  const filteredItems = showHome ? [homeItem, ...items] : items;
  const lastIndex = filteredItems.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={cn('ads-breadcrumb', className)} {...props}>
      <ol className="ads-breadcrumb__list">
        {filteredItems.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <li key={index} className="ads-breadcrumb__item">
              {renderItem(item, isLast)}

              {index < lastIndex && (
                <span className="ads-breadcrumb__separator">
                  <ChevronRight className="ads-breadcrumb__chevron" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
