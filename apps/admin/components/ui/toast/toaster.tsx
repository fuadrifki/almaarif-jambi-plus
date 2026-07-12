'use client';

import { Toaster as SonnerToaster } from 'sonner';

type ToasterProps = {
  position?:
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export const Toaster = ({ position = 'bottom-right' }: ToasterProps) => (
  <SonnerToaster
    position={position}
    richColors
    closeButton
    toastOptions={{
      classNames: {
        toast: 'ads-toast',
        title: 'ads-toast__title',
        description: 'ads-toast__description',
        actionButton: 'ads-toast__action',
        cancelButton: 'ads-toast__cancel',
        closeButton: 'ads-toast__close',
      },
    }}
  />
);
