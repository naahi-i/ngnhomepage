![logo](.vitepress/theme/assets/icon/footLogo.svg)  
# 上游模板仓库[vitepress-theme-bluearchive](https://github.com/Alittfre/vitepress-theme-bluearchive)  

## [**>访问网站<**](https://ngnhomepage.top)  
面向GPT编程  

## 画上游以外的饼
### 已完成
- [x] 背景音乐及其控件  
### 饼
- [ ] 个签使用一言API
- [ ] 更顺滑的动效
- [ ] 随机背景图
- [ ] 音乐频谱效果

## 主题配置
**音乐** **首页背景** **头像**在`.vitepress/theme/assets/banner`  

>在 `.vitepress/theme/components/Banner.vue` 中修改背景类型(视频/图片)  

**配置文件**在`.vitepress/config.mts`

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

## 已知问题
- 手机模式下部分浏览器出现视频可被点击至新页
- 手机模式下菜单栏选项字体可能变成竖向排版

## 引用
- [Blueaka@kivo.fun](https://kivo.fun/) BA 游戏字体
