我正在用vitepress搭建个人blog，我希望用 ts写 一个function 能够按照层级读取指定的notes dir文件夹中所有的 note markdown 文件并返回一个有层级结构的list, 每个文件的命名规范为 `index-title.md`, 读取过程中需要忽略所有 `index.md` 文件. 这个function将用于在config文件中定义多层级的sidebar. 首先需要写这个 ts文件 放在 `docs/theme/utils/` dir中, 然后写一个测试文件（打印读取的list）放在 `tests/` 中

这是 `docs/notes/` dir 的 tree
(base) ➜  notes git:(main) ✗ tree                        
.
├── ChatGPT提示学习
│   ├── 01-ChatGPT提示学习笔记.md
│   ├── 02-ChatGPT提示学习笔记.md
│   ├── 03-ChatGPT提示学习笔记.md
│   └── 04-ChatGPT提示学习笔记.md
├── Vue相关
│   ├── 01-Vue3是如何运行的.md
│   ├── 02-Vue3编译器.md
│   ├── 03-虚拟DOM.md
│   ├── 04-Vue3-Reactivity.md
│   └── index.md
└── 日语
    ├── 听力
    │   ├── 01-note.md
    │   └── 02-note.md
    ├── 文法
    │   ├── 01-note.md
    │   └── 02-note.md
    └── 阅读
        ├── 01-note.md
        └── 02-note.md