/* 填入 GitHub 用户名后，所有访客都会看到你的公开项目。
   可填写 name、eyebrow、description、about 自定义个人文案。
   featuredRepos 按优先顺序填写仓库名；hiddenRepos 用于隐藏仓库。 */
window.PORTFOLIO_CONFIG = {
  githubUsername: 'shijinxiang',
  name: '施金翔',
  eyebrow: 'AI APPLICATIONS / RAG & LLM AGENTS',
  description: '广西民族大学人工智能专业本科在读，专注 AI 应用、RAG 与 LLM 智能体开发。把知识检索、工具与自动化，做成可以使用的应用。',
  about: '围绕 Python、FastAPI、LangChain 与 LangGraph 开发 AI 应用，具备前后端、数据持久化与容器部署实践。也持续参与模型评测与数据质量工作，在构建与验证中打磨自己的工程能力。',
  toolkit: ['Python','FastAPI','LangChain','LangGraph','Next.js','Vue 3','PostgreSQL','Docker'],
  featuredRepos: ['rag', 'VoiceOps', 'open-prompt'],
  hiddenRepos: ['shijinxiang.github.io'],
  includeForks: false,
  repoOverrides: {
    'rag': {title:'企业知识库 RAG 智能体', category:'web', cover:3, description:'面向企业知识库的问答系统，结合文档处理、混合检索与引用溯源，用 LangGraph 编排智能体与工具调用。', tags:['FastAPI','LangGraph','Next.js']},
    'VoiceOps': {title:'VoiceOps 售后工单', category:'web', cover:4, description:'售后知识检索与工单自动化演示平台，支持音频上传、模拟转写、人工确认建单与通知流程。', tags:['FastAPI','Vue 3','n8n']},
    'open-prompt': {title:'开放题记录库', category:'tools', description:'管理题目、考点、模型回复与截图的 Windows 本地题库，配套 Chrome 填写助手，让记录与整理更顺手。', tags:['React','Electron','Vite']},
    'deskpet-WDY': {title:'翻译桌宠 TranslatePet', category:'tools', description:'以桌宠为入口的 Windows 学习工具，将截图 OCR 翻译与 TypeWords 打字记词放进日常桌面。', tags:['C#','WPF','.NET 8']},
    'website': {title:'习概刷题网站', category:'web', description:'支持章节练习、错题整理与收藏的刷题网站，在浏览器中保存练习记录，让复习更有条理。', tags:['JavaScript','HTML / CSS','LocalStorage']},
    'dongVSjin': {title:'东金决战', category:'creative', description:'基于 Godot 的 2D 像素横版格斗原型，探索本地双人对战、练习与合作闯关。', tags:['Godot','GDScript','2D Game']},
    'heroVSgrandpa': {title:'Hero VS Grandpa', category:'creative', description:'围绕主角与武士对战的 2D 动作游戏 Demo，尝试连招、二段跳与战斗 AI。', tags:['Godot','GDScript','Pixel Art']},
    'wwweb': {title:'习概刷题 · 静态版', category:'web', description:'纯静态刷题网站，支持分类练习、错题与收藏筛选，并在本地保存学习记录。', tags:['JavaScript','HTML / CSS','Study']},
    'myweb': {title:'ICT 昇腾 AI 备考系统', category:'web', description:'面向 ICT 昇腾 AI 备考的单页练习系统，提供练习与考试模式、答题计时和错题重测。', tags:['HTML','JavaScript','Exam']},
  },
};

window.PORTFOLIO_CONFIG.projectDetails = {
  rag: {
    kind: '知识检索与智能体', image: './assets/screens/rag.webp', imageAlt: '企业知识库 RAG 的真实问答工作空间',
    points: ['文档处理与混合检索', '来源引用与 Agent 工具编排'],
    features: ['上传与解析 PDF、DOCX、Markdown 和 TXT 文档。', '结合向量与关键词检索组织上下文，回答保留来源引用。', '通过 LangGraph 编排路由与工具调用，并提供角色权限和异步处理。'],
    note: '项目原型。实际向量化和回答生成需配置模型服务；图中为示例工作空间。'
  },
  VoiceOps: {
    kind: '售后流程自动化 · 演示原型', image: './assets/screens/voiceops.webp', imageAlt: 'VoiceOps 独立演示环境中的速记与流转工作台',
    points: ['政策知识匹配与处理建议', '人工确认与工单流转'],
    features: ['围绕退货、维修、物流咨询组织售后会话。', '将音频上传、模拟转写、信息脱敏与知识检索串入同一流程。', '提供人工确认建单、幂等处理与通知接口。'],
    note: '语音转写与默认通知包含模拟实现。截图使用独立演示数据，展示流程和界面结构。'
  },
  'open-prompt': {
    kind: 'Windows 本地工具', image: './assets/screens/open-prompt.webp', imageAlt: '开放题记录库中的独立演示记录',
    points: ['问题、考点和回复统一收录', '本地资料、截图与备份'],
    features: ['将题目、关键洞察、考点与多个模型的回复放在同一记录中。', '支持截图附件、归档筛选和五模型排序资料。', '提供 JSON 备份、TXT 导出与配套 Chrome 填写助手。'],
    note: 'Windows 桌面应用。图中为专门制作的界面演示记录，不包含真实模型评测结果。'
  },
  'deskpet-WDY': {kind:'Windows 桌面工具', features:['通过桌宠入口使用截图 OCR 翻译。','结合 TypeWords 进行打字记词。','使用 C#、WPF 与 .NET 8 构建桌面界面。']},
  website: {kind:'在线学习网站', features:['按章节组织题目与练习。','整理错题、收藏和章节统计。','在浏览器本地保存学习记录。']},
  dongVSjin: {kind:'Godot 游戏原型', features:['2D 像素横版格斗玩法。','本地双人对战、练习与合作闯关模式。'],note:'玩法原型，运行方式和操作说明见仓库。'},
  heroVSgrandpa: {kind:'Godot 动作 Demo', features:['主角与武士的横版战斗场景。','连招、二段跳与战斗 AI 的玩法探索。'],note:'游戏 Demo，侧重战斗机制探索。'},
  wwweb: {kind:'静态学习网站', features:['分类练习与错题、收藏筛选。','使用浏览器本地存储记录学习状态。']},
  myweb: {kind:'ICT 昇腾 AI 备考工具', features:['练习与考试两种答题模式。','答题计时、成绩统计和错题重测。']}
};
