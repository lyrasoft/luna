import SRP from '@windwalker-io/srp';
import AlpineGlobal from 'alpinejs';

declare global {
  var grecaptcha: any;
  var turnstile: any;
  var Alpine = AlpineGlobal;
  var SRPClient = SRP.SRPClient;
}

