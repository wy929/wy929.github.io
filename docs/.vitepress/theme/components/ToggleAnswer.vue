<template>
  <div class="toggle-answer">
    <!-- 问题和按钮同一行 -->
    <div class="question-header">
      <div class="question"><slot name="question" /></div>
      <button class="toggle-btn" @click="visible = !visible">
        {{ visible ? hideLabel : showLabel }}
      </button>
    </div>
    <!-- 选项列表始终显示 -->
    <ol class="options">
      <li v-for="(opt, idx) in options" :key="idx">
        <span :class="{ correct: visible && idx === correctIndex }">{{ opt }}</span>
      </li>
    </ol>
    <!-- 详细解释，仅在 visible 时显示 -->
    <div class="details" v-show="visible">
      <slot name="details" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  /** 候选项数组 */
  options: { type: Array, required: true },
  /** 正确答案下标（从 0 开始） */
  correctIndex: { type: Number, required: true },
  /** 按钮‘显示’状态文字 */
  showLabel: { type: String, default: '显示答案' },
  /** 按钮‘隐藏’状态文字 */
  hideLabel: { type: String, default: '隐藏答案' }
})

const visible = ref(false)
</script>

<style scoped>
.toggle-answer {
  display: flex;
  flex-direction: column;
}
.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
.question {
  flex: 1;
  font-weight: 500;
  color: var(--vp-c-text-base);
}
.toggle-btn {
  padding: 0.4em 1em;
  border: 1px solid var(--vp-c-border-muted);
  border-radius: var(--vp-border-radius);
  background: var(--vp-c-bg-emphasis);
  color: var(--vp-c-emphasis);
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.options {
  list-style: decimal;
  padding-left: 1.2em;
  margin: 0;
  color: var(--vp-c-text-base);
}
.options li {
  margin-bottom: 0.5em;
}
.correct {
  background-color: var(--vp-c-brand-soft);
  border-radius: 2px;
  padding: 0 0.2em;
}
.details {
  margin-top: 0.8em;
  font-size: 0.95em;
  color: var(--vp-c-text-secondary);
}
</style>
