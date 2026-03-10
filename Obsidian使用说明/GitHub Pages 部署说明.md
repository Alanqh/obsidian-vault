---
type: 使用说明
created: 2026-03-10
tags:
  - 使用说明
  - GitHub Pages
---

# 🌐 GitHub Pages 部署说明

> 将 `Obsidian使用说明/` 文件夹的内容自动发布到 GitHub Pages 静态站点，方便团队成员在线浏览。

---

## 📦 技术方案

| 项目           | 详情                                                                 |
| -------------- | -------------------------------------------------------------------- |
| 静态站点生成器 | [VitePress](https://vitepress.dev/)                                  |
| 部署平台       | GitHub Pages                                                         |
| 自动化         | GitHub Actions（push 到 main 分支后自动构建部署）                    |
| 站点地址       | [https://alanqh.github.io/obsidian-vault/](https://alanqh.github.io/obsidian-vault/) |

---

## 🗂️ 相关文件结构

```
├── docs/                       ← VitePress 站点源文件
│   ├── .vitepress/
│   │   └── config.mts          ← 站点配置（标题、导航、侧边栏）
│   ├── index.md                ← 首页
│   └── guide/                  ← 构建时自动从 Obsidian使用说明/ 复制
│       └── index.md            ← 指南目录页
├── scripts/
│   └── prepare-docs.mjs        ← 构建脚本（复制 + 转换 Obsidian 语法）
├── .github/workflows/
│   └── deploy.yml              ← GitHub Actions 自动部署工作流
└── package.json                ← Node.js 依赖配置
```

---

## ⚙️ 工作原理

1. **编写文档**：在 `Obsidian使用说明/` 下正常编写 Markdown 笔记
2. **自动同步**：Obsidian Git 插件将变更 push 到 GitHub
3. **触发构建**：GitHub Actions 检测到 push，自动运行构建流程：
   - `prepare-docs.mjs` 将 `Obsidian使用说明/*.md` 复制到 `docs/guide/`
   - 转换 Obsidian 特有语法（`[[wikilink]]` → 标准 Markdown 链接）
   - VitePress 构建静态 HTML
4. **自动部署**：构建产物发布到 GitHub Pages

---

## 🖱️ 常用操作

### 本地预览（可选）

需要先安装 Node.js，然后在知识库根目录运行：

```powershell
npm install          # 首次使用，安装依赖
npm run docs:dev     # 启动本地预览服务器
```

浏览器访问 `http://localhost:5173/obsidian-vault/` 即可预览。

### 手动触发部署

在 GitHub 仓库页面：**Actions → Deploy VitePress to GitHub Pages → Run workflow**

---

## ⚠️ 注意事项

- 只有 `Obsidian使用说明/` 下的内容会发布，日报、周报等不会公开
- 新增使用说明文件后，需要在 `docs/.vitepress/config.mts` 的 `sidebar` 中添加对应条目
- Obsidian 的 `[[wikilink]]` 语法会被自动转换，无需手动修改
- GitHub Pages 需要在仓库设置中启用（详见下方）

---

## 🔧 首次启用 GitHub Pages

1. 打开 GitHub 仓库：[Alanqh/obsidian-vault](https://github.com/Alanqh/obsidian-vault)
2. 进入 **Settings → Pages**
3. **Source** 选择 **GitHub Actions**
4. Push 代码后等待 Actions 完成，即可访问站点
