window.SELECTED_PROJECTS = [
  {
    "id": "xiexu-workbench",
    "name": "协序多模型协作工作台",
    "shortName": "协序工作台",
    "english": "XIEXU",
    "category": "ai",
    "kind": "多模型协作与过程可视化",
    "year": "2026",
    "status": "v0.1.0 · Windows 开发版",
    "label": "近期发布",
    "summary": "把资料、模型和角色交接放进同一个任务。并行分析、汇总撰写、交叉审查和人工决定，都能沿着任务过程继续追溯。",
    "image": "./assets/projects/xiexu-workbench.webp",
    "alt": "协序多模型协作工作台的任务、运行过程与成果界面",
    "imageLabel": "GitHub 介绍页工作台截图",
    "cover": "interface",
    "repo": "https://github.com/shijinxiang/xiexu-workbench",
    "demo": "https://github.com/shijinxiang/xiexu-workbench/releases/tag/v0.1.0",
    "demoLabel": "下载 Windows 版",
    "tags": [
      "Electron",
      "React",
      "Node.js",
      "SQLite"
    ],
    "platform": "Windows x64 / 同机浏览器",
    "deliverable": "便携桌面应用与可编辑源码",
    "highlights": [
      "多模型角色分工与任务交接",
      "过程事件、恢复核对与预算控制",
      "人工审查与多格式成果导出"
    ],
    "context": "复杂任务需要多个角色反复分析、撰写和核对。协序把执行端、资料版本、角色分工和成果放入同一个本地任务，保留每一次交接的来路。",
    "approach": "桌面窗口与同机浏览器共用任务服务，以 SQLite 和持久事件记录状态。执行端支持自定义兼容 API，工作流组织并行分析、汇总撰写、审查和人工决定。",
    "result": "公开 0.1.0 Windows 开发版，支持资料导入、任务草稿、API 执行、成果修订、运行追溯，以及 Markdown、HTML、JSON 和完整备份导出。",
    "note": "API 执行需要配置服务。网页接入仍在验证，原生 AI 客户端采用人工交接。离线示例在界面中单独标记。",
    "features": [
      {
        "title": "角色与资料进入同一任务",
        "body": "为分析、撰写和审查分配不同模型，导入带版本、哈希和段落编号的资料，启动前核对任务配置与预算。"
      },
      {
        "title": "运行过程可以追溯",
        "body": "记录派发、返回、修订与人工决定，重启后重建状态，对中断和外部结果未知的尝试保留核对入口。"
      },
      {
        "title": "成果经过审查再采用",
        "body": "将成果与审查意见并排呈现，支持修订、复核和人工确认，并导出可继续使用的文件。"
      }
    ],
    "flow": [
      "整理资料",
      "角色协作",
      "审查与修订",
      "人工采用与导出"
    ],
    "gallery": [
      {
        "src": "./assets/projects/xiexu-workbench.webp",
        "alt": "协序工作台的任务与过程可视化界面",
        "caption": "协序 0.1.0 / GitHub 介绍页界面",
        "width": 1600,
        "height": 1014
      }
    ],
    "number": "01",
    "readme": "https://github.com/shijinxiang/xiexu-workbench/blob/4cd9bc5b68d57f0024320aa05d1b0ffc60879bd1/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1600,
    "imageHeight": 1014
  },
  {
    "id": "shenyuan-island",
    "number": "02",
    "name": "深渊岛",
    "english": "SHENYUAN ISLAND",
    "category": "creative",
    "kind": "3D 海岛生活游戏",
    "year": "2026",
    "status": "v0.2.0 · Windows 试玩",
    "label": "最新项目",
    "summary": "在一座低多边形海岛上，把探索与日常生活连起来。钓鱼、潜水、耕种、烹饪，或开船去看看更远的海岸。",
    "image": "./assets/projects/game-fishing.webp",
    "alt": "深渊岛 GitHub 介绍页实机图，角色在灯塔码头垂钓，木船停在浅海边",
    "imageLabel": "GitHub 介绍页 / 0.2.0 实机宣传图",
    "cover": "game",
    "repo": "https://github.com/shijinxiang/shenyuan-island",
    "demo": "https://github.com/shijinxiang/shenyuan-island/releases/tag/v0.2.0",
    "demoLabel": "下载 Windows 试玩",
    "tags": [
      "Godot 4.7.2",
      "GDScript",
      "Forward+",
      "Blender"
    ],
    "platform": "Windows / 第三人称",
    "deliverable": "可试玩版本 + 可编辑工程",
    "highlights": [
      "海岛探索与水下沉船",
      "种植、烹饪与角色成长",
      "船只、沙滩车与商人委托"
    ],
    "context": "一个围绕海岛生活展开的第三人称游戏项目。探索、资源获取、工具使用和生活系统在同一座岛屿中衔接，玩家可以沿着自己的兴趣安排游玩路线。",
    "approach": "项目将玩法拆分到 GDScript 模块，以 Godot 场景和着色器组织海岛空间；同时保留可编辑模型、实机记录与协作资料。",
    "result": "当前公开版本为 0.2.0，提供 Windows 试玩包和开发工程。仓库保留版本记录、资源核验脚本与实机证据。",
    "note": "画面来自 GitHub 介绍页中的 0.2.0 独立拍摄存档。Windows 试玩需要支持 Vulkan 的设备，下载后完整解压并保留配套文件。",
    "features": [
      {
        "title": "生活玩法形成循环",
        "body": "钓鱼、伐木、种植、采集与烹饪围绕资源展开；背包、工具栏、储物箱和技艺经验连接日常操作。"
      },
      {
        "title": "陆地与水下探索",
        "body": "船只与沙滩车连接不同区域，潜水探索沉船；商人委托、动物交互和地图提供探索线索。"
      },
      {
        "title": "关注实际操作",
        "body": "围绕工具握持、车辆驾驶、镜头遮挡、背包拖拽与定向交互持续迭代，让系统能在实机中连贯使用。"
      }
    ],
    "flow": [
      "探索海岛",
      "采集与制作",
      "生活与成长",
      "委托与新目标"
    ],
    "gallery": [
      {
        "src": "./assets/projects/game-fishing.webp",
        "alt": "灯塔码头垂钓，木船与鱼群就在身旁",
        "caption": "灯塔海钓 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-garden.webp",
        "alt": "在小屋旁给番茄、南瓜和萝卜浇水",
        "caption": "种植与收获 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-rowing.webp",
        "alt": "划着木船经过清澈浅海中的鱼群",
        "caption": "划船探索 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-buggy.webp",
        "alt": "驾驶沙滩车沿海滩行驶",
        "caption": "沙滩车探索 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-cooking.webp",
        "alt": "小屋门口的大锅正在烹饪蔬菜",
        "caption": "采集与烹饪 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-island.webp",
        "alt": "环形海岛、内湖、树林与灯塔的全景",
        "caption": "环岛漫游 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      },
      {
        "src": "./assets/projects/game-night.webp",
        "alt": "夜间小屋里的床、储物箱和床头灯",
        "caption": "小屋生活 / GitHub 介绍页实机画面",
        "width": 1600,
        "height": 900
      }
    ],
    "shortName": "深渊岛",
    "readme": "https://github.com/shijinxiang/shenyuan-island/blob/8ee347f6df74f5cbb50fed3e3c33f4ea0b1c9513/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1600,
    "imageHeight": 900
  },
  {
    "id": "rag",
    "number": "03",
    "name": "企业知识库 RAG",
    "english": "KNOWLEDGE AGENT",
    "category": "ai",
    "kind": "知识检索与智能体",
    "year": "2026",
    "status": "检索与智能体工程",
    "label": "AI 应用",
    "summary": "从文档接入到带来源的答案，把混合检索、精排和智能体路由接在一起。补充权限隔离、异步处理与审计，让知识库工作流更完整。",
    "image": "./assets/screens/rag.webp",
    "alt": "企业知识库 RAG 的真实问答工作空间",
    "imageLabel": "真实界面 · 示例工作空间",
    "cover": "interface",
    "repo": "https://github.com/shijinxiang/rag",
    "tags": [
      "FastAPI",
      "LangGraph",
      "Next.js",
      "pgvector",
      "Redis"
    ],
    "platform": "Web 应用",
    "deliverable": "检索问答系统与源码",
    "highlights": [
      "Dense / Sparse 混合检索与 RRF",
      "引用溯源、查询重写与精排",
      "JWT、RBAC 与部门隔离"
    ],
    "context": "企业资料往往分散在多种格式的文档中。这个项目将资料处理、知识检索与问答接在一起，让使用者能从回答继续核对原始来源。",
    "approach": "使用 FastAPI 与 LangGraph 编排检索和工具调用，PostgreSQL + pgvector 存储知识，Redis、Celery 处理异步任务，Next.js 提供前端工作空间。",
    "result": "当前工程包含多格式文档处理、混合检索、答案引用、部门隔离、删除审查、审计与可观测性，并提供 Docker Compose 运行方式。",
    "note": "示例界面用于展示工作空间。模型生成与 LLM 评测需要配置服务，离线案例用于检查代码流程。",
    "features": [
      {
        "title": "检索链路逐层组织",
        "body": "Dense 与 Sparse 检索通过 RRF 融合，可配置查询重写和重排序，再将结果组织到回答上下文。"
      },
      {
        "title": "答案可以继续查证",
        "body": "保留源文档、页码与片段引用，让使用者从回答返回资料，核对上下文。"
      },
      {
        "title": "补充工程使用边界",
        "body": "通过 JWT、RBAC 和部门隔离管理访问，以异步队列衔接文档处理，并记录审查和审计信息。"
      }
    ],
    "flow": [
      "接入文档",
      "混合检索",
      "Agent 编排",
      "带来源的回答"
    ],
    "gallery": [
      {
        "src": "./assets/screens/rag.webp",
        "alt": "企业知识库 RAG 示例问答工作空间",
        "caption": "问答工作空间 / 独立示例状态",
        "width": 1440,
        "height": 900
      }
    ],
    "shortName": "企业知识库 RAG",
    "readme": "https://github.com/shijinxiang/rag/blob/3aa1882b887d94b01c75e3169b8e6462656df28e/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1440,
    "imageHeight": 900
  },
  {
    "id": "voiceops",
    "number": "04",
    "name": "VoiceOps",
    "english": "VOICE TO WORKFLOW",
    "category": "ai",
    "kind": "售后工单流程原型",
    "year": "2026",
    "status": "演示原型",
    "label": "流程自动化",
    "summary": "从售后录音开始，衔接异步转写、敏感信息脱敏、政策检索与只读订单查询。人工确认后建立工单，并通过 n8n 接入通知流程。",
    "image": "./assets/screens/voiceops.webp",
    "alt": "VoiceOps 独立演示环境中的售后工作台",
    "imageLabel": "真实界面 · 演示数据",
    "cover": "interface",
    "repo": "https://github.com/shijinxiang/VoiceOps",
    "tags": [
      "Vue 3",
      "FastAPI",
      "pgvector",
      "Redis",
      "n8n"
    ],
    "platform": "Web 工作台",
    "deliverable": "售后知识检索与工单演示",
    "highlights": [
      "异步 ASR、脱敏与转写修订",
      "政策引用与只读订单查询",
      "人工确认、幂等建单与审计"
    ],
    "context": "售后会话需要从描述中提取问题、查找政策并转入工单。这个项目围绕退货、维修和物流咨询组织工作台与流程。",
    "approach": "围绕退货、维修和物流咨询组织会话，将 ASR、PII 脱敏、RAG 政策引用和订单查询接到工作台，通过人工确认与幂等处理建立工单。",
    "result": "工程包含售后会话处理、政策与订单上下文、人工确认、工单流转、n8n 通知及运营审计，并提供 Docker Compose 服务配置。",
    "note": "界面使用独立演示数据。仓库中的订单为模拟只读数据，场景围绕退货、维修与物流咨询。",
    "features": [
      {
        "title": "整理录音与会话",
        "body": "上传录音进入异步转写流程，支持敏感信息脱敏和人工修订，保留处理轨迹。"
      },
      {
        "title": "检索政策与订单上下文",
        "body": "将政策引用与只读模拟订单查询接入会话，帮助处理售后问题。"
      },
      {
        "title": "确认之后再进入工单",
        "body": "通过人工确认和幂等建单控制流转，衔接 n8n 通知，并保留控制台审计。"
      }
    ],
    "flow": [
      "售后会话",
      "知识匹配",
      "人工确认",
      "工单流转"
    ],
    "gallery": [
      {
        "src": "./assets/screens/voiceops.webp",
        "alt": "VoiceOps 售后工单演示工作台",
        "caption": "售后工作台 / 模拟转写与演示数据",
        "width": 1440,
        "height": 810
      }
    ],
    "shortName": "VoiceOps",
    "readme": "https://github.com/shijinxiang/VoiceOps/blob/b9c0b3245b5d2241d9dd647085f4fa55f51f09a9/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1440,
    "imageHeight": 810
  },
  {
    "id": "open-prompt",
    "number": "05",
    "name": "开放题记录库",
    "english": "QUESTION STUDIO",
    "category": "tools",
    "kind": "Windows 本地资料工具",
    "year": "2026",
    "status": "v0.3.2 · Windows",
    "label": "效率工具",
    "summary": "把题目、考点、多模型回复和截图集中保存在本地。新版补充截图操作、分段备份、完整度提醒，以及 Chrome 助手的共享与题号绑定。",
    "image": "./assets/screens/open-prompt.webp",
    "alt": "开放题记录库中的独立演示记录",
    "imageLabel": "真实界面 · 独立演示记录",
    "cover": "interface",
    "repo": "https://github.com/shijinxiang/open-prompt",
    "tags": [
      "React",
      "Electron",
      "Vite",
      "Chrome 扩展"
    ],
    "platform": "Windows 桌面",
    "deliverable": "本地记录库 + 浏览器助手",
    "highlights": [
      "三至五模型回复与排序资料",
      "分段备份、多文件合并与截图管理",
      "Chrome 共享题库与题号绑定"
    ],
    "context": "开放题评测和资料整理会产生题目、评价标准、多份回复和截图。分散保存容易失去对应关系，也不利于后续比较与复查。",
    "approach": "以记录为中心，将题目、关键洞察、考点、回复和截图组织在一起；通过桌面应用提供本地管理，并配套浏览器填写助手。",
    "result": "当前公开 0.3.2 版本，提供安装版与免安装程序，包含截图粘贴、拖出、复制和缩放，分段 JSON 备份、合并恢复与 TXT 导出。",
    "note": "截图为独立演示记录。个人题库与附件保存在本地，公开发布页提供安装版和免安装版。",
    "features": [
      {
        "title": "题目与模型资料保持关联",
        "body": "记录决定性与非决定性考点，整理三至五个模型的回复与排序，并提示资料完整度。"
      },
      {
        "title": "截图与备份便于整理",
        "body": "支持截图粘贴、拖出、复制和缩放，使用分段 JSON 备份、多文件合并与 TXT 导出管理资料。"
      },
      {
        "title": "衔接 Chrome 填写流程",
        "body": "通过本机共享题库、题号绑定和分区覆盖，在浏览器助手与桌面记录库之间衔接内容。"
      }
    ],
    "flow": [
      "建立题目",
      "记录考点与回复",
      "补充截图",
      "整理与导出"
    ],
    "gallery": [
      {
        "src": "./assets/screens/open-prompt.webp",
        "alt": "开放题记录库的演示记录界面",
        "caption": "本地记录工作空间 / 演示数据",
        "width": 1440,
        "height": 810
      }
    ],
    "shortName": "开放题记录库",
    "demo": "https://github.com/shijinxiang/open-prompt/releases/tag/v0.3.2",
    "demoLabel": "下载 Windows 版",
    "readme": "https://github.com/shijinxiang/open-prompt/blob/82af115cf7f4424e8c82d859e03b5f1eed59f89a/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1440,
    "imageHeight": 810
  },
  {
    "id": "translatepet",
    "aliases": [
      "deskpet-wdy"
    ],
    "number": "06",
    "name": "翻译桌宠",
    "english": "TRANSLATEPET",
    "category": "tools",
    "kind": "Windows 截图翻译工具",
    "year": "2026",
    "status": "桌面应用",
    "label": "桌面交互",
    "summary": "以桌宠或全局快捷键唤起跨屏截图，再完成 OCR 校对与翻译。用 WPF、Win32 和服务接口，把选区、文字编辑和多通道翻译衔接起来。",
    "image": "./assets/projects/translatepet-character.webp",
    "imageLabel": "GitHub 项目桌宠素材",
    "cover": "asset",
    "repo": "https://github.com/shijinxiang/deskpet-WDY",
    "tags": [
      "C#",
      ".NET 8",
      "WPF",
      "Win32"
    ],
    "platform": "Windows 10 / 11",
    "deliverable": "原生桌面工具与源码",
    "highlights": [
      "桌宠入口与全局快捷键",
      "跨屏幕、高 DPI 截图选区",
      "OCR 校对与多通道翻译"
    ],
    "context": "阅读外文资料时，截图、识别、校对和翻译常常分散在不同工具中。TranslatePet 将这些操作收拢到桌面入口。",
    "approach": "以 WPF 构建桌面界面，通过 Win32 衔接全局热键、托盘和跨屏选区；将截图、OCR、翻译与设置拆分为独立服务。",
    "result": "源码包含桌宠浮窗、托盘、可配置快捷键、PerMonitorV2 多屏选区、内存截图、OCR 原文编辑，以及兼容 API 和公共翻译通道。",
    "note": "图片为仓库中的项目桌宠素材。OCR 和模型翻译按所选服务配置，语音播报保留为扩展接口。",
    "features": [
      {
        "title": "桌面上的轻量入口",
        "body": "通过桌宠、系统托盘或全局快捷键唤起截图翻译，并持久化保存桌宠位置与用户设置。"
      },
      {
        "title": "适配实际屏幕环境",
        "body": "处理多显示器、不同 DPI 与负坐标布局，截图前隐藏桌宠，避免遮挡目标区域。"
      },
      {
        "title": "识别后仍能人工校对",
        "body": "OCR 结果可编辑和复制，翻译服务通过接口解耦，支持多种兼容通道。"
      }
    ],
    "flow": [
      "快捷键唤起",
      "框选截图",
      "OCR 校对",
      "翻译与复制"
    ],
    "gallery": [
      {
        "src": "./assets/projects/translatepet-character.webp",
        "alt": "翻译桌宠 GitHub 仓库中的蓝色机器人猫桌宠，手持翻译魔芋",
        "caption": "TranslatePet / GitHub 项目桌宠素材",
        "width": 1024,
        "height": 1024
      }
    ],
    "shortName": "翻译桌宠",
    "readme": "https://github.com/shijinxiang/deskpet-WDY/blob/13ce4c2c02407fa4caf7216925e55dfc9260807a/README.md",
    "checkedAt": "2026-11-13",
    "alt": "翻译桌宠 GitHub 仓库中的蓝色机器人猫桌宠，手持翻译魔芋",
    "imageWidth": 1024,
    "imageHeight": 1024
  },
  {
    "id": "pulse-music",
    "name": "PULSE · 心跳声场",
    "shortName": "PULSE MUSIC",
    "english": "PULSE MUSIC",
    "category": "creative",
    "kind": "音乐播放与 Web Audio 交互",
    "year": "2026",
    "status": "v2.0.0 · 在线体验",
    "label": "近期更新",
    "summary": "电光绿与金属耳机组成的音乐空间。播放、搜索与收藏四首合成曲目，也能导入自己的音频，用六个琴键体验声音与画面的反馈。",
    "image": "./assets/projects/pulse-music.webp",
    "alt": "PULSE 音乐网站的电光绿耳机界面、音乐导航与播放器",
    "imageLabel": "公开音乐网站 / 第二版真实界面",
    "cover": "interface",
    "repo": "https://github.com/shijinxiang/pulse-music",
    "demo": "https://shijinxiang.github.io/pulse-music/",
    "demoLabel": "打开音乐网站",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Audio"
    ],
    "platform": "Web / 浏览器",
    "deliverable": "可在线体验的交互音乐网站",
    "highlights": [
      "曲目播放、筛选、搜索与收藏",
      "本地音频导入与播放控制",
      "六键演奏、粒子与沉浸声场"
    ],
    "context": "将听音乐与轻量演奏放入同一网页，让曲目浏览、播放控制和键盘交互形成连贯的体验。",
    "approach": "使用原生 HTML、CSS 与 JavaScript 构建界面，以 Web Audio 生成声音反馈，将琴键操作、音符粒子与沉浸视觉连接起来。",
    "result": "第二版提供四首合成电子曲目，支持切歌、进度、音量、随机循环、筛选搜索、收藏和本地音频导入。",
    "note": "浏览器在用户操作后启用声音。项目以合成曲目和本地音频体验为范围。",
    "features": [
      {
        "title": "完整的网页播放控制",
        "body": "在播放器中切换曲目、调整进度和音量，选择随机或循环模式，也能搜索和收藏音乐。"
      },
      {
        "title": "让自己的音乐进入空间",
        "body": "导入本地音频，使用同一套播放入口和界面交互浏览音乐资料。"
      },
      {
        "title": "键盘成为轻量乐器",
        "body": "使用 A、S、D、F、G、H 六个按键弹奏，结合音符粒子、混响与沉浸声场观察听觉和视觉反馈。"
      }
    ],
    "flow": [
      "选择音乐",
      "播放与收藏",
      "导入音频",
      "演奏与沉浸"
    ],
    "gallery": [
      {
        "src": "./assets/projects/pulse-music.webp",
        "alt": "PULSE 第二版公开网站界面",
        "caption": "PULSE 2.0.0 / 公开网站截图",
        "width": 1274,
        "height": 717
      }
    ],
    "number": "07",
    "readme": "https://github.com/shijinxiang/pulse-music/blob/649fe2206e080a04e384f1b43e7794ca1397d0cf/README.md",
    "checkedAt": "2026-11-13",
    "imageWidth": 1274,
    "imageHeight": 717
  }
];
