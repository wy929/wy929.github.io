import { defineConfig } from 'vitepress'

export default defineConfig({
  // —— 站点元数据 ——
  lang: 'zh-CN',
  title: 'vitepress‑blog',
  description: '一个 VitePress 站点',

  // —— 主题配置 ——
  themeConfig: {
    nav: [
      { text: '首页', link: '/cn/' },
      { text: '文章', link: '/cn/posts/' },
      { text: '笔记', link: '/cn/notes/' }
    ],

    sidebar: {
      // Notes（笔记）
      '/cn/notes/': [
        {
          text: '笔记总览',
          items: [{ text: '笔记总览', link: '/cn/notes/' }]
        },
        {
          text: '日语',
          items: [
            { text: '考试总览', link: '/cn/notes/japanese/exam/' },
            { text: '01‑first note', link: '/cn/notes/japanese/exam/01-first%20note' }
          ]
        },
        {
          text: 'PyTorch',
          items: [
            { text: 'Dataset 总览', link: '/cn/notes/pytorch/dataset/' },
            { text: '01‑first note', link: '/cn/notes/pytorch/dataset/01-first%20note' }
          ]
        }
      ],

      // Posts（文章）
      '/cn/posts/': [
        {
          text: '文章总览',
          items: [
            { text: '2025‑04 第一篇', link: '/cn/posts/2025/04/01-first%20post' },
            { text: '2025‑04 第二篇', link: '/cn/posts/2025/04/02-second%20post' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
