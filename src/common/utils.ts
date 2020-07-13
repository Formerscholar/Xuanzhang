var timer: any

export function throttle(fn: any, delay: number): void {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    fn()
    timer = undefined
  }, delay)
}
// 时间格式化
export function setTimerType(timer: any): string {
  let d = new Date(timer)
  let ConvertedYear = d.getFullYear().toString()
  let ConvertedMonth = (d.getMonth() + 1).toString()
  let ConvertedDate = d.getDate().toString()
  ConvertedMonth =
    ConvertedMonth.length < 2 ? '0' + ConvertedMonth : ConvertedMonth
  ConvertedDate = ConvertedDate.length < 2 ? '0' + ConvertedDate : ConvertedDate
  return `${ConvertedYear}-${ConvertedMonth}-${ConvertedDate}`
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
