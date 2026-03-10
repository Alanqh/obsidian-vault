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

## 🔑 SSH 认证配置（推荐）

由于国内 HTTPS 连接 GitHub 经常遇到 TLS 问题，推荐使用 **SSH** 方式连接。

### 配置步骤

1. **生成 SSH Key**（如果已有可跳过）：
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   一路回车即可。

2. **复制公钥**：
   ```powershell
   cat ~/.ssh/id_ed25519.pub | clip
   ```

3. **添加到 GitHub**：
   - 打开 [GitHub SSH Keys 设置页面](https://github.com/settings/keys)
   - 点击 **New SSH key**，粘贴公钥，保存

4. **首次连接信任 GitHub 主机**：
   ```powershell
   ssh -T git@github.com
   ```
   提示时输入 `yes`，看到 `Hi xxx! You've successfully authenticated` 即成功。

5. **将仓库远程地址切换为 SSH**：
   ```powershell
   git remote set-url origin git@github.com:Alanqh/obsidian-vault.git
   ```

### 当前状态

| 项目       | 值                                           |
| ---------- | -------------------------------------------- |
| 连接方式   | ✅ SSH                                        |
| 远程地址   | `git@github.com:Alanqh/obsidian-vault.git`   |

---

## 🚫 .gitignore 屏蔽规则

以下文件夹已配置为不同步到 GitHub：

| 屏蔽项       | 说明                                  |
| ------------ | ------------------------------------- |
| `.obsidian/` | Obsidian 配置文件（插件、主题、设置） |
| `.claude/`   | Claudian 会话数据                     |
| `.trash/`    | Obsidian 回收站                       |
| `.DS_Store` / `Thumbs.db` | 系统缓存文件             |

> 修改屏蔽规则：编辑知识库根目录下的 `.gitignore` 文件

---

## 🖥️ 多端同步指南

在另一台设备上使用同一个知识库：

1. 安装 [Git](https://git-scm.com/downloads)
2. 配置 SSH Key（参考上方「SSH 认证配置」）
3. 克隆仓库：
   ```bash
   git clone git@github.com:Alanqh/obsidian-vault.git
   ```
4. 用 Obsidian 打开克隆下来的文件夹作为 Vault
5. 在 Obsidian 中安装 Obsidian Git 插件，配置参数与本文「当前配置」一致即可

---

## 🌐 代理配置（国内网络）

如果使用代理工具（如 Clash），需要让 Git 走代理：

```powershell
# 设置代理（根据实际端口修改）
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

# 如遇 TLS 问题，切换 SSL 后端
git config --global http.sslBackend openssl
```

> 💡 使用 SSH 方式连接时通常不需要配置代理

---

## ⚠️ 注意事项

- **首次使用**需要重启 Obsidian 使插件生效
- 如遇到同步冲突，插件会提示手动解决
- `.obsidian/` 和 `.claude/` 已屏蔽，不会同步到 GitHub
- 确保设备上已安装 Git 并配置好 SSH Key
- 代理工具关闭后，SSH 方式仍可正常推送
