export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    notifications: {
      position: 'top-0 bottom-auto',
    },
    verticalNavigation: {
      padding: 'px-3 py-2 my-1',
      active: 'text-primary-500 dark:text-primary-400 before:bg-primary-300/50 dark:before:bg-primary-800/50',
      icon: {
        active: 'text-primary-500 dark:text-primary-400',
      },
    },
    dropdown: {
      padding: 'p-2',
      background: 'bg-gray-50 dark:bg-gray-900',
      item: {
        active: 'text-gray-900 dark:text-white bg-gray-200/50 dark:bg-gray-800/50',
        inactive: 'text-gray-500 dark:text-gray-400',
        size: 'text-sm font-medium',
        icon: {
          active: 'text-gray-900 dark:text-white',
          inactive: 'text-gray-500 dark:text-gray-400',
        },
      },
    },
  },
})
