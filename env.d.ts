declare module "*.svg";
declare module "*.ttf";
declare module "@env" {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
  export const HASH_WARNING: string;
  export const VIRTUALIZED_WARNING: string;
}
