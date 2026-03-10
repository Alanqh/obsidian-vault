import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Obsidian 使用说明',
  description: '利用 Obsidian + Claudian 打造高效工作流',
  lang: 'zh-CN',
  base: '/obsidian-vault/',

  head: [
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '使用说明', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用说明',
          items: [
            { text: '日报周报自动汇总工作流', link: '/guide/日报周报自动汇总工作流' },
            { text: 'Obsidian Git 同步配置说明', link: '/guide/Obsidian Git 同步配置说明' },
            { text: 'GitHub Pages 部署说明', link: '/guide/GitHub Pages 部署说明' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Alanqh/obsidian-vault' },
    ],

    outline: {
      label: '目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换' },
          },
        },
      },
    },
  },
})
