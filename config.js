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
