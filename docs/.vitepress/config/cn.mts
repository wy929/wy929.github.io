import { defineConfig } from 'vitepress'
import { readNotesDir } from '../theme/utils/readNotes'
import path from 'path'

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
      { text: '笔记', link: '/cn/notes/' },
      { text: '归档', link: '/cn/archive' }
    ],

    sidebar: {
      // Notes（笔记）
      '/cn/notes/': readNotesDir(
        path.resolve(__dirname, '../../cn/notes'),
        // 这里前缀加 /cn
        '/cn/notes'
      ),
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
