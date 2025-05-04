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
    // nav: [
    //   { text: 'Home',    link: '/' },
    //   { text: 'Posts',   link: '/posts/' },
    //   { text: 'Notes',   link: '/notes/' },
    //   { text: 'Archive', link: '/archive' },
    // ],
    nav: [
      // Home 已在 logo 位置，用不到 text
      { component: 'NavIconLink',
        props: { to: '/', label: 'Home', icon: 'home' } },
      { component: 'NavIconLink',
        props: { to: '/posts/', label: 'Posts',   icon: 'posts' } },
      { component: 'NavIconLink',
        props: { to: '/notes/', label: 'Notes',   icon: 'notes' } },
      { component: 'NavIconLink',
        props: { to: '/archive', label: 'Archive', icon: 'archive' } }
    ],

    sidebar: {
      '/notes/': readNotesDir(
        // 指向你的 notes 源文件夹
        path.resolve(__dirname, '../../notes'),
        // 链接前缀，跟路由对应
        '/notes'
      ),
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
