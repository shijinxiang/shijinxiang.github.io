# 施金翔 · 个人作品集

个人网页：<https://shijinxiang.github.io/>

展示 AI 应用开发、RAG 智能体、工单自动化、桌面工具与游戏等公开项目。

使用原生 HTML、CSS、JavaScript，直接由 GitHub Pages 发布，无构建依赖。页面采用 Split Studio 图文结构，首页播放 30 秒项目介绍影片。

- `index.html`：个人介绍与页面结构。
- `config.js`：精选项目、分类、中文简介与项目详情。
- `github-data.js`：公开仓库数据快照，网络不可用时仍可展示项目。
- `app.js`：搜索、筛选、项目详情、GitHub 数据刷新与视频控制。
- `tokens.css` / `studio.css`：本地字体、命名设计变量、响应式布局。
- `assets/media/`：首页影片、封面、字幕与来源说明。
- `assets/screens/`：真实项目界面，使用独立演示数据。
- `assets/fonts/`：本地 WOFF2 字体及开源许可。

视频默认静音循环，可暂停、切换声音和全屏。移出视口或页面不可见时暂停；减少动态偏好下以静态封面开始。公开仓库数据保留本地快照和缓存，GitHub 请求失败仍能浏览已保存项目。

向 `main` 分支推送后，GitHub Pages 自动更新。个人简历原文件不在此仓库。
