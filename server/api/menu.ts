export default defineEventHandler((_) => {
  return [
    [
      { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
      { label: 'Statistics', icon: 'i-heroicons-chart-bar', to: '/statistics' },
      { label: 'Reports', icon: 'i-heroicons-clipboard-document-list', to: '' },
      { label: 'Maps', icon: 'i-heroicons-map', to: '' },
    ],
    [
      { label: 'Products', icon: 'i-heroicons-cube', to: '' },
      { label: 'Transactions', icon: 'i-heroicons-banknotes', to: '' },
      { label: 'Partners', icon: 'i-heroicons-users', to: '' },
    ],
    [
      { label: 'Activity Log', icon: 'i-heroicons-clock', to: '' },
      { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '' },
      { label: 'About', icon: 'i-heroicons-information-circle', to: '' },
    ],
  ]
})
