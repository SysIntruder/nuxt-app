export default defineEventHandler((event) => {
    return [
        [
            { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
            { label: 'Statistics', icon: 'i-heroicons-chart-bar', to: '' },
            { label: 'Reports', icon: 'i-heroicons-clipboard-document-list', to: '' },
            { label: 'Maps', icon: 'i-heroicons-map', to: '' },
            { label: 'Events', icon: 'i-heroicons-calendar', to: '' },
        ], [
            { label: 'Products', icon: 'i-heroicons-cube', to: '' },
            { label: 'Stores', icon: 'i-heroicons-building-storefront', to: '' },
            { label: 'Discounts', icon: 'i-heroicons-banknotes', to: '' },
        ], [
            { label: 'Activity Log', icon: 'i-heroicons-clock', to: '' },
            { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '' },
            { label: 'Help', icon: 'i-heroicons-lifebuoy', to: '' },
        ]
    ]
})