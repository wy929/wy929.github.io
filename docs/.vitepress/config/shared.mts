import { defineConfig, type SiteConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [    
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        [
          "link",
          {
            rel: "icon",
            href: "../../public/favicon-circle.ico",
          },
          
        ],
        [
          'link',
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap',
          },
        ],
        [
          'link',
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap',
          },
        ],
        // Noto Sans SC（简体中文）
        [
          'link',
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
          },
        ],
        // Noto Sans JP（如果你需要日文）
        [
          'link',
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap',
          },
        ],
    ],

    markdown: {
      math: true
    },

    themeConfig: {
        // activate local search
        search: {
          provider: 'local'
        },
    }
})