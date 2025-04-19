我正在用vitepress搭建个人blog，希望进行layout, color，icon等自定义，请帮助我.
在 /doc/.vitepress/ dir 执行`tree --prune -I 'dist|cache'`

```
.
├── config
│   ├── cn.mts
│   ├── en.mts
│   └── index.mts
├── shims-vue.d.ts
├── theme
│   ├── components
│   │   ├── Comment.vue
│   │   ├── GoBack.vue
│   │   ├── ImageViewer.vue
│   │   ├── SupportMe.vue
│   │   └── TDesignDark.vue
│   ├── index.ts
│   ├── posts-cn.data.mts
│   ├── posts.data.mts
│   ├── style.css
│   └── utils
│       ├── createSideBar.ts
│       ├── handleHeadMeta.ts
│       ├── mobile.ts
│       └── rss.ts
└── tsconfig.json
```
我可以进行哪些操作进行自定义？