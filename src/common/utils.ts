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
  adderssnum -= quantity
  let adders: string = adderssnum.toFixed(2)
  return adders
}
