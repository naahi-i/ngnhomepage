import { reactive } from 'vue'
import { PostData } from '../utils/posts.data'

interface StoreState {
  selectedPosts: PostData[]
  currTag: string
  currPost: PostData
  searchDialog: boolean
  splashLoading: boolean
  fireworksEnabled: boolean
  SpinePlayerEnabled: boolean
  toTopEnabled: boolean
  OptionsDialog: boolean
  darkMode: 'light' | 'dark' | 'system'
}

const state: StoreState = reactive({
  selectedPosts: [],
  currTag: '',
  currPost: {
    id: 0,
    title: '',
    content: '',
    href: '',
    create: 0,
    update: 0,
    tags: [],
    wordCount: 0,
    cover: '',
    excerpt: '',
  },
  searchDialog: false,
  splashLoading: true,
  fireworksEnabled: true,
  SpinePlayerEnabled: true,
  toTopEnabled: true,
  OptionsDialog: false,
  darkMode: (() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('darkMode') || 'system'
      if (storedTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return storedTheme as 'light' | 'dark' | 'system'
    }  
    return 'system'
  })(),
})

export function useStore() {
  return { state }
}
