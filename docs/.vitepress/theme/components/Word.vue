<template>
  <span class="word-container">
    <span 
      v-for="(char, index) in parsedChars" 
      :key="index"
      :class="['word-char', { 'colored': char.color }]"
      :style="{ color: char.color || 'inherit' }"
    >
      {{ char.letter }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ColoredChar {
  letter: string
  color?: string
}

interface Props {
  text: string  // The word with color annotations like "om<e,blue>l<e,red>tte"
}

const props = defineProps<Props>()

// Parse the text with color annotations
const parsedChars = computed(() => {
  const result: ColoredChar[] = []
  const text = props.text
  let i = 0
  
  while (i < text.length) {
    const char = text[i]
    
    // Check if this is a color annotation: <letter,color>
    if (char === '<') {
      const closeIndex = text.indexOf('>', i)
      if (closeIndex !== -1) {
        const annotation = text.slice(i + 1, closeIndex)
        const [letter, colorName] = annotation.split(',').map(s => s.trim())
        
        if (letter && colorName) {
          result.push({
            letter,
            color: getColorValue(colorName)
          })
          i = closeIndex + 1
          continue
        }
      }
    }
    
    // Regular character
    result.push({
      letter: char
    })
    i++
  }
  
  return result
})

// Convert color names to CSS values
const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    // Basic colors
    'red': '#e74c3c',
    'blue': '#3498db',
    'green': '#2ecc71',
    'yellow': '#f1c40f',
    'orange': '#e67e22',
    'purple': '#9b59b6',
    'pink': '#e91e63',
    'brown': '#8d6e63',
    'gray': '#95a5a6',
    'grey': '#95a5a6',
    'black': '#2c3e50',
    'white': '#ecf0f1',
    
    // Extended colors
    'darkred': '#c0392b',
    'darkblue': '#2980b9',
    'darkgreen': '#27ae60',
    'lightblue': '#74b9ff',
    'lightgreen': '#55efc4',
    'lightred': '#fd79a8',
    
    // French learning specific colors (common in language learning)
    'masculine': '#3498db',    // blue for masculine
    'feminine': '#e74c3c',     // red/pink for feminine
    'neutral': '#95a5a6',      // gray for neutral
    'verb': '#9b59b6',         // purple for verbs
    'noun': '#2ecc71',         // green for nouns
    'adjective': '#f39c12',    // orange for adjectives
  }
  
  // Return mapped color or treat as direct CSS color value
  return colorMap[colorName.toLowerCase()] || colorName
}
</script>

<style scoped>
.word-container {
  display: inline;
  font-family: inherit;
}

.word-char {
  transition: color 0.2s ease;
}

.word-char.colored {
  font-weight: 500;
}

/* Hover effect to highlight colored characters */
.word-container:hover .word-char.colored {
  text-shadow: 0 0 2px currentColor;
}
</style>