export default defineEventHandler((_) => {
  return {
    categories: [
      'Red Ring',
      'Silver Ring',
      'Black Ring',
      'Gold Ring',
      'Blue Ring',
      'Green Ring',
      'White Ring',
    ],
    series: [
      {
        name: 'Previous Year',
        data: [
          4502,
          5434,
          3440,
          5890,
          1340,
          1890,
          1002,
        ],
      },
      {
        name: 'Current Year',
        data: [
          6566,
          5002,
          4921,
          2991,
          2002,
          1644,
          1440,
        ],
      },
    ],
  }
  return [
    { id: 1, name: 'Red Ring', sold: 6566 },
    { id: 2, name: 'Silver Ring', sold: 5002 },
    { id: 3, name: 'Black Ring', sold: 4921 },
    { id: 4, name: 'Gold Ring', sold: 2991 },
    { id: 5, name: 'Green Ring', sold: 2002 },
    { id: 6, name: 'Blue Ring', sold: 1644 },
    { id: 7, name: 'White Ring', sold: 1440 },
  ]
})
