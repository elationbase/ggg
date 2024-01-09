/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ImportMetaEnv = {
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
