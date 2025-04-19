import { defineConfig } from 'vitepress'
import en from './en.mjs'
import cn from './cn.mjs'

export default defineConfig({
  base: '/',           // 根路径（按需调整）
  locales: {
    root: { ...en, label: 'English' },
    cn:   { ...cn, label: '简体中文', link: '/cn/' }
  }
})
