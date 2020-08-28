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

export function TotalPriceCalc(
  pPrice: string,
  ptWeight: string,
  pCost: string,
  qtity: string
): string {
  let productWeight: number = parseFloat(ptWeight)
  let processCost: number = parseFloat(pCost)
  let quantity: number = parseFloat(qtity)
  let adderssnum: number = parseFloat(pPrice)
  if (ptWeight != '') {
    adderssnum *= productWeight
  }
  if (pCost != '') {
    adderssnum += processCost
  }
  adderssnum *= quantity
  let adders: string = adderssnum.toFixed(2)
  return adders
}

export function fmoney(s: string, n: number): string {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s
      .split('.')[0]
      .split('')
      .reverse(),
    r = s.split('.')[1]
  let t: string = ''
  for (let i: number = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
  }
  return (
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  )
}
