export default defineEventHandler((_) => {
  return {
    categories: [
      'Great Club',
      'Longsword',
      'Claymore',
      'Uchigatana',
      'Bandit Knife',
      'Mace',
      'Winged Spear',
    ],
    series: [
      {
        name: 'Sales',
        data: [
          26.2,
          17.1,
          10.3,
          7.4,
          2.8,
          2.1,
          4.5,
        ],
      },
      {
        name: 'Costs',
        data: [
          8.4,
          4.2,
          2.1,
          3.4,
          1.2,
          1.5,
          4.4,
        ],
      },
      {
        name: 'Profit',
        data: [
          17.8,
          12.9,
          8.2,
          4,
          1.6,
          0.6,
          0.1,
        ],
      },
    ],
  }
})
