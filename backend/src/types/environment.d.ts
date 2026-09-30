declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      GOOGLE_MAPS_API_KEY: string;
      DB_CONNECTION_STRING: string;
    }
  }
}

export {};
