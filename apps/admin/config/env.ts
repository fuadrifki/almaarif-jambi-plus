export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  environment: process.env.NEXT_PUBLIC_APP_ENV!,
} as const;
