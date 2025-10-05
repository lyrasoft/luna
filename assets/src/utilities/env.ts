export function isMac(): boolean {
  return detectOS() === 'macOS';
}

export function detectOS(): 'macOS' | 'Windows' | 'Linux' | 'unknown' {
  // Enable when TypeScript supports the navigator.userAgentData
  // if ('userAgentData' in navigator && navigator.userAgentData.platform) {
  //   const platform = navigator.userAgentData.platform.toLowerCase();
  //
  //   if (platform.includes('mac')) {
  //     return 'macOS';
  //   }
  //
  //   if (platform.includes('win')) {
  //     return 'Windows';
  //   }
  // }

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('mac os')) {
    return 'macOS';
  }

  if (userAgent.includes('windows')) {
    return 'Windows';
  }

  if (userAgent.includes('linux')) {
    return 'Linux';
  }

  return 'unknown';
}
