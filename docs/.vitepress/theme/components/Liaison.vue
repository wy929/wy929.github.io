<template>
  <span class="liaison-container">
    <span 
      v-for="(segment, index) in parsedSegments" 
      :key="index"
      class="liaison-segment"
    >
      <!-- Text content -->
      <span class="segment-text">{{ segment.text }}</span>
      
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

interface LiaisonInfo {
  color: string
}

interface LiaisonSegment {
  text: string
  liaison?: LiaisonInfo
}

interface Props {
  text: string  // Text with liaison annotations like "Il est [~] chinois" or "Il [~,red] est chinois"
  color?: string // Default arc color
}

const props = withDefaults(defineProps<Props>(), {
  color: '#e74c3c'
})

// Parse the text with liaison annotations
const parsedSegments = computed(() => {
  const result: LiaisonSegment[] = []
  
  // Split by liaison markers: [~] or [~,color]
  const parts = props.text.split(/(\[[^\]]*\])/)
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    
    // Check if this is a liaison marker
    if (part.startsWith('[') && part.endsWith(']')) {
      const annotation = part.slice(1, -1) // Remove [ and ]
      
      if (annotation.startsWith('~')) {
        // This is a liaison marker
        const colorPart = annotation.slice(1) // Remove ~
        const color = colorPart.startsWith(',') 
          ? colorPart.slice(1).trim() || props.color
          : props.color
        
        // Add a space with liaison arc
        result.push({
          text: ' ',
          liaison: { color }
        })
      } else {
        // Not a liaison marker, treat as regular text
        result.push({ text: part })
      }
    } else if (part) {
      // Regular text
      result.push({ text: part })
    }
  }
  
  return result
})
</script>

<style scoped>
.liaison-container {
  display: inline-block;
  position: relative;
  line-height: 1.6; /* Reduced space for arcs */
  margin-top: 10px; /* Space for arcs above */
}

.liaison-segment {
  display: inline;
  position: relative;
}

.segment-text {
  white-space: pre; /* Preserve spaces */
}

.liaison-arc-container {
  display: inline-block;
  position: relative;
  width: 0; /* Take no horizontal space */
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

/* Hover effect on the container */
.liaison-container:hover .liaison-arc path {
  stroke-width: 2;
  filter: drop-shadow(0 0 1px var(--arc-color));
}

/* Responsive design */
@media (max-width: 768px) {
  .liaison-container {
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