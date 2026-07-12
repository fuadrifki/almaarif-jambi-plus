import { toast as sonnerToast } from 'sonner';

import type { ExternalToast } from 'sonner';

type ToastOptions = ExternalToast & {
  title?: string;
  description?: string;
};

const toast = {
  success: (message: string, options?: ToastOptions) => sonnerToast.success(message, options),

  error: (message: string, options?: ToastOptions) => sonnerToast.error(message, options),

  warning: (message: string, options?: ToastOptions) => sonnerToast.warning(message, options),

  info: (message: string, options?: ToastOptions) => sonnerToast.info(message, options),

  message: (message: string, options?: ToastOptions) => sonnerToast(message, options),

  loading: (message: string, options?: ToastOptions) => sonnerToast.loading(message, options),

  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

export { toast };
