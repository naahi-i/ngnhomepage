import { defineConfigWithTheme } from 'vitepress'

export interface ThemeConfig {
  //navBar
  menuList: { name: string; url: string }[]

  //banner
  videoBanner: boolean
  name: string
  welcomeText: string
  motto: string[]
  social: { icon: string; url: string }[]

  //footer
  footerName: string
  poweredList: { name: string; url: string }[]

  //gitalk
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
}

export default defineConfigWithTheme<ThemeConfig>({
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // gitalk
    ['link', { rel: 'stylesheet', href: 'https://unpkg.com/gitalk/dist/gitalk.css' }],
    ['script', { src: 'https://unpkg.com/gitalk/dist/gitalk.min.js' }],
    // bluearchive font
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/font/Blueaka/Blueaka.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/font/Blueaka_Bold/Blueaka_Bold.css',
      },
    ],
  ],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://ngnhomepage.top',
  },
  title: "Sensei 柠果柠",
  description: "Sensei 柠果柠",
  themeConfig: {
    // navBar
    menuList: [
      { name: '首页', url: '' },
      { name: '标签', url: 'tags/' },
    ],

    //banner区配置
    videoBanner: true,
    name: "Sensei 柠果柠",
    welcomeText: 'Ciallo～(∠・ω< )⌒★',
    motto: [
      '历史给人类的教训就是，人类从不会从历史中汲取教训。',
      '得不到的永远在骚动，被偏爱的都有恃无恐。',
      '何気ない日常で、ほんの少しの奇跡を見つける物語。',
      '人至少有一个梦想，有个理由去坚强，心若没有栖息的地方，到哪里都是流浪。',
    ],
    social: [
      { icon: 'github', url: 'https://github.com/naahi-i/' },
      { icon: 'bilibili', url: 'https://space.bilibili.com/2082433753' },
      { icon: 'qq', url: 'https://qm.qq.com/q/5yLJ5I3zpe' },
      { icon: 'tw', url: 'https://x.com/GuoPian97866?t=9TWIkJfhH9kFa53uUm1EUw&s=09' },
    ],

    //footer配置
    footerName: 'Sensei',
    poweredList: [
      { name: 'VitePress', url: 'https://github.com/vuejs/vitepress' },
      { name: 'GitHub Pages', url: 'https://docs.github.com/zh/pages' },
    ],

    //gitalk配置
    clientID: 'Ov23liweDUB3VxSW21Ab',
    clientSecret: '6fe2f5df9e51306e81c6e4cf23270e3940598269',
    repo: 'ngn-myhomepage',
    owner: 'naahi-i',
    admin: ['naahi-i'],
  },
  markdown: {
    theme: 'github-light',
    lineNumbers: true,
    math: true,
  },
})
