// učitavamo cars.csv kao sirovi tekst preko Vitea (raw)
import raw from '../data/cars.csv?raw'

// stupci koje treba pretvoriti iz stringa u broj, ostali ostaju tekst
const numericFields = new Set([
  'year_start',
  'year_end',
  'msrp_eur',
  'power_kw',
  'torque_nm',
  'zero_to_100_kmh_sec',
  'top_speed_kmh',
  'curb_weight_kg',
  'wheelbase_mm',
  'fuel_capacity_l',
  'cargo_volume_l',
])

// jednostavan CSV parser - dovoljan jer nijedno polje ne sadrži zarez ili navodnike
function parseCars(csv) {
  const [headerLine, ...lines] = csv.trim().split('\n')
  const headers = headerLine.split(',')

  return lines.map((line) => {
    const values = line.split(',')
    const car = {}
    headers.forEach((header, i) => {
      car[header] = numericFields.has(header) ? Number(values[i]) : values[i]
    })
    return car
  })
}

export const cars = parseCars(raw)
