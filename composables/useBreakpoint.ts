const screens = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}
type ScreensKey = keyof typeof screens

const breakpoints = reactive({
  w: 0,
  h: 0,
  is: 'xs',
  gt(size: ScreensKey) {
    return this.w > screens[size]
  },
  gte(size: ScreensKey) {
    return this.w >= screens[size]
  },
  lt(size: ScreensKey) {
    return this.w < screens[size]
  },
  lte(size: ScreensKey) {
    return this.w <= screens[size]
  },
})

function getBreakpoint(w: number) {
  if (w >= screens.xl)
    return 'xl'
  else if (w >= screens.lg)
    return 'lg'
  else if (w >= screens.md)
    return 'md'
  else if (w >= screens.sm)
    return 'sm'
  else if (w >= screens.xs)
    return 'sm'
  else return 'all'
}

function setBreakpoint() {
  breakpoints.w = window.innerWidth
  breakpoints.h = window.innerHeight
  breakpoints.is = getBreakpoint(window.innerWidth)
}

function useBreakpoint() {
  onMounted(() => {
    setBreakpoint()
    window.addEventListener('resize', () => {
      setBreakpoint()
    })
  })

  return breakpoints
}

export default useBreakpoint
