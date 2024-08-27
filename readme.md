![logo](.vitepress/theme/assets/icon/footLogo.svg)  
## 上游模板仓库[vitepress-theme-bluearchive](https://github.com/Alittfre/vitepress-theme-bluearchive)  

## [**>在线预览<**](https://ngnhomepage.top)  

## 画上游以外的饼
- [ ] 个签使用一言API
- [ ] 更顺滑的动效

## 主题配置
首页头图和头像在`.vitepress/theme/assets/banner`

配置文件在`.vitepress/config.mts`

```ts
export interface ThemeConfig {
  //banner
  name: string // 首页名字
  welcomeText: string // 首页问候语
  motto: [string 1 , string2],// 首页签名
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
