<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import {                    // 基础组件名
  PhHouseLine,
  PhNewspaper,              // Posts
  PhNotebook,               // Notes
  PhArchiveBox              // Archive
} from '@phosphor-icons/vue'

const props = defineProps<{
  to: string
  label: string
  icon: 'home' | 'posts' | 'notes' | 'archive'
}>()

const icons = { home: PhHouseLine, posts: PhNewspaper, notes: PhNotebook, archive: PhArchiveBox }

const route = useRoute()                     // 官方 API
// const active = computed(() => route.path?.startsWith(props.to) || false)
const active = computed(() =>
  props.to === '/'
    ? route.path === '/'             // 只在首页高亮
    : route.path.startsWith(props.to) // 其余栏目保持前缀匹配
)

</script>

<template>
  <a :href="to" class="nav-link" :class="{ active }">
    <component :is="icons[icon]" size="18" weight="duotone" style="margin-right:4px" />
    {{ label }}
  </a>
</template>

<style scoped>
.nav-link {
  /* 让图标和文字排成一行 */
  display: inline-flex;      /* 或 flex，都可以 */
  align-items: center;       /* 垂直居中 */
  gap: .1rem;               /* 图标与文字的水平间距 */
  line-height: 1.2;          /* 防止 mobile 菜单里行高过大 */
  white-space: nowrap;       /* 避免图标/文字被换行拆开 */
}

/* 高亮状态（沿用之前的变量即可） */
.nav-link.active {
  color: var(--vp-c-brand-1);
}
</style>

