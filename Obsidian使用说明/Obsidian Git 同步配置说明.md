---
type: 使用说明
created: 2026-03-10
tags:
  - 使用说明
  - Git同步
---

# 🔄 Obsidian Git 同步配置说明

> 通过 **Obsidian Git** 插件将知识库自动同步到 GitHub 私有仓库，实现多端同步和版本管理。

---

## 📦 插件信息

| 项目       | 详情                                                         |
| ---------- | ------------------------------------------------------------ |
| 插件名     | Obsidian Git                                                 |
| GitHub 仓库 | [Vinzent03/obsidian-git](https://github.com/Vinzent03/obsidian-git) |
| 远程仓库   | [Alanqh/obsidian-vault](https://github.com/Alanqh/obsidian-vault)   |

---

## ⚙️ 当前配置

| 设置项           | 值                         | 说明                     |
| ---------------- | -------------------------- | ------------------------ |
| **自动备份间隔** | 10 分钟                    | 每 10 分钟自动 commit    |
| **自动推送间隔** | 10 分钟                    | 每 10 分钟自动 push      |
| **自动拉取间隔** | 10 分钟                    | 每 10 分钟自动 pull      |
| **启动时拉取**   | ✅ 开启                    | 打开 Obsidian 时自动拉取 |
| **推送前拉取**   | ✅ 开启                    | 避免冲突                 |
| **提交消息格式** | `vault backup: {{date}}`   | 自动生成提交消息         |

> 修改配置：设置 → 第三方插件 → Obsidian Git

---

## 🖱️ 常用操作

| 操作           | 方式                                              |
| -------------- | ------------------------------------------------- |
| 手动提交       | `Ctrl/Cmd + P` → 输入 `Obsidian Git: Commit`      |
| 手动推送       | `Ctrl/Cmd + P` → 输入 `Obsidian Git: Push`        |
| 手动拉取       | `Ctrl/Cmd + P` → 输入 `Obsidian Git: Pull`        |
| 查看变更文件   | `Ctrl/Cmd + P` → 输入 `Obsidian Git: Open source control view` |
| 查看同步状态   | 底部状态栏图标                                    |

---

## 🖥️ 多端同步指南

在另一台设备上使用同一个知识库：

1. 安装 [Git](https://git-scm.com/downloads)
2. 克隆仓库：
   ```bash
   git clone https://github.com/Alanqh/obsidian-vault.git
   ```
3. 用 Obsidian 打开克隆下来的文件夹作为 Vault
4. Obsidian Git 插件已包含在仓库中，启动后自动生效

---

## ⚠️ 注意事项

- **首次使用**需要重启 Obsidian 使插件生效
- 如遇到同步冲突，插件会提示手动解决
- `.obsidian/workspace.json` 等文件可能频繁变动，可在 `.gitignore` 中排除
- 确保设备上已安装 Git 并配置好 GitHub 认证
