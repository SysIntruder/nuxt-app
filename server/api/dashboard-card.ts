export default defineEventHandler((_) => {
  return [
    { title: 'Revenue', status: 'good', diff: 'inc', percentage: 16.4, total: 1524580, currency: true },
    { title: 'Cost', status: 'bad', diff: 'inc', percentage: 10.6, total: 310480, currency: true },
    { title: 'Profit', status: 'good', diff: 'inc', percentage: 12.2, total: 1214100, currency: true },
    { title: 'Products Sold', status: 'neutral', diff: 'neu', percentage: 0, total: 24566, currency: false },
  ]
})
