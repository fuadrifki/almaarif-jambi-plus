import { ChevronRight, House } from 'lucide-react';

import { cn } from '@/lib';

import type { BreadcrumbItem, BreadcrumbProps } from './breadcrumb.types';
import Link from 'next/link';
import { Button } from '../button';

const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
  const hasHref = item.href && !isLast;

  const content = (
    <Button variant="ghost" size="sm" disabled leftIcon={item.icon && <item.icon size={16} />}>
      {item.label}
    </Button>
  );

  if (hasHref) {
    return (
      item.href && (
        <Link href={item.href} className="ads-breadcrumb__link flex items-center">
          <Button variant="ghost" size="sm" leftIcon={item.icon && <item.icon size={16} />}>
            {item.label}
          </Button>
        </Link>
      )
    );
  }

  return content;
};

export const Breadcrumb = ({ showHome = true, items, className, ...props }: BreadcrumbProps) => {
  const homeItem: BreadcrumbItem = {
    href: '/dashboard',
    icon: House,
  };

  const filteredItems = showHome ? [homeItem, ...items] : items;
  const lastIndex = filteredItems.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={cn('ads-breadcrumb', className)} {...props}>
      <div className="ads-breadcrumb__list flex items-center">
        {filteredItems.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <div key={index} className="ads-breadcrumb__item flex items-center">
              {renderItem(item, isLast)}

              {index < lastIndex && (
                <span className="ads-breadcrumb__separator">
                  <ChevronRight size={16} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
