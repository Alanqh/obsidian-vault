---
type: 使用说明
created: 2026-03-10
tags:
  - 使用说明
  - GitHub Pages
---

# GitHub Pages 部署说明

> 将 `Obsidian使用说明/` 文件夹的内容自动发布到 GitHub Pages 静态站点，方便团队成员在线浏览。

## 技术方案

| 项目           | 详情                                                                 |
| -------------- | -------------------------------------------------------------------- |
| 静态站点生成器 | [VitePress](https://vitepress.dev/)                                  |
| 部署平台       | GitHub Pages（公开仓库免费）                                         |
| 自动化         | GitHub Actions（push 到 main 分支后自动构建部署）                    |
| 站点地址       | [https://alanqh.github.io/obsidian-vault/](https://alanqh.github.io/obsidian-vault/) |

## 工作原理

整个构建过程完全在 **GitHub Actions 云端** 完成，本地 Obsidian 知识库保持干净，不会出现任何构建文件。

```
你在 Obsidian 写笔记
      ↓
Obsidian Git 自动 push 到 GitHub
      ↓
GitHub Actions 自动触发（仅 Obsidian使用说明/ 变更时）
      ↓
云端自动完成：
  1. 复制 Obsidian使用说明/*.md 到站点目录
  2. 转换 Obsidian 语法：
     - [[wikilink]] → 标准 Markdown 链接
     - > [!tip] 等 Callout → VitePress ::: tip 容器
  3. 自动扫描所有 .md 文件，生成侧边栏和索引页
  4. VitePress 构建静态 HTML
  5. 部署到 GitHub Pages
      ↓
站点自动更新 ✅
```

## 相关文件

| 文件 | 位置 | 说明 |
| ---- | ---- | ---- |
| 部署工作流 | `.github/workflows/deploy.yml` | VitePress 配置、构建脚本全部内联在此文件中 |

> [!tip] 零构建文件
> 本地知识库中没有 `docs/`、`node_modules/`、`package.json` 等文件，所有构建产物都在云端生成。

## 常用操作

### 新增使用说明后更新站点

1. 在 `Obsidian使用说明/` 下新建 `.md` 文件
2. Push（或等待 Obsidian Git 自动同步）
3. 站点自动构建部署，侧边栏和索引页自动包含新文档

> [!note] 无需手动配置
> 构建时会自动扫描 `Obsidian使用说明/` 下的所有 `.md` 文件，动态生成 VitePress 侧边栏和索引页。新增文档**不需要修改** `deploy.yml`。

### 手动触发部署

在 GitHub 仓库页面：**Actions → Deploy VitePress to GitHub Pages → Run workflow**

## 语法兼容说明

构建过程中会自动进行以下 Obsidian → VitePress 的语法转换：

| Obsidian 语法 | 转换为 | 说明 |
| ------------- | ------ | ---- |
| `[[笔记名]]` | `[笔记名](./笔记名.md)` | Wiki 链接 → 标准链接 |
| `[[笔记名\|显示文本]]` | `[显示文本](./笔记名.md)` | 带别名的 Wiki 链接 |
| `> [!tip] 标题` | `::: tip 标题` | Obsidian Callout → VitePress 容器 |
| `> [!warning]` | `::: warning` | 支持 tip / warning / note 等类型 |

> [!warning] 避免使用 `---` 分割线
> Markdown 中的 `---` 水平线会被构建脚本误判为 YAML frontmatter 边界，导致内容被删除。请使用标题（`##`）来分隔章节，不要使用 `---`。

## 注意事项

- 只有 `Obsidian使用说明/` 下的内容会发布，日报、周报等不会公开
- 仓库需要设为 **Public** 才能免费使用 GitHub Pages
- Obsidian 语法会被自动转换，无需手动修改
- 侧边栏按文件名排序自动生成，无需手动维护

## 首次启用 GitHub Pages

1. 将仓库设为 Public：[Settings](https://github.com/Alanqh/obsidian-vault/settings) → Danger Zone → Change visibility → Public
2. 启用 Pages：[Settings → Pages](https://github.com/Alanqh/obsidian-vault/settings/pages) → Source 选择 **GitHub Actions**
3. Push 代码后等待 Actions 完成，即可访问站点
