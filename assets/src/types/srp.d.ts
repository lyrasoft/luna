import { SRPClient } from '@windwalker-io/srp';

type HasherFunc = Parameters<typeof SRPClient.prototype.setHasher>[0];

export interface SRPOptions {
  prime: string | undefined;
  generator: string | undefined;
  key: string | undefined;
  size: number;
  hasher: 'sha1'|'sha256'|'sha384'|'sha512'|HasherFunc;
  identitySelector: string,
  passwordSelector: string,
}
