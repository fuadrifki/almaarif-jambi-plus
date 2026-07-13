'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib';
import { Button } from '@/components/ui/button';

import type { ComponentPropsWithoutRef } from 'react';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) => (
  <AlertDialogPrimitive.Overlay className={cn('ads-alert-dialog__overlay', className)} {...props} />
);

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />

    <AlertDialogPrimitive.Content className={cn('ads-alert-dialog', className)} {...props}>
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
);

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogTitle = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title className={cn('ads-alert-dialog__title', className)} {...props} />
);

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    className={cn('ads-alert-dialog__description', className)}
    {...props}
  />
);

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogFooter = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('ads-alert-dialog__footer', className)} {...props} />
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogAction = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) => (
  <AlertDialogPrimitive.Action asChild>
    <Button variant="danger" size="md" className={className} {...props}>
      {children}
    </Button>
  </AlertDialogPrimitive.Action>
);

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) => (
  <AlertDialogPrimitive.Cancel asChild>
    <Button variant="secondary" size="md" className={className} {...props}>
      {children}
    </Button>
  </AlertDialogPrimitive.Cancel>
);

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
