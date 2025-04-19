import { defineConfig } from 'vitepress'

export default defineConfig({
  // —— 站点元数据 ——
  lang: 'en-US',
  title: 'vitepress-blog',
  description: 'A VitePress Site',

  // —— 主题配置 ——
  themeConfig: {
    nav: [
      { text: 'Home',  link: '/' },
      { text: 'Posts', link: '/posts/' },
      { text: 'Notes', link: '/notes/' }
    ],

    sidebar: {
      // Notes
      '/notes/': [
        {
          text: 'Notes Overview',
          items: [{ text: 'Notes Overview', link: '/notes/' }]
        },
        {
          text: 'Japanese',
          items: [
            { text: 'Exam Overview', link: '/notes/japanese/exam/' },
            { text: '01‑first note', link: '/notes/japanese/exam/01-first%20note' }
          ]
        },
        {
          text: 'PyTorch',
          items: [
            { text: 'Dataset Overview', link: '/notes/pytorch/dataset/' },
            { text: '01‑first note', link: '/notes/pytorch/dataset/01-first%20note' }
          ]
        }
      ],

      // Posts
      '/posts/': [
        {
          text: 'Posts Overview',
          items: [
            { text: '2025‑04 First Post',  link: '/posts/2025/04/01-first%20post' },
            { text: '2025‑04 Second Post', link: '/posts/2025/04/02-second%20post' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
