import { defineConfigWithTheme } from 'vitepress'
export interface ThemeConfig {
  //navBar
  menuList: { name: string; url: string }[]

  //banner
  name: string
  welcomeText: string
  motto: string
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
    ['link', { rel: 'icon', href: 'public/favicon.ico' }],
    // gitalk
    ['link', { rel: 'stylesheet', href: 'https://unpkg.com/gitalk/dist/gitalk.css' }],
    ['script', { src: 'https://unpkg.com/gitalk/dist/gitalk.min.js' }],
    // lxwk font
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-gb-screen/font.css',
      },
    ],
  ],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://vitepress-theme-bluearchive.vercel.app',
  },
  title: "Sensei's 柠果柠",
  description: "Sensei's 柠果柠",
  themeConfig: {
    // navBar
    menuList: [
      { name: '首页', url: '' },
      { name: '标签', url: 'tags/' },
    ],

    //banner区配置
    name: "Sensei's 柠果柠",
    // welcomeText: '这是个测试页',
    motto: '历史给人类的教训就是，人类从不会从历史中汲取教训。',
    social: [
      { icon: 'github', url: 'https://github.com/naahi-i/' },
      { icon: 'bilibili', url: 'https://space.bilibili.com/2082433753' },
      { icon: 'qq', url: 'https://qm.qq.com/q/5yLJ5I3zpe' },
      // { icon: 'wechat', url: 'https://weixin.qq.com/' },
    ],

    //footer配置
    footerName: 'Sensei',
    poweredList: [
      { name: 'VitePress', url: 'https://github.com/vuejs/vitepress' },
      { name: 'GitHub Pages', url: 'https://docs.github.com/zh/pages' },
    ],

    //gitalk配置
    clientID: 'Ov23lisNVkLJL51HnmP3',
    clientSecret: '8de26c219901d1f34499eae4c0d76a4d1e50153d',
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
