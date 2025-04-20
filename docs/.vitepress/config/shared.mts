import { defineConfig, type SiteConfig } from 'vitepress'

export default defineConfig({
    head: [    
        [
          "link",
          {
            rel: "icon",
            // href: "../../public/favicon-circle.ico",
            href: "https://github.com/wy929/wy929.github.io/blob/main/docs/public/favicon-circle.ico",
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