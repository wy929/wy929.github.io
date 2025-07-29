<template>
  <span class="word-liaison-container">
    <span 
      v-for="(segment, index) in parsedSegments" 
      :key="index"
      class="word-liaison-segment"
    >
      <!-- Text content with colored letters -->
      <span class="segment-text">
        <span 
          v-for="(char, charIndex) in segment.chars" 
          :key="charIndex"
          :class="['word-char', { 'colored': char.color }]"
          :style="{ color: char.color || 'inherit' }"
        >
          {{ char.letter }}
        </span>
      </span>
      
      <!-- Liaison arc between words -->
      <span 
        v-if="segment.liaison" 
        class="liaison-arc-container"
      >
        <svg 
          class="liaison-arc" 
          :style="{ '--arc-color': segment.liaison.color }"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path 
            d="M 10 80 Q 50 20 90 80" 
            stroke="var(--arc-color)" 
            stroke-width="1" 
            fill="none"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ColoredChar {
  letter: string
  color?: string
}

interface LiaisonInfo {
  color: string
}

interface WordLiaisonSegment {
  chars: ColoredChar[]
  liaison?: LiaisonInfo
}

interface Props {
  text: string  // Combined syntax: "om<e,blue>l<e,red>tte[~]est bon<j,green>our"
  liaisonColor?: string // Default liaison arc color
}

const props = withDefaults(defineProps<Props>(), {
  liaisonColor: '#e74c3c'
})

// Parse the text with both word coloring and liaison annotations
const parsedSegments = computed(() => {
  const result: WordLiaisonSegment[] = []
  
  // First split by liaison markers: [~] or [~,color]
  const liaisonParts = props.text.split(/(\[[^\]]*\])/)
  
  for (let i = 0; i < liaisonParts.length; i++) {
    const part = liaisonParts[i]
    
    // Check if this is a liaison marker
    if (part.startsWith('[') && part.endsWith(']')) {
      const annotation = part.slice(1, -1) // Remove [ and ]
      
      if (annotation.startsWith('~')) {
        // This is a liaison marker
        const colorPart = annotation.slice(1) // Remove ~
        const color = colorPart.startsWith(',') 
          ? colorPart.slice(1).trim() || props.liaisonColor
          : props.liaisonColor
        
        // Add a space with liaison arc
        result.push({
          chars: [{ letter: ' ' }],
          liaison: { color }
        })
      } else {
        // Not a liaison marker, treat as regular text and parse for word coloring
        result.push({
          chars: parseWordColoring(part)
        })
      }
    } else if (part) {
      // Regular text - parse for word coloring
      result.push({
        chars: parseWordColoring(part)
      })
    }
  }
  
  return result
})

// Parse word coloring annotations like "om<e,blue>l<e,red>tte"
const parseWordColoring = (text: string): ColoredChar[] => {
  const result: ColoredChar[] = []
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
}

// Convert color names to CSS values (same as Word component)
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
    
    // Language learning colors
    'masculine': '#3498db',
    'feminine': '#e74c3c',
    'neutral': '#95a5a6',
    'verb': '#9b59b6',
    'noun': '#2ecc71',
    'adjective': '#f39c12',
  }
  
  return colorMap[colorName.toLowerCase()] || colorName
}
</script>

<style scoped>
.word-liaison-container {
  display: inline-block;
  position: relative;
  line-height: 1.6;
  margin-top: 10px;
  font-family: inherit;
}

.word-liaison-segment {
  display: inline;
  position: relative;
}

.segment-text {
  white-space: pre;
}

.word-char {
  transition: color 0.2s ease;
}

.word-char.colored {
  font-weight: 500;
}

/* Hover effect to highlight colored characters */
.word-liaison-container:hover .word-char.colored {
  text-shadow: 0 0 2px currentColor;
}

.liaison-arc-container {
  display: inline-block;
  position: relative;
  width: 0;
  height: 0;
}

.liaison-arc {
  position: absolute;
  top: -1.6em; /* Use em units for scalability */
  left: -0.5em; /* Use em units for scalability */
  width: 0.8em; /* Use em units for scalability */
  height: 0.7em; /* Use em units for scalability */
  pointer-events: none;
  --arc-color: #e74c3c; /* Default color, can be overridden */
}

.liaison-arc path {
  stroke: var(--arc-color);
  transition: all 0.2s ease;
}

/* Hover effect on liaison arcs */
.word-liaison-container:hover .liaison-arc path {
  stroke-width: 2;
  filter: drop-shadow(0 0 1px var(--arc-color));
}

/* Responsive design */
@media (max-width: 768px) {
  .word-liaison-container {
    line-height: 1.5;
    margin-top: 0.6em;
  }
  
  .liaison-arc {
    width: 0.7em;
    height: 0.6em;
    left: -0.45em;
    top: -1.4em;
  }
}
</style>