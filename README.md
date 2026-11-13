# 施金翔 · 个人作品集

网站地址为 https://shijinxiang.github.io/ ，使用原生 HTML、CSS、JavaScript，由 GitHub Pages 发布。

本次界面按用户提供的 Nowsome 参考包接入组件 DOM 和 CSS。固定导航、首屏状态面板、作品展台、右侧项目列表、开发方向和关于区均使用包内对应的组件结构。交互通过本站脚本适配。

精选项目包括协序、深渊岛、企业知识库 RAG、VoiceOps、开放题记录库、翻译桌宠与 PULSE。资料按 2026-11-13 的公开 README 和发布页整理，项目列表在 selected-projects.js 中维护。

主要文件

- index.html 为首页，project.html 为项目详情模板。
- reference-components.css 为参考包组件样式的选用部分。
- site.css 为中文内容、图片、移动菜单和本站交互的适配。
- project-components.css 衔接现有详情页布局与稳定地址。
- portfolio.js 处理导航、项目筛选、键盘选择、详情和图片放大。
- selected-projects.js 维护项目资料、版本、来源、链接与图片尺寸。

深渊岛使用 GitHub 介绍页对应的七张实机宣传图。协序使用其 README 工作台截图，PULSE 使用公开网站当前界面，翻译桌宠使用仓库中的桌宠素材。三个既有应用的图片为已存的演示界面，版本与功能说明依据当前公开资料更新。

可使用静态 HTTP 服务预览。源码推送到 main 后由 GitHub Pages 更新。项目来源与字体许可见 ASSET-SOURCES.md 和 assets/fonts。

本版页面采用图片展示。基础练习仓库由 GitHub 主页承接，精选清单有意维护。
