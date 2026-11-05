// Illustrative values for the UI prototype; no system information is read.
export const device = {
  uptime: '2d 14h 32m',
  ipAddress: '192.0.2.42',
  ethernet: 'linkUp' as 'linkUp' | null,
  linkSpeed: '1 Gbps',
  audioOutput: 'hw:0,0',
  pcmStream: 'PREPARED',
  pcmFormat: '96 kHz · S32_LE · 2 ch',
  mpdStatus: 'running' as 'running' | null,
  mpdError: null as string | null,
  softwareVersion: '0.1.0',
} as const

// Fixed ranges and generated samples are illustrative, not measured values.
export function deviceSample(step: number) {
  return {
    receive: Math.max(0, 1.2 + .5 * Math.sin(step / 3) + .2 * Math.sin(step / 1.4)),
    send: Math.max(0, .18 + .08 * Math.sin(step / 4)),
    cpu: Math.round(18 + 5 * Math.sin(step / 3) + 2 * Math.sin(step / 1.5)),
    temperature: Math.round(44 + 2 * Math.sin(step / 7)),
  }
}
