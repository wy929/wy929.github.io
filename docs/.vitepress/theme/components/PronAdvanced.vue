<template>
  <span class="pron-container" :class="{ 'phonetic-only': phoneticOnly }">
    <strong v-if="!phoneticOnly" class="pron-word">{{ word }}</strong>
    <span 
      @click="play" 
      class="pron-phonetic" 
      :title="getTitleText"
      :class="{ 'playing': isPlaying, 'has-audio': hasAudioFile }"
    >
      [{{ cleanPhonetic }}]
      <span class="pron-speaker">{{ hasAudioFile ? '🎵' : '🔊' }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  word: string
  phonetic: string
  lang?: string
  phoneticOnly?: boolean
  audioUrl?: string  // 直接指定音频文件URL
  useForvo?: boolean // 是否尝试使用Forvo API
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'en-US',
  phoneticOnly: false,
  useForvo: false
})

const isPlaying = ref(false)
const audio = ref<HTMLAudioElement | null>(null)

// Remove existing brackets and clean the phonetic notation
const cleanPhonetic = computed(() => {
  return props.phonetic.replace(/^\[|\]$/g, '').trim()
})

// Generate title text for tooltip
const getTitleText = computed(() => {
  const baseText = props.phoneticOnly 
    ? `Click to pronounce "${props.word}" (${props.lang})`
    : `Click to pronounce (${props.lang})`
  
  return hasAudioFile.value 
    ? baseText + ' - Real human voice'
    : baseText + ' - Text-to-speech'
})

// Check if we have a real audio file
const hasAudioFile = computed(() => {
  return !!(props.audioUrl || props.useForvo)
})

// Audio library for local files
const audioLibrary: Record<string, Record<string, string>> = {
  'en-US': {
    'hello': '/audio/en-us/hello.mp3',
    'world': '/audio/en-us/world.mp3',
    'missile': '/audio/en-us/missile.mp3',
  },
  'fr-FR': {
    'bonjour': '/audio/fr-fr/bonjour.mp3',
    'merci': '/audio/fr-fr/merci.mp3',
    'au revoir': '/audio/fr-fr/au-revoir.mp3',
  }
}

const getAudioUrl = () => {
  // 1. 直接指定的音频URL优先
  if (props.audioUrl) return props.audioUrl
  
  // 2. 检查本地音频库
  const localAudio = audioLibrary[props.lang]?.[props.word.toLowerCase()]
  if (localAudio) return localAudio
  
  // 3. 如果启用Forvo，尝试获取Forvo音频
  if (props.useForvo) {
    return getForvoAudioUrl()
  }
  
  return null
}

const getForvoAudioUrl = async () => {
  // 注意：这需要CORS代理或后端API来避免跨域问题
  const langCode = props.lang.split('-')[0] // en-US -> en
  try {
    // 这是示例URL，实际使用需要API密钥和CORS处理
    const response = await fetch(`/api/forvo-proxy?word=${encodeURIComponent(props.word)}&lang=${langCode}`)
    const data = await response.json()
    return data.items?.[0]?.pathmp3 || null
  } catch (error) {
    console.warn('Forvo API error:', error)
    return null
  }
}

const playAudioFile = async (url: string) => {
  try {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }

    audio.value = new Audio(url)
    audio.value.addEventListener('ended', () => {
      isPlaying.value = false
    })
    
    audio.value.addEventListener('error', () => {
      isPlaying.value = false
      console.warn('Audio file failed to load, falling back to TTS')
      playTTS()
    })

    await audio.value.play()
  } catch (error) {
    console.warn('Audio playback failed:', error)
    isPlaying.value = false
    playTTS()
  }
}

const playTTS = async () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(props.word)
    utterance.lang = props.lang
    utterance.rate = 0.8
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    // Try to find a voice that matches the language
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.lang.toLowerCase().startsWith(props.lang.toLowerCase().split('-')[0])
    )
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    utterance.onend = () => {
      isPlaying.value = false
    }
    
    utterance.onerror = () => {
      isPlaying.value = false
      console.warn('Speech synthesis failed')
    }
    
    window.speechSynthesis.speak(utterance)
  }
}

const play = async () => {
  if (isPlaying.value) return
  
  try {
    isPlaying.value = true
    
    const audioUrl = getAudioUrl()
    if (audioUrl) {
      await playAudioFile(audioUrl)
    } else {
      playTTS()
    }
  } catch (error) {
    console.error('Error playing pronunciation:', error)
    isPlaying.value = false
  }
}
</script>

<style scoped>
.pron-container {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
}

.pron-container.phonetic-only {
  gap: 0;
}

.pron-word {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.pron-phonetic {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Times New Roman', serif;
  font-style: italic;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.pron-phonetic.has-audio {
  color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-3);
}

.pron-phonetic:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.pron-phonetic.playing {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  animation: pulse 1s infinite;
}

.pron-speaker {
  font-size: 0.8em;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.pron-phonetic:hover .pron-speaker {
  opacity: 1;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Dark mode support */
.dark .pron-word {
  color: var(--vp-c-text-1);
}

.dark .pron-phonetic {
  color: var(--vp-c-brand-1);
}

.dark .pron-phonetic.has-audio {
  color: var(--vp-c-brand-2);
}
</style>