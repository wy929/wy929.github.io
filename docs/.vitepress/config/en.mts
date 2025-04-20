import { defineConfig } from 'vitepress'
import path from 'path'
import { readNotesDir } from '../theme/utils/readNotes'

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
      { text: 'Notes', link: '/notes/' },
      { text: 'Archive', link: '/archive' },
    ],

    sidebar: {
      '/notes/': readNotesDir(
        // 指向你的 notes 源文件夹
        path.resolve(__dirname, '../../notes'),
        // 链接前缀，跟路由对应
        '/notes'
      ),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
