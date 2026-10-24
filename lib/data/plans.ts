export type Operator = 'jio' | 'airtel' | 'vi'

export type Plan = {
  id: string
  operator: Operator
  price: number
  validityDays: number
  dataPerDayGB: number | null
  totalDataGB: number
  unlimited5G: boolean
  perks: string[]
}

export const OPERATORS: Record<Operator, { name: string; dotClass: string }> = {
  jio: { name: 'Jio', dotClass: 'bg-[oklch(0.5_0.17_260)]' },
  airtel: { name: 'Airtel', dotClass: 'bg-[oklch(0.58_0.21_25)]' },
  vi: { name: 'Vi', dotClass: 'bg-[oklch(0.72_0.16_75)]' },
}

function daily(
  id: string,
  operator: Operator,
  price: number,
  validityDays: number,
  dataPerDayGB: number,
  unlimited5G: boolean,
  perks: string[] = [],
): Plan {
  return {
    id,
    operator,
    price,
    validityDays,
    dataPerDayGB,
    totalDataGB: dataPerDayGB * validityDays,
    unlimited5G,
    perks,
  }
}

function bulk(
  id: string,
  operator: Operator,
  price: number,
  validityDays: number,
  totalDataGB: number,
  perks: string[] = [],
): Plan {
  return { id, operator, price, validityDays, dataPerDayGB: null, totalDataGB, unlimited5G: false, perks }
}

// Sample prepaid plans for comparison only. Prices change often — confirm on the operator's app.
export const PLANS: Plan[] = [
  bulk('jio-189', 'jio', 189, 28, 2, ['Unlimited calls', '300 SMS']),
  daily('jio-299', 'jio', 299, 28, 1.5, false, ['Unlimited calls', '100 SMS/day']),
  daily('jio-349', 'jio', 349, 28, 2, true, ['Unlimited calls', '100 SMS/day']),
  daily('jio-449', 'jio', 449, 28, 3, true, ['Unlimited calls', '100 SMS/day']),
  daily('jio-889', 'jio', 889, 84, 1.5, false, ['Unlimited calls', 'Music app']),
  daily('jio-1029', 'jio', 1029, 84, 2, true, ['Unlimited calls', 'OTT bundle']),
  daily('jio-3599', 'jio', 3599, 365, 2.5, true, ['Unlimited calls', '100 SMS/day']),

  bulk('airtel-199', 'airtel', 199, 28, 2, ['Unlimited calls', '300 SMS']),
  daily('airtel-299', 'airtel', 299, 28, 1, false, ['Unlimited calls', '100 SMS/day']),
  daily('airtel-349', 'airtel', 349, 28, 1.5, false, ['Unlimited calls', '100 SMS/day']),
  daily('airtel-379', 'airtel', 379, 30, 2, true, ['Unlimited calls', 'Spam alerts']),
  daily('airtel-859', 'airtel', 859, 84, 1.5, false, ['Unlimited calls', '100 SMS/day']),
  daily('airtel-979', 'airtel', 979, 84, 2, true, ['Unlimited calls', 'OTT bundle']),
  daily('airtel-3599', 'airtel', 3599, 365, 2, true, ['Unlimited calls', '100 SMS/day']),

  bulk('vi-199', 'vi', 199, 28, 2, ['Unlimited calls', '300 SMS']),
  daily('vi-299', 'vi', 299, 28, 1, false, ['Unlimited calls', 'Weekend data rollover']),
  daily('vi-349', 'vi', 349, 28, 1.5, false, ['Unlimited calls', 'Night data 12–6 AM']),
  daily('vi-365', 'vi', 365, 28, 2, true, ['5G in select cities', 'Night data 12–6 AM']),
  daily('vi-859', 'vi', 859, 84, 1.5, false, ['Unlimited calls', 'Data delight']),
  daily('vi-979', 'vi', 979, 84, 2, true, ['5G in select cities', 'Night data 12–6 AM']),
  daily('vi-3499', 'vi', 3499, 365, 1.5, false, ['Unlimited calls', 'Weekend data rollover']),
]
