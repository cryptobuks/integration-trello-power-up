export function track () {
  if (window.analytics && window.analytics.track) {
    window.analytics.track.apply(window.analytics, arguments)
  }
}
export default { track }
