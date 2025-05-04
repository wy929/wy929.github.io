import { defineConfig } from 'vitepress'
import { readNotesDir } from '../theme/utils/readNotes'
import path from 'path'

export default defineConfig({
  // —— 站点元数据 ——
  lang: 'zh-CN',
  title: 'vitepress-blog',
  description: '一个 VitePress 站点',

  // —— 主题配置 ——
  themeConfig: {
    // nav: [
    //   { text: '首页', link: '/cn/' },
    //   { text: '文章', link: '/cn/posts/' },
    //   { text: '笔记', link: '/cn/notes/' },
    //   { text: '归档', link: '/cn/archive' }
    // ],
    nav: [
      // Home 已在 logo 位置，用不到 text
      { component: 'NavIconLink',
        props: { to: '/cn/', label: '首页', icon: 'home' } },
      { component: 'NavIconLink',
        props: { to: '/cn/posts/', label: '文章',   icon: 'posts' } },
      { component: 'NavIconLink',
        props: { to: '/cn/notes/', label: '笔记',   icon: 'notes' } },
      { component: 'NavIconLink',
        props: { to: '/cn/archive', label: '归档', icon: 'archive' } }
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

    outlineTitle: "当前页面",
    lastUpdatedText: "最近更新时间",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "深色模式",

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
