export function setTimerType(timer: any): string {
  let d: any = new Date(timer)
  let ConvertedYear: string = d.getFullYear().toString()
  let ConvertedMonth: string = (d.getMonth() + 1).toString()
  let ConvertedDate: string = d.getDate().toString()
  ConvertedMonth =
    ConvertedMonth.length < 2 ? '0' + ConvertedMonth : ConvertedMonth
  ConvertedDate = ConvertedDate.length < 2 ? '0' + ConvertedDate : ConvertedDate
  return `${ConvertedYear}-${ConvertedMonth}-${ConvertedDate}`
}

export function setTimerTypes(timer: any): string {
  let d: any = new Date(timer)
  let ConvertedYear: string = d.getFullYear().toString()
  let ConvertedMonth: string = (d.getMonth() + 1).toString()
  let ConvertedDate: string = d.getDate().toString()
  ConvertedMonth =
    ConvertedMonth.length < 2 ? '0' + ConvertedMonth : ConvertedMonth
  ConvertedDate = ConvertedDate.length < 2 ? '0' + ConvertedDate : ConvertedDate
  return `${ConvertedYear}年${ConvertedMonth}月${ConvertedDate}日`
}
