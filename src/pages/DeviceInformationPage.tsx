import { useEffect, useState } from 'react'
import { useMessages } from '../i18n'
import { device, deviceSample } from '../mocks/device'

export function DeviceInformationPage() {
  const { device: text } = useMessages()
  const [step, setStep] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setStep(value => value + 1), 2000)
    return () => window.clearInterval(timer)
  }, [])
  const current = deviceSample(step)
  const history = Array.from({ length: 24 }, (_, index) => deviceSample(step + index - 23))
  const points = (key: 'receive' | 'send') => history.map((sample, index) => `${index * 100 / (history.length - 1)},${100 - sample[key] / 3 * 100}`).join(' ')
  const audio = [
    [text.outputDevice, device.audioOutput],
    [text.pcmStream, device.pcmStream],
    [text.pcmFormat, device.pcmFormat],
    [text.mpdService, device.mpdStatus ? text[device.mpdStatus] : null],
  ]
  const network = [[text.ethernet, device.ethernet ? text[device.ethernet] : null], [text.linkSpeed, device.linkSpeed], [text.ipAddress, device.ipAddress]]
  const system = [[text.temperature, `${current.temperature} °C`], [text.cpu, `${current.cpu}%`], [text.uptime, device.uptime]]

  return <div className="device-dashboard">
    <section className="device-audio" aria-labelledby="device-audio-title">
      <h2 id="device-audio-title">{text.audio}</h2>
      <dl className="device-audio-details">{audio.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? '—'}</dd>{label === text.mpdService && device.mpdError && <small className="device-audio-error">{device.mpdError}</small>}</div>)}</dl>
    </section>
    <section className="device-section" aria-labelledby="device-network-title">
      <h2 id="device-network-title">{text.network}</h2>
      <dl className="device-network-details">{network.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? '—'}</dd></div>)}</dl>
      <p className="traffic-label">{text.systemTraffic}</p>
      <div className="traffic-chart" role="img" aria-label={text.trafficChart}>
        <div className="traffic-scale"><span>3 Mbps</span><span>0</span></div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="0" x2="100" y2="0" /><line x1="0" y1="100" x2="100" y2="100" /><polyline className="traffic-receive-line" points={points('receive')} /><polyline className="traffic-send-line" points={points('send')} /></svg>
      </div>
      <div className="traffic-time"><span>{text.trafficPast}</span><span>{text.now}</span></div>
      <div className="traffic-values"><div><span className="traffic-receive">{text.receive}</span><strong>{current.receive.toFixed(2)} <small>Mbps</small></strong></div><div><span className="traffic-send">{text.send}</span><strong>{current.send.toFixed(2)} <small>Mbps</small></strong></div></div>
    </section>
    <section className="device-section" aria-labelledby="device-system-title">
      <h2 id="device-system-title">{text.system}</h2>
      <dl className="device-system">{system.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="device-version">{text.softwareVersion} · {device.softwareVersion}</p>
    </section>
  </div>
}
