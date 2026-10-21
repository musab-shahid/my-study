declare module 'node:url' {
  export const URL: typeof globalThis.URL;
  export function fileURLToPath(url: string | URL): string;
}
