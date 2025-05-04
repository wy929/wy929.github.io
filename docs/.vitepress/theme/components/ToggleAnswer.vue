<template>
    <div class="toggle-answer">
      <button class="toggle-btn" @click="visible = !visible">
        {{ visible ? '隐藏答案' : '显示答案' }}
      </button>
      <div v-show="visible" class="answer-box">
        <!-- 选项列表 -->
        <ol class="options">
          <li
            v-for="(opt, idx) in options"
            :key="idx"
            :class="{ correct: idx === correctIndex }"
          >
            {{ opt }}
          </li>
        </ol>
        <!-- 扩展的答案详情，通过命名 slot 注入 -->
        <div class="details">
          <slot name="details" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    /** options：所有候选项数组 */
    options: {
      type: Array,
      required: true
    },
    /** correctIndex：正确项在 options 中的下标（0 开始） */
    correctIndex: {
      type: Number,
      required: true
    }
  })
  
  const visible = ref(false)
  </script>
  
  <style scoped>
  .toggle-btn {
    padding: 0.4em 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    margin-bottom: 0.5em;
  }
  .answer-box { 
    margin-top: 0.5em; 
  }
  /* 选项列表样式 */
  .options {
    padding-left: 1.2em;
    margin: 0.2em 0;
  }
  /* 正确选项的高亮 */
  .correct {
    background-color: #e6ffed;
    border-left: 3px solid #42b983;
    padding-left: 0.4em;
  }
  /* slot “details” 区域样式 */
  .details {
    margin-top: 0.8em;
    font-size: 0.95em;
    color: #444;
  }
  </style>
  