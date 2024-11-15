![logo](.vitepress/theme/assets/icon/footLogo.svg)  
# 上游模板仓库[vitepress-theme-bluearchive](https://github.com/Alittfre/vitepress-theme-bluearchive)  

## [**>让我看看<**](https://ngnhomepage.top)  

## ⚙️正在：重新设计和布局页面元素  
面向GPT编程  
优化在学了在学了 T T  

## 主题配置
**音乐** **首页背景** **头像**在`.vitepress/theme/assets/banner`  

**配置文件**在`.vitepress/config.mts`

```ts
export default defineConfigWithTheme<ThemeConfig>({
  //...

  // 站点标题配置
  title: "Sensei's 部落格",
  description: "Sensei's 部落格",

  themeConfig: {
    //banner区配置
    videoBanner: false, //是否显示视频背景
    name: "Sensei's 部落格", //首页标题
    welcomeText: 'Hello, VitePress', //首页欢迎语
    motto: ['和你的日常，就是奇迹', '何気ない日常で、ほんの少しの奇跡を見つける物語。'], //首页motto
    social: [ //社交链接配置(netease_music,coolapk,reddit)
      { icon: 'github', url: 'https://github.com/' },
      { icon: 'bilibili', url: 'https://www.bilibili.com/' },
      { icon: 'qq', url: 'https://im.qq.com/index/' },
      { icon: 'wechat', url: 'https://weixin.qq.com/' },
    ],

    //footer配置
    footerName: 'Sensei',
    poweredList: [
      { name: 'VitePress', url: 'https://github.com/vuejs/vitepress' },
      { name: 'GitHub Pages', url: 'https://docs.github.com/zh/pages' },
    ],

    //gitalk配置
    clientID: 'YourClientID',
    clientSecret: 'YourClientSecret',
    repo: 'YourRepoName',
    owner: 'YourGitHubName',
    admin: ['YourGitHubName'],
  }
}),
```

## 引用
- [Blueaka@kivo.fun](https://kivo.fun/) BA 游戏字体
