# 页面设计与交互核对

2026-11-02。单页改版，依据项目内 claude-design、design-taste-frontend 与 hallmark；影片按 video-shotcraft 制作。

- 结构：Split Studio，N9 导航与 Ft6 个人落款。保留 9 个真实项目，用三个交替图文单元说明代表作品，其余为紧凑目录。
- 字体：Space Grotesk + Noto Sans SC，本地加载；页面正文 16px，标题正体，颜色引用 tokens.css 中命名 OKLCH 变量。
- 真实性：使用真实界面截图与独立演示数据。VoiceOps 标注模拟转写和演示原型；不声明客户数量、生产性能或模型评测结果。
- 响应式：320 / 375 / 414 / 768px 检查无横向溢出、无按钮内容溢出；1280×800 首屏主操作和视频均在视口内。
- 操作：RAG 搜索只返回相关项目；分类、排序、无结果状态、详情、Escape 关闭及焦点恢复已验证。
- 视频：静音播放、循环、暂停/继续与声音开关已验证；减少动态与 API 不可用在独立测试页面验证，项目仍显示 9 个。
- 色彩：正文、弱化文字、强调文字和焦点环对比度已计算，数值见 contrast.json；媒体内容中的产品原有配色不被重绘。
- 未使用的样式规则（轮播器、价格卡、客户证言、装饰头像等）记为不适用；影片单独保留独立审查报告。旧 styles.css 保留历史兼容，新页面加载 tokens.css 与 studio.css。

预交付自评：Philosophy 4 / Hierarchy 4 / Execution 4 / Specificity 5 / Restraint 5 / Variety 4。
