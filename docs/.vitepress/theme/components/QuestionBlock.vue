<template>
  <div class="question-block" :style="componentStyles">
    <!-- 题目标签、题目与按钮同一行 -->
    <div class="question-header">
      <!-- 标签区域 -->
      <div class="tag-slot">
        <slot name="tag" />
      </div>
      <!-- 题目文本区域 -->
      <div class="question" v-html="question"></div>
      <!-- 切换答案按钮 -->
      <button class="toggle-btn" @click="visible = !visible">
        {{ visible ? hideLabel : showLabel }}
      </button>
    </div>

    <!-- 选项列表始终展示，仅点击后高亮正确选项 -->
    <ol class="options">
      <li v-for="(opt, idx) in options" :key="idx">
        <span
          :class="{ correct: visible && idx === correctIndex }"
          v-html="opt"
        ></span>
      </li>
    </ol>

    <!-- 详细答案，仅在可见时展示 -->
    <div class="details" v-show="visible">
      <slot name="details">
        <div v-html="details"></div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'

// 工具：将 #RRGGBB 转成 "R, G, B"
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const num = parseInt(h, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `${r}, ${g}, ${b}`
}

const props = defineProps({
  question:        { type: String, required: true },
  options:         { type: Array,  required: true },
  correctIndex:    { type: Number, required: true },
  details:         { type: String, default: '' },
  showLabel:       { type: String, default: '显示答案' },
  hideLabel:       { type: String, default: '隐藏答案' },
  btnColor:        { type: String, default: 'var(--vp-c-brand-1)' },
  btnTextColor:    { type: String, default: 'var(--vp-c-brand-contrast)' },
  btnHoverBg:      { type: String, default: '#42B983' },
  hoverAlpha:      { type: Number, default: 0.3 },
  btnHoverText:    { type: String, default: 'var(--vp-c-brand-contrast)' }
})

const visible = ref(false)

// 计算悬停背景色
const hoverBgComputed = computed(() => {
  const bg = props.btnHoverBg
  if (bg.startsWith('rgba')) return bg
  if (bg.startsWith('#') && bg.length === 7) {
    return `rgba(${hexToRgb(bg)}, ${props.hoverAlpha})`
  }
  return bg
})

const componentStyles = computed(() => ({
  '--btn-color': props.btnColor,
  '--btn-text-color': props.btnTextColor,
  '--btn-hover-bg': hoverBgComputed.value,
  '--btn-hover-text': props.btnHoverText
}))
</script>

<style scoped>
.question-header {
  display: flex;
  align-items: flex-start;
}
.tag-slot {
  flex: 0 0 auto;
  margin-right: 0.6em;
}
.question {
  flex: 1 1 auto;
  min-width: 0;
  word-break: break-word;
  color: var(--vp-c-text-base);
  font-size: 1.05rem;
  line-height: 1.4;
}
.toggle-btn {
  flex: 0 0 auto;
  margin-left: 0.6em;
  padding: 0.5em 1.2em;
  border: 2px solid var(--btn-color);
  background-color: transparent;
  color: var(--btn-color);
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, color 0.2s, border-color 0.2s;
}
.toggle-btn:hover {
  background-color: var(--btn-hover-bg);
  color: var(--btn-hover-text);
  border-color: var(--btn-hover-bg);
}
.toggle-btn:active {
  transform: scale(0.97);
}
.toggle-btn:focus {
  outline: 2px solid var(--btn-hover-bg);
  outline-offset: 2px;
}
.options {
  list-style: decimal;
  padding-left: 1.4em;
  margin: 0.8em 0;
  color: var(--vp-c-text-base);
}
.options li {
  margin-bottom: 0.6em;
}
.correct {
  background-color: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 0 0.3em;
}
.details {
  margin-top: 0.8em;
  font-size: 0.95rem;
  color: var(--vp-c-text-secondary);
  line-height: 1.5;
}
</style>