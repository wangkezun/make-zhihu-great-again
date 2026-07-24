# 项目约定

本文件记录本项目已经形成的设计与实现风格。后续修改默认遵守这些约定；如果需求与约定冲突，以用户当次明确要求为准。

## 沟通与修改原则

- 正常沟通、说明和必要的代码注释使用中文；代码标识符、API 名称和技术术语保持其惯用语言。
- 先保持知乎原有信息结构和交互语义，再做视觉统一与体验增强。不要为了“更好看”擅自删除功能、改变内容顺序或扩大功能范围。
- 修复应尽量局部、可回退，不用覆盖全站的宽泛规则解决单个组件问题。
- 修改前先确认目标页面、组件状态和已有相邻规则，优先扩展现有模式，避免为同类组件发明另一套视觉语言。
- 不直接编辑 `dist/Zhihu-Beautification.user.js`；它是 `pnpm build` 生成的产物。
- 除非用户明确要求发布版本，否则不要自行修改 `package.json` 中的版本号。

## 项目结构

- `src/features/` 放行为、状态、页面识别和 DOM 标记逻辑。
- `src/styles/` 放与功能对应的 CSS 字符串；行为与样式尽量使用同名文件配对。
- `src/index.js` 只负责适配用户脚本 API、组装设置并启动功能，不在入口堆放组件逻辑。
- 多个功能共用的存储、菜单和样式注入行为放到 `src/features/shared.js`。
- `test/` 使用 Vitest + jsdom 验证行为、生命周期和关键样式回归。
- 新增独立功能时，采用 `createXxxFeature(browserWindow, settings?)` 工厂，并在入口显式启动。

## 视觉设计基线

项目的视觉方向是“克制、柔和、层级清楚的 Catppuccin 知乎界面”，不是高饱和或强装饰风格。

### 色彩与层级

- 四套主题只使用 Catppuccin 官方 Latte、Frappé、Macchiato、Mocha 色板；跟随系统时浅色用 Latte、深色用 Mocha。
- 组件样式优先使用现有语义变量，不直接散落色值：
  - 页面底色：`--zb-page`（mantle）
  - 主卡片/主内容面：`--zb-surface`（base）
  - 输入框、次级块、抬升表面：`--zb-surface-raised`（surface0）
  - 悬停或更高层级：`--zb-surface-hover`（surface1）
  - 普通/强调边框：`--zb-border`、`--zb-border-strong`
  - 主、次、弱、提示文字：`--zb-text`、`--zb-text-secondary`、`--zb-text-muted`、`--zb-text-subtle`
  - 主操作：`--zb-primary`，悬停用 `--zb-primary-hover`，焦点底色用 `--zb-primary-soft`
  - 危险、成功、警告语义分别使用 `--zb-danger`、`--zb-success`、`--zb-warning`
- 新颜色如果能由现有语义表达，就不要直接引用 `--ctp-*`；确需新增语义时，在主题根规则统一定义。
- 原始十六进制颜色只用于官方色板声明或脱离主题变量时的安全回退值。

### 表面、边框与阴影

- 页面背景与内容卡片要有一级明度差；卡片内部的输入、标签、次级操作再使用 raised/hover 层级。
- 常规卡片以 `12px` 圆角为基准，并使用 `--zb-border` 和 `--zb-shadow` 形成轻微边界。
- 输入框、菜单项和中型控件通常使用 `8px`；小按钮、紧凑操作通常使用 `6px`；标签/胶囊使用 `999px`。已有组件有明确圆角体系时沿用，不机械覆盖。
- 阴影保持轻薄，优先使用 `--zb-shadow`；不要加入浓重投影、发光或无语义渐变。
- 相邻块本来组成一个整体时，使用上下互补圆角，而不是每块都做成孤立卡片。
- 只有确实需要压过知乎原样式时才使用 `!important`。主题覆盖通常需要它，但不要用它掩盖选择器范围错误。

### 间距、尺寸与布局

- 以 `4px` 为基础步进，常用间距为 `4 / 8 / 12 / 16 / 20px`。
- 卡片常规内边距以 `16px` 为基准；紧凑控件使用 `4–10px` 范围，并与相邻同类控件一致。
- 首页主栏宽度只通过 `--zb-home-main-width` 控制：标准 `694px`、舒适 `820px`、宽屏 `960px`、自适应 `calc(100vw - 32px)`。
- 页面主内容应居中，并保留总计 `32px` 的最小水平视口留白；可收缩列同时设置 `min-width: 0`。
- 隐藏侧栏时主栏占满配置宽度；显示侧栏时保留现有 `306px` 侧栏空间。不要在其他样式中复制一套宽度计算。

### 文字、图标与交互状态

- 正文用 `--zb-text`，说明和元信息逐级使用 secondary/muted/subtle；不要把所有文字都提亮成主文字。
- 图标尽量使用 `color` + `fill: currentColor`，使其与文字状态同步。
- 主操作用蓝色语义，破坏性/取消关注等状态用红色语义；不要仅靠文字区分危险操作。
- 交互组件至少检查默认、hover、`focus-visible`、active/selected/`aria-pressed` 和 disabled 中实际存在的状态。
- 键盘焦点必须可见，沿用主色边框或 `0 0 0 2px var(--zb-primary-soft)` 的柔和焦点环。
- 动效只用于状态衔接，通常为 `0.16s ease`；避免影响阅读的位移、缩放和长动画。
- 不要为了 hover 效果造成卡片跳动、尺寸变化或整块强烈变色。

