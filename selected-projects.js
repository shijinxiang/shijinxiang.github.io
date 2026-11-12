/* Curated portfolio. Additions are intentional; do not import all repositories. */
window.SELECTED_PROJECTS = [
 {
  id:'shenyuan-island',number:'01',name:'深渊岛',english:'SHENYUAN ISLAND',category:'games',kind:'3D 海岛生活游戏',year:'2026',status:'v0.2.0 · Windows 试玩',label:'最新项目',
  summary:'在一座低多边形海岛上，把探索与日常生活连起来。钓鱼、潜水、耕种、烹饪，或开船去看看更远的海岸。',
  image:'./assets/selected/shenyuan-island.webp',alt:'深渊岛实机画面：码头旁的小船、海岸、棕榈树与海面',imageLabel:'游戏实机画面',cover:'game',
  repo:'https://github.com/shijinxiang/shenyuan-island',demo:'https://github.com/shijinxiang/shenyuan-island/releases/tag/v0.2.0',demoLabel:'下载 Windows 试玩',
  tags:['Godot 4.7.2','GDScript','Blender','Forward+'],platform:'Windows / 第三人称',deliverable:'可试玩版本 + 可编辑工程',
  highlights:['海岛探索与水下沉船','种植、烹饪与角色成长','船只、沙滩车与商人委托'],
  context:'一个围绕海岛生活展开的第三人称游戏项目。探索、资源获取、工具使用和生活系统在同一座岛屿中衔接，玩家可以沿着自己的兴趣安排游玩路线。',
  approach:'项目将玩法拆分到 GDScript 模块，以 Godot 场景和着色器组织海岛空间；同时保留可编辑模型、实机记录与协作资料。',
  result:'当前公开版本为 0.2.0，提供 Windows 试玩包和开发工程。仓库保留版本记录、资源核验脚本与实机证据。',
  note:'试玩包约 389 MB。需要支持 Vulkan 的 Windows 设备；下载后完整解压，并保留 EXE、PCK 和许可证目录。',
  features:[
   {title:'生活玩法形成循环',body:'钓鱼、伐木、种植、采集与烹饪围绕资源展开；背包、工具栏、储物箱和技艺经验连接日常操作。'},
   {title:'陆地与水下探索',body:'船只与沙滩车连接不同区域，潜水探索沉船；商人委托、动物交互和地图提供探索线索。'},
   {title:'关注实际操作',body:'围绕工具握持、车辆驾驶、镜头遮挡、背包拖拽与定向交互持续迭代，让系统能在实机中连贯使用。'}
  ],
  flow:['探索海岛','采集与制作','生活与成长','委托与新目标'],
  gallery:[
   {src:'./assets/selected/shenyuan-island.webp',alt:'码头、小船与海岛海岸实机画面',caption:'海岸与船只 / 游戏实机'},
   {src:'./assets/selected/shenyuan-explore.webp',alt:'深渊岛水下鲨鱼、沉船与宝箱实机画面',caption:'水下探索 / 沉船与海洋生物'},
   {src:'./assets/selected/shenyuan-life.webp',alt:'深渊岛为幼苗浇水的实机画面',caption:'海岛日常 / 种植与照料'}
  ]
 },
 {
  id:'rag',number:'02',name:'企业知识库 RAG',english:'KNOWLEDGE AGENT',category:'ai',kind:'知识检索与智能体',year:'2026',status:'应用原型',label:'AI 应用',
  summary:'让文档中的知识成为可以追问、可以核对来源的回答。结合混合检索与智能体编排，把资料处理和问答组织成一条流程。',
  image:'./assets/screens/rag.webp',alt:'企业知识库 RAG 的真实问答工作空间',imageLabel:'真实界面 · 示例工作空间',cover:'interface',
  repo:'https://github.com/shijinxiang/rag',tags:['Python','FastAPI','LangGraph','Next.js'],platform:'Web 应用',deliverable:'检索问答系统与源码',
  highlights:['多格式文档接入与处理','向量与关键词混合检索','来源引用与工具编排'],
  context:'企业资料往往分散在多种格式的文档中。这个项目将资料处理、知识检索与问答接在一起，让使用者能从回答继续核对原始来源。',
  approach:'通过 FastAPI 提供服务，结合向量与关键词检索组织上下文，再以 LangGraph 编排路由和工具调用。前端提供独立问答工作空间。',
  result:'形成了包含文档接入、混合检索、引用溯源和智能体调用的应用原型，并提供角色权限及异步处理。',
  note:'截图来自示例工作空间。实际向量化与回答生成需要配置模型服务。',
  features:[
   {title:'先整理资料，再发起检索',body:'支持 PDF、DOCX、Markdown 和 TXT 文档处理，将不同来源的内容纳入统一的知识检索流程。'},
   {title:'回答保留来源',body:'结合向量和关键词检索组织上下文，并在问答中保留来源引用，方便继续查证。'},
   {title:'编排工具与路由',body:'使用 LangGraph 管理智能体路由和工具调用，并配套权限与异步处理机制。'}
  ],
  flow:['接入文档','混合检索','Agent 编排','带来源的回答'],
  gallery:[{src:'./assets/screens/rag.webp',alt:'企业知识库 RAG 示例问答工作空间',caption:'问答工作空间 / 独立示例状态'}]
 },
 {
  id:'open-prompt',number:'03',name:'开放题记录库',english:'QUESTION STUDIO',category:'tools',kind:'Windows 本地资料工具',year:'2026',status:'桌面应用',label:'效率工具',
  summary:'把题目、考点、模型回复和截图放进同一份记录。为反复比较、整理和归档资料，提供一个可以持续使用的本地工作空间。',
  image:'./assets/screens/open-prompt.webp',alt:'开放题记录库中的独立演示记录',imageLabel:'真实界面 · 独立演示记录',cover:'interface',
  repo:'https://github.com/shijinxiang/open-prompt',tags:['React','Electron','Vite','Chrome 扩展'],platform:'Windows 桌面',deliverable:'本地记录库 + 浏览器助手',
  highlights:['题目、考点与多模型回复关联','截图附件与归档筛选','备份导出与浏览器填写助手'],
  context:'开放题评测和资料整理会产生题目、评价标准、多份回复和截图。分散保存容易失去对应关系，也不利于后续比较与复查。',
  approach:'以记录为中心，将题目、关键洞察、考点、回复和截图组织在一起；通过桌面应用提供本地管理，并配套浏览器填写助手。',
  result:'实现多模型记录、截图附件、归档筛选、排名资料管理，以及 JSON 备份和 TXT 导出等日常工作流程。',
  note:'页面展示的是独立制作的演示记录，不包含真实模型评测结果。',
  features:[
   {title:'资料围绕同一题目组织',body:'将题目、关键洞察、评价考点与多个模型的回复放入同一记录，保留比较时需要的上下文。'},
   {title:'截图与归档一起管理',body:'支持截图附件、归档和筛选，也可保存多模型排序资料，方便后续整理。'},
   {title:'衔接浏览器与本地文件',body:'通过 Chrome 填写助手衔接网页操作，使用 JSON 备份与 TXT 导出保留资料。'}
  ],
  flow:['建立题目','记录考点与回复','补充截图','整理与导出'],
  gallery:[{src:'./assets/screens/open-prompt.webp',alt:'开放题记录库的演示记录界面',caption:'本地记录工作空间 / 演示数据'}]
 },
 {
  id:'voiceops',number:'04',name:'VoiceOps',english:'VOICE TO WORKFLOW',category:'ai',kind:'售后工单流程原型',year:'2026',status:'演示原型',label:'流程自动化',
  summary:'将售后会话、政策检索和工单流转串起来。先给出处理建议，再由人工确认建单，让自动化保留清楚的操作边界。',
  image:'./assets/screens/voiceops.webp',alt:'VoiceOps 独立演示环境中的售后工作台',imageLabel:'真实界面 · 演示数据',cover:'interface',
  repo:'https://github.com/shijinxiang/VoiceOps',tags:['FastAPI','Vue 3','n8n'],platform:'Web 工作台',deliverable:'售后知识检索与工单演示',
  highlights:['音频上传与模拟转写','政策知识匹配与处理建议','人工确认、幂等建单与通知接口'],
  context:'售后会话需要从描述中提取问题、查找政策并转入工单。这个项目围绕退货、维修和物流咨询组织工作台与流程。',
  approach:'把音频上传、模拟转写、信息脱敏和知识匹配放进一条流程；通过人工确认建立工单，并衔接通知接口。',
  result:'形成可演示的售后知识检索与工单流转原型，包含人工确认、幂等处理和自动化接口。',
  note:'语音转写和默认通知包含模拟实现。页面使用独立演示数据，重点展示流程与界面结构。',
  features:[
   {title:'将会话组织成可处理的信息',body:'围绕售后场景接收音频和文本，结合模拟转写与信息脱敏整理会话。'},
   {title:'先匹配知识，再确认处理',body:'检索相关政策并给出处理建议，把关键决定留给人工确认。'},
   {title:'将确认结果转入工单',body:'用幂等处理降低重复建单的风险，并通过通知接口衔接后续自动化流程。'}
  ],
  flow:['售后会话','知识匹配','人工确认','工单流转'],
  gallery:[{src:'./assets/screens/voiceops.webp',alt:'VoiceOps 售后工单演示工作台',caption:'售后工作台 / 模拟转写与演示数据'}]
 },
 {
  id:'translatepet',aliases:['deskpet-wdy'],number:'05',name:'翻译桌宠',english:'TRANSLATEPET',category:'tools',kind:'Windows 截图翻译工具',year:'2026',status:'桌面应用',label:'桌面交互',
  summary:'用桌宠和全局快捷键，把截图翻译放在随手可用的位置。支持 OCR 结果校对、多显示器选区，并结合打字记词。',
  image:'',imageLabel:'项目字标封面',cover:'type',
  repo:'https://github.com/shijinxiang/deskpet-WDY',tags:['C#','WPF','.NET 8','Win32'],platform:'Windows 10 / 11',deliverable:'原生桌面工具与源码',
  highlights:['桌宠入口与全局快捷键','跨屏幕、高 DPI 截图选区','OCR 校对与多通道翻译'],
  context:'阅读外文资料时，截图、识别、校对和翻译常常分散在不同工具中。TranslatePet 将这些操作收拢到桌面入口。',
  approach:'以 WPF 构建桌面界面，通过 Win32 衔接全局热键、托盘和跨屏选区；将截图、OCR、翻译与设置拆分为独立服务。',
  result:'实现桌宠与快捷键唤起、截图选区、OCR 结果编辑和翻译展示，并结合 TypeWords 核心打字记词。',
  note:'OCR 与模型翻译通道需按所选服务完成配置；也提供公共免密翻译通道。此处为项目字标封面。',
  features:[
   {title:'桌面上的轻量入口',body:'通过桌宠、系统托盘或全局快捷键唤起截图翻译，并持久化保存桌宠位置与用户设置。'},
   {title:'适配实际屏幕环境',body:'处理多显示器、不同 DPI 与负坐标布局，截图前隐藏桌宠，避免遮挡目标区域。'},
   {title:'识别后仍能人工校对',body:'OCR 结果可编辑和复制，翻译服务通过接口解耦，支持多种兼容通道。'}
  ],
  flow:['快捷键唤起','框选截图','OCR 校对','翻译与记词'],
  gallery:[]
 }
];
