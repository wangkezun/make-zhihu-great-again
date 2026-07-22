# 知乎美化 v5

基于 pnpm、Rollup 和原生 JavaScript 构建的知乎用户脚本。

## 当前功能

- 知乎首页默认隐藏右侧栏，并让问题列表居中显示。
- Tampermonkey/Violentmonkey 的脚本菜单提供“隐藏首页右栏”配置项。
- 支持 Catppuccin Latte、Frappé、Macchiato、Mocha 四套主题。
- 默认跟随系统明暗模式：浅色使用 Latte，深色使用 Mocha；也可以固定使用任意主题。
- 用户选择保存在用户脚本专用存储中，刷新页面后仍然有效。

## 开关位置

点击浏览器工具栏里的用户脚本扩展图标，在“知乎美化 v5”菜单中选择“隐藏首页右栏”。

主题也在同一菜单中选择。带 `✓` 的选项是当前主题模式：

- 跟随系统（Latte / Mocha）
- Latte
- Frappé
- Macchiato
- Mocha

## 开发

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm lint          # ESLint 静态检查
pnpm format:check  # Prettier 格式检查
pnpm test          # Vitest 行为测试
pnpm build         # Rollup 生产构建
pnpm check         # 执行全部检查并构建
```

构建产物为 `dist/Zhihu-Beautification.user.js`，可以安装到支持用户脚本的浏览器扩展中。

## 项目结构

```text
src/
├── features/      # 独立页面功能
├── styles/        # 功能对应样式
└── index.js       # 用户脚本入口
test/              # jsdom 行为测试
dist/              # Rollup 构建产物
```
