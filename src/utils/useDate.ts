export function toKhmerDate(isoString: string): string {
  const date = new Date(isoString)

  // Khmer month names
  const khmerMonths = [
    "មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ]

  const day = date.getDate()
  const month = khmerMonths[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}


export function toKhmerDateTime(isoString: string): string {
  const date = new Date(isoString)

  const khmerMonths = [
    "មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ]

  const khmerNumbers = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"]

  const toKhmerNumber = (num: number): string =>
    num.toString().split("").map(d => khmerNumbers[parseInt(d)]).join("")

  const day = toKhmerNumber(date.getDate())
  const month = khmerMonths[date.getMonth()]
  const year = toKhmerNumber(date.getFullYear())

  let hours = date.getHours()
  const minutes = toKhmerNumber(date.getMinutes())
  const seconds = toKhmerNumber(date.getSeconds())

  let period = "ព្រឹក" // default AM
  if (hours >= 12) {
    period = "រសៀល"
    if (hours > 12) hours -= 12
  }
  if (hours === 0) hours = 12

  const hh = toKhmerNumber(hours)

  return `${day} ${month} ${year} ម៉ោង ${hh}:${minutes}:${seconds} ${period}`
}
