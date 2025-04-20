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
    ],

    themeConfig: {
        // activate local search
        search: {
          provider: 'local'
        },
    }
})