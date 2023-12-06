export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    notifications: {
      position: 'top-0 bottom-auto'
    },
    verticalNavigation: {
      padding: 'px-3 py-2 my-1',
      active: 'text-primary-500 dark:text-primary-400 before:bg-primary-300/50 dark:before:bg-primary-800/50',
      icon: {
        active: 'text-primary-500 dark:text-primary-400',
      }
    }
  }
})