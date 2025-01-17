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
  darkMode: boolean
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
  darkMode: false,
})

export function useStore() {
  return { state }
}
