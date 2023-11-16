import '@windwalker-io/unicorn/src/types';
import AlpineGlobal from 'alpinejs';
import SRP from '@windwalker-io/srp';

declare global {
  var grecaptcha: any;
  var Alpine = AlpineGlobal;
  var SRPClient = SRP.SRPClient;
}
