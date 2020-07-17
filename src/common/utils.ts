let timer: any

export function throttle(fn: any, delay: number): void {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    fn()
    timer = undefined
  }, delay)
}

// export function debounce(func, delay = 500) {
//   let timer = null
//   return function(...args) {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
