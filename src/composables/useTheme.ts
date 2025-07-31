import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

// This state is shared across all components that use this composable
const theme = ref<Theme>('light')

// This part runs only once when the module is imported
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('theme') as Theme | null
  if (storedTheme) {
    theme.value = storedTheme
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = prefersDark ? 'dark' : 'light'
  }
}

// This effect runs whenever `theme.value` changes
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
  }
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme,
  }
}