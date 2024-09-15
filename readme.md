![logo](.vitepress/theme/assets/icon/footLogo.svg)  
# 上游模板仓库[vitepress-theme-bluearchive](https://github.com/Alittfre/vitepress-theme-bluearchive)  

## [**>访问网站<**](https://ngnhomepage.top)  
面向GPT编程  

## 画上游以外的饼
### 已完成
- [x] 背景音乐及其控件  
### 饼
- [ ] 个签使用一言API
- [ ] 音乐频谱效果

## 主题配置
**音乐** **首页背景** **头像**在`.vitepress/theme/assets/banner`  

**配置文件**在`.vitepress/config.mts`

```ts
export interface ThemeConfig {
  //banner
  videoBanner: boolean // 首页背景类型，默认为图片，可选视频
  name: string // 首页名字
  welcomeText: string // 首页问候语
  motto: [string 1 , string2]// 首页签名,可填多个，随机显示
  social: { icon: string; url: string }[] // 社交平台，icon可选bilibili，github，tw，weibo, wechat, qq, netease_music

  //gitalk配置
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
}
```

## 引用
- [Blueaka@kivo.fun](https://kivo.fun/) BA 游戏字体
