# pron

我正在用vitepress写博客，帮我写一个vue组件可以插入法语和英语的音标发音

比如这种markdown表格

| Word    | Pronunciation                           |
| ------- | --------------------------------------- |
| missile | :::pron missile [ˈmɪs.aɪl] en-US:::       |
| bonjour | :::pron bonjour [bɔ̃.ʒuʁ] fr-FR:::         |

可以实现点击发音的功能

vitepress 设置目录在 docs/.vitepress
vue组件放在: docs/.vitepress/theme/components

更新vue组件，音标需要自动添加一个边框 类似[bɔ̃.ʒuʁ]