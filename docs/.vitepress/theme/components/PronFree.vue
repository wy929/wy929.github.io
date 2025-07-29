<template>
  <span class="pron-container" :class="{ 'phonetic-only': phoneticOnly }">
    <strong v-if="!phoneticOnly" class="pron-word">{{ word }}</strong>
    <span 
      @click="play" 
      class="pron-phonetic" 
      :title="getTitleText"
      :class="{ 'playing': isPlaying, 'has-audio': hasRealAudio }"
    >
      [{{ cleanPhonetic }}]
      <span class="pron-speaker">{{ hasRealAudio ? '🎵' : '🔊' }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getBestFreeAudio } from '../utils/freeAudioSources'

interface Props {
  word: string
  phonetic: string
  lang?: string
  phoneticOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'en-US',
  phoneticOnly: false
})

const isPlaying = ref(false)
const hasRealAudio = ref(false)
const audioUrl = ref<string | null>(null)

// Remove existing brackets and clean the phonetic notation
const cleanPhonetic = computed(() => {
  return props.phonetic.replace(/^\[|\]$/g, '').trim()
})

// Generate title text for tooltip
const getTitleText = computed(() => {
  const baseText = props.phoneticOnly 
    ? `Click to pronounce "${props.word}" (${props.lang})`
    : `Click to pronounce (${props.lang})`
  
  return hasRealAudio.value 
    ? baseText + ' - Real human voice'
    : baseText + ' - Text-to-speech'
})

// Check for available free audio on component mount
onMounted(async () => {
  try {
    const audioSource = await getBestFreeAudio(props.word, props.lang)
    if (audioSource) {
      audioUrl.value = audioSource.url
      hasRealAudio.value = true
    }
  } catch (error) {
    console.warn('Failed to load free audio:', error)
  }
})

const playRealAudio = async (url: string): Promise<boolean> => {
  try {
    const audio = new Audio(url)
    
    return new Promise((resolve) => {
      audio.addEventListener('ended', () => {
        isPlaying.value = false
        resolve(true)
      })
      
      audio.addEventListener('error', () => {
        console.warn('Real audio failed to load')
        isPlaying.value = false
        resolve(false)
      })
      
      audio.play()
    })
  } catch (error) {
    console.warn('Real audio playback failed:', error)
    return false
  }
}

const playTTS = () => {
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
  } else {
    isPlaying.value = false
    console.warn('Speech synthesis not supported')
  }
}

const play = async () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  
  // Try real audio first, fallback to TTS
  if (audioUrl.value) {
    const success = await playRealAudio(audioUrl.value)
    if (!success) {
      playTTS()
    }
  } else {
    playTTS()
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
  color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-3);
  background-color: var(--vp-c-green-dimm);
}

.pron-phonetic:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.pron-phonetic.has-audio:hover {
  background-color: var(--vp-c-green-soft);
  border-color: var(--vp-c-green-1);
}

.pron-phonetic.playing {
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
  color: var(--vp-c-green-1);
  background-color: var(--vp-c-green-dimm);
}
</style>