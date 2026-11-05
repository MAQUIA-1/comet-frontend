import { useMessages } from '../i18n'
import { scenarios } from '../mocks/playback'
import type { MockPlayback, Scenario } from '../mocks/playback'

export function DevTools({ playback }: { playback: MockPlayback }) {
  const { development: text, playback: labels } = useMessages()
  return <details className="dev-tools">
    <summary>{text.title}</summary>
    <div className="dev-tools-body">
      <p>{labels.mockOnly}</p>
      <label htmlFor="dev-scenario">{labels.preview}</label>
      <select id="dev-scenario" value={playback.scenario} onChange={event => playback.changeScenario(event.target.value as Scenario)}>
        {scenarios.map(value => <option key={value} value={value}>{labels[value]}</option>)}
      </select>
    </div>
  </details>
}
