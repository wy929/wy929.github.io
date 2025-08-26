<template>
  <!-- Sentence mode: only show speaker icon -->
  <span v-if="sentence" class="pron-sentence-container">
    <span 
      @click="play" 
      class="pron-speaker-only" 
      :title="`Click to pronounce sentence (${lang})`"
      :class="{ 'playing': isPlaying }"
    >
      🔊
    </span>
  </span>

  <!-- Word/phonetic mode -->
  <span v-else class="pron-container" :class="{ 'phonetic-only': phoneticOnly }">
    <strong v-if="!phoneticOnly" class="pron-word">{{ word }}</strong>
    <span 
      @click="play" 
      class="pron-phonetic" 
      :title="getTitleText"
      :class="{ 'playing': isPlaying }"
    >
      [{{ cleanPhonetic }}]
      <span v-if="showSpeaker" class="pron-speaker">🔊</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  word?: string
  phonetic?: string
  sentence?: string  // New: for sentence pronunciation mode
  lang?: string
  phoneticOnly?: boolean
  showSpeaker?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'en-US',
  phoneticOnly: false,
  showSpeaker: false
})

const isPlaying = ref(false)

// Remove existing brackets and clean the phonetic notation
const cleanPhonetic = computed(() => {
  return props.phonetic?.replace(/^\[|\]$/g, '').trim() || ''
})

// Generate title text for tooltip
const getTitleText = computed(() => {
  if (props.sentence) {
    return `Click to pronounce sentence (${props.lang})`
  }
  if (props.phoneticOnly) {
    return `Click to pronounce "${props.word}" (${props.lang})`
  }
  return `Click to pronounce (${props.lang})`
})

// Get text to pronounce
const textToPronounce = computed(() => {
  return props.sentence || props.word || ''
})

const play = async () => {
  if (isPlaying.value) return
  
  try {
    isPlaying.value = true
    
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(textToPronounce.value)
      utterance.lang = props.lang
      
      // Adjust speech parameters for better pronunciation
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.volume = 1.0
      
      // Wait for voices to be loaded
      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) {
        // Wait for voices to load
        await new Promise<void>((resolve) => {
          const checkVoices = () => {
            if (window.speechSynthesis.getVoices().length > 0) {
              resolve()
            } else {
              setTimeout(checkVoices, 100)
            }
          }
          checkVoices()
        })
      }
      
      // Try to find a voice that matches the language
      const availableVoices = window.speechSynthesis.getVoices()
      const preferredVoice = availableVoices.find(voice => 
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
      console.warn('Speech synthesis not supported in this browser')
      isPlaying.value = false
    }
  } catch (error) {
    console.error('Error playing pronunciation:', error)
    isPlaying.value = false
  }
}
</script>

<style scoped>
/* Sentence mode container */
.pron-sentence-container {
  display: inline-flex;
  align-items: center;
  padding: 2px 0;
}

.pron-speaker-only {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  opacity: 0.7;
}

.pron-speaker-only:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  opacity: 1;
  transform: scale(1.1);
}

.pron-speaker-only.playing {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  animation: pulse 1s infinite;
  opacity: 1;
}

/* Word/phonetic mode container */
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
  transition: all 0.2s ease;
  border: 1px solid transparent;
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
</style>
  