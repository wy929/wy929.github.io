- [英文原视频](https://learn.deeplearning.ai/chatgpt-prompt-eng/lesson/1/introduction)
- [B 站翻译](https://www.bilibili.com/video/BV1No4y1t7Zn)

# 迭代

- 对 ChatGPT 第一次回答的答案就采用的情况是很少的
- 我们需要一个良好的迭代过程来持续改进我们的提示
- 一个优秀的提示工程师不在于知道多少优秀的提示词，而是这个提示的方式方法，流程之类

基本的迭代过程:

![迭代过程图](https://oss.justin3go.com/blogs/20230502174634.png)

1. 提示词清楚明确
2. 分析结果为何不符合预期
3. 改善提示词
4. 重复上述过程

## 准备工作


```python
! pip install --upgrade openai
```