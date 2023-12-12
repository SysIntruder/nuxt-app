export default defineEventHandler((_) => {
  return [
    { title: 'Revenue', status: 'good', diff: 'inc', percentage: 16.4, total: 74.4, currency: true },
    { title: 'Expense', status: 'bad', diff: 'inc', percentage: 10.6, total: 27.8, currency: true },
    { title: 'Profit', status: 'good', diff: 'inc', percentage: 12.2, total: 46.6, currency: true },
    { title: 'Product Types', status: 'good', diff: 'inc', percentage: 3.2, total: 14, currency: false },
    { title: 'Products Sold', status: 'bad', diff: 'dec', percentage: 1.1, total: 128, currency: false },
  ]
})
