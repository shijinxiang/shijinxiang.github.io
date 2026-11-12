# 施金翔 · 精选作品集

公开网站：<https://shijinxiang.github.io/>

2026-11-13 版参考 nowsome.mv 的黑白编辑式排版、Bebas Neue 大标题、描边字、细线分区与案例编排，重新实现为独立的个人作品集。页面文案、项目资料与图片均为施金翔自己的内容。

## 当前展示

有意维护五个精选项目：深渊岛、企业知识库 RAG、开放题记录库、VoiceOps、翻译桌宠。首页支持按类别筛选、前后切换和键盘切换；每项有独立详情地址，例如 `project.html?id=shenyuan-island`。深渊岛使用公开仓库的真实截图，并链接到 v0.2.0 Windows 发布页。

基础刷题静态页和较早的小型游戏 Demo 不进入当前精选。全站使用明确的项目清单，不自动把所有 GitHub 仓库加入页面。

## 源码

- `index.html`：首页与个人介绍。
- `project.html`：项目档案页模板。
- `selected-projects.js`：五个项目的文案、技术、图片、链接和展示顺序。
- `portfolio.css` / `portfolio.js`：响应式样式、分类、项目切换、手机菜单与截图放大。
- `assets/selected/`：深渊岛实机图；`assets/screens/` 保留三项应用的真实演示截图。
- `assets/fonts/`：本地字体和 OFL 许可。
- `DESIGN.md` / `ASSET-SOURCES.md`：当前设计与素材来源。

原生 HTML/CSS/JavaScript，无构建依赖，GitHub Pages 从 main 根目录发布。可用静态 HTTP 服务预览。当前页面不加载视频、旧版脚本、旧版样式或完整仓库快照；历史资源与电影工程保留用于溯源。原始简历 PDF 不在站点中。

## 维护

在 `selected-projects.js` 手动更新当前项目，避免未经整理的仓库自动进入精选。图片应来自真实项目，无法提供实机图时明确使用字标封面。VoiceOps 的模拟实现、RAG 的模型配置要求及各演示状态保留在项目说明中。
