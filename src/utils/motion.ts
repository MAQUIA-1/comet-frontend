// CSS is the single source for timing shared with Web Animations.
export function motionOptions(element: HTMLElement, phase: 'enter' | 'exit'): KeyframeAnimationOptions {
  const style = getComputedStyle(element)
  return {
    duration: matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : parseFloat(style.getPropertyValue(`--motion-duration-${phase}`)),
    easing: style.getPropertyValue(`--motion-ease-${phase}`).trim(),
  }
}
