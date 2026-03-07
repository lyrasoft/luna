import { injectCssToDocument } from '@windwalker-io/unicorn-next';
import AOS, { type AosOptions } from 'aos';

export function useAOS(options: AosOptions = {}) {
  injectCssToDocument(() => import('aos/dist/aos.css?raw'));

  AOS.init(options);
}
