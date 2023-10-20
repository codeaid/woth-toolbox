declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL?: string;
      NEXT_PUBLIC_BASE_PATH?: string;
      NEXT_PUBLIC_GOOGLE_ANALYTICS?: string;
    }
  }
}
