export interface SRPOptions {
  prime: string | undefined;
  generator: string | undefined;
  key: string | undefined;
  size: number;
  identitySelector: string,
  passwordSelector: string,
}
