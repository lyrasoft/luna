import AOS, { type AosOptions } from 'aos';

export function useAOS(options: AosOptions = {}) {
  import('aos/dist/aos.css');

  AOS.init(options);
}
