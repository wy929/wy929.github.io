<template>
    <span class="question-tag">
      <span class="level">{{ level }}</span>
      <span class="date">{{ year }}-{{ month }}</span>
      <span class="no">Q{{ question }}</span>
    </span>
  </template>
  
  <script setup>
  const props = defineProps({
    level:    { type: String, required: true }, // e.g. "N2"
    year:     { type: [String, Number], required: true }, // e.g. 2010
    month:    { type: [String, Number], required: true }, // e.g. 7
    question: { type: [String, Number], required: true }  // e.g. 9
  })
  </script>
  
  <style scoped>
  .question-tag {
    display: inline-flex;
    gap: 0.3em;
    font-size: 0.8em;
    padding: 0.0em 0.4em;
    border-radius: var(--vp-border-radius);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
  }
  .level { font-weight: bold; }
  .date  { opacity: 0.8; }
  .no    { font-style: italic; }
  </style>
  