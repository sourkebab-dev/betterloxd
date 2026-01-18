export function debounce<T extends (...args: any[]) => any> (fn: T, thresholdMs = 350) {
  let timeout: number | undefined

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, thresholdMs)
  }
}
