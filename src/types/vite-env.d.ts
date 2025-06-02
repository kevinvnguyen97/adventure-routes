/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DB_CONNECTION_STRING: string;
  readonly VITE_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
