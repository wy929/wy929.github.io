import { defineConfig, type SiteConfig } from 'vitepress'

export default defineConfig({
    head: [    
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

    themeConfig: {
        // activate local search
        search: {
          provider: 'local'
        },
    }
})