<template>
    <span @click="play" class="pron" :title="lang">
      {{ phonetic }}
    </span>
  </template>
  
  <script>
  export default {
    props: {
      // 要发音的单词/短语
      word: {
        type: String,
        required: true
      },
      // 要显示的音标
      phonetic: {
        type: String,
        required: true
      },
      // 语言代码，默认英语
      lang: {
        type: String,
        default: 'en-US'
      }
    },
    methods: {
      play() {
        // Web Speech API
        const utter = new SpeechSynthesisUtterance(this.word);
        utter.lang = this.lang;
        window.speechSynthesis.speak(utter);
      }
    }
  }
  </script>
  
  <style>
  .pron {
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  