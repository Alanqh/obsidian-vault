# Claude Code 安装指南

## 步骤 1：安装 Claude Code

### 1.1 执行安装脚本

Windows 打开 PowerShell，输入以下脚本：

```powershell
irm https://claude.ai/install.ps1 | iex
```

> [!tip] 代理配置
> 直接安装可能速度较慢。如果使用 Clash，需要手动在 **用户环境变量** 中新增以下两项（端口号与 Clash 中配置一致）：
>
> | 变量名 | 值 |
> | --- | --- |
> | `HTTP_PROXY` | `http://127.0.0.1:7897` |
> | `HTTPS_PROXY` | `http://127.0.0.1:7897` |

---

### 1.2 验证安装结果

在 CMD 终端中输入：

```bash
claude --version
```

若正确输出版本信息则安装成功。

> [!warning] 环境变量未配置
> 如果安装过程中系统没有自动配置好环境变量，可能无法识别 `claude` 命令，此时需要手动将安装路径添加到 **Path** 环境变量中。
>
> ![](https://md2card.com/img/screenshots/1772723275080_xfrlwm_clipboard-image.png)

---

## 步骤 2：配置 API 环境变量

在 `.claude` 文件夹下找到 `settings.json` 文件，修改为如下内容：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.moonshot.cn/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "your api token",
    "ANTHROPIC_MODEL": "kimi-k2-thinking-turbo",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-k2-thinking-turbo",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-k2-thinking-turbo",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-k2-thinking-turbo",
    "CLAUDE_CODE_SUBAGENT_MODEL": "kimi-k2-thinking-turbo"
  }
}
```

![](https://md2card.com/img/screenshots/1772723231094_rktya_clipboard-image.png)

在 [Kimi 的 AI 开放平台](https://platform.moonshot.cn/console/account) 上创建 API Token。

> [!note] 为什么选择 Kimi？
> Kimi 价格便宜且支持 Claude Code 接入。充值 10 元即赠送 15 元。

配置参考：[Kimi 官方文档 — 在 Claude Code 中使用 kimi-k2-thinking 模型](https://platform.moonshot.cn/docs/guide/agent-support#%E5%9C%A8-claude-code-%E4%B8%AD%E4%BD%BF%E7%94%A8-kimi-k2-thinking-%E6%A8%A1%E5%9E%8B)

---

## 步骤 3：跳过初始化登录

Claude Code 初始化时强制要求登录（需购买 Claude 订阅或 Token）。通过以下配置可跳过该过程，直接使用 Kimi 模型。

找到 `.claude.json` 文件，向其中加入：

```json
"hasCompletedOnboarding": true
```

![](https://md2card.com/img/screenshots/1772723209568_wd3uw_clipboard-image.png)

---

## 步骤 4：在终端与 Claude Code 对话

安装配置完成后，在终端中输入 `claude` 即可开始对话 🎉

![](https://md2card.com/img/screenshots/1772723181262_bqby0p_clipboard-image.png)