## CSS 约定

- 所有主题规则以 `html[data-zb-theme]` 为作用域；页面专属规则再叠加 `data-zb-home-page`、`data-zb-question-page`、`data-zb-column-page` 等状态。
- 由本项目创建的 class、属性、CSS 变量和 style id 统一使用 `zb-` / `data-zb-` / `--zb-` 前缀。
- 页面或运行时状态优先由 feature 标记在 `documentElement` 或精确目标节点上，再由 CSS 消费；不要让复杂选择器同时承担页面识别和视觉实现。
- 选择器优先使用知乎已有语义 class、ARIA 属性、`data-za-*` 属性和可靠的局部结构。依赖位置结构时必须限定在明确组件内。
- `:has()` 可以用于局部、明确的 CSS 组件匹配，但避免以它对整个应用树做昂贵的运行时扫描。
- 同一组件的基础、文字、图标和状态规则放在相邻位置；页面专属覆盖集中放置，避免在大文件中重复追加同一选择器。
- 多选择器共享声明时用 `:is()` / `:where()` 合并；需要控制权重时优先 `:where()`。
- 样式字符串遵守项目 Prettier 配置：双引号、分号、尾逗号、`printWidth: 100`。
- 新规则同时检查浅色和深色主题，尤其注意对比度、透明混色、边框可见性和 SVG 的 `fill`。

## JavaScript 功能约定

- 功能工厂显式接收 `browserWindow`，通过它获取 `document`、Observer、计时器和动画帧，保证 jsdom 可测试，不直接依赖隐式全局对象。
- feature 至少返回幂等的 `start()` 和完整的 `destroy()`；有外部可用状态操作时再暴露 `setMode()`、`refresh()` 等方法。
- `start()` 重复调用不得重复注入样式、注册监听器或创建 Observer。
- `destroy()` 必须清理本功能创建的：
  - 事件监听器、Mutation/Resize/Intersection Observer
  - `requestAnimationFrame`、timer 和菜单命令
  - style 元素、class、`data-zb-*` 属性、占位节点和临时原生属性
  - 被包装的 History API；恢复时不得覆盖其他代码在之后安装的包装
- 样式通过 `ensureStyle()` 注入，并为每个功能使用唯一的 `zb-*-style` id。
- 存储 key 使用 `zhihu-beautification:*` 前缀；读取值必须校验，存储不可用时回退默认值且不让当前页面功能崩溃。
- 用户脚本菜单需要显示当前状态，切换后立即更新 DOM、持久化值并刷新菜单标记。

## SPA、动态 DOM 与性能

- 知乎是 SPA。涉及页面类型的功能必须处理初始加载、`pushState`、`replaceState`、`popstate`，并在可用时优先使用 Navigation API。
- 页面识别同时约束 `www.zhihu.com` 和明确 pathname；不要用模糊的字符串包含判断误伤其他页面。
- 动态内容优先使用事件委托和增量标记。只扫描新加入的局部节点，不在每次 mutation 后重扫整个文档。
- MutationObserver 先观察最小可靠父节点；只有目标尚未出现时才临时观察更大子树，找到后缩小范围。
- portal/popover 观察应排除主应用 `#root`，避免主题功能遍历知乎主内容的每次更新。
- 高频 scroll、resize、mutation 更新使用单个 `requestAnimationFrame` 合并；scroll 监听器使用 `{ passive: true }`。
- 尺寸和可见性优先用 ResizeObserver / IntersectionObserver，并提供缺失 API 时的轻量回退。
- DOM 查询和几何读取集中在刷新阶段，避免读写交错；已有节点用 `Set` / `WeakSet` / `WeakMap` 去重和保存状态。
- 修改知乎原生 class、style、title 或 History 方法时，只移除本功能拥有的状态，不破坏页面或其他脚本后来设置的值。

## 测试与完成标准

- 每个新增或修改的行为都在对应 `test/*.test.js` 中覆盖，优先测试用户可观察结果，而不是内部实现细节。
- 生命周期测试至少考虑：默认状态、切换/动态更新、重复启动（适用时）、`destroy()` 清理。
- 页面功能要覆盖目标路由以及至少一个非目标路由；SPA 功能要覆盖路由切换。
- Observer 或动态 DOM 功能要验证增量加入节点，并为性能边界添加回归测试，例如不扫描 `#root`。
- 存储和可选浏览器 API 要覆盖异常、非法值或 API 缺失时的降级行为。
- 视觉修复可对关键 CSS 片段做字符串断言以防回归，但不要只断言整个文件快照；行为能通过 DOM 状态验证时优先验证行为。
- 完成修改后运行 `pnpm check`，它依次执行 lint、Prettier 检查、Vitest 和生产构建。
- 若只改本文档，可至少运行 `pnpm exec prettier --check AGENTS.md`；无需为文档改动重建产物。
- 提交前检查生成的 `dist/Zhihu-Beautification.user.js` 是否与源码构建结果一致，并确认没有无关文件变化。
