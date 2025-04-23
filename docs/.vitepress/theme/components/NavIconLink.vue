<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vitepress'
import { isMobile as checkUA } from '../utils/mobile'   // 按实际路径修改

/* 图标保持原样 */
import { PhHouseLine, PhNewspaper, PhNotebook, PhArchive } from '@phosphor-icons/vue'

const props = defineProps<{
  to: string
  label: string
  icon: 'home' | 'posts' | 'notes' | 'archive'
  screenMenu?: boolean         // VitePress 注入
}>()

/* ---------- 活跃路由 ---------- */
const route  = useRoute()
const active = computed(() =>
  props.to === '/' ? route.path === '/' : route.path.startsWith(props.to)
)

/* ---------- Mobile 监测：UA + resize ---------- */
const uaMobile = ref(checkUA())       // 初始值
function handleResize() { uaMobile.value = checkUA() }

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

/* ---------- 需要竖排？ ---------- */
const isMobileView = computed(() => props.screenMenu || uaMobile.value)

/* ---------- 图标表 ---------- */
const icons = {
  home: PhHouseLine,
  posts: PhNewspaper,
  notes: PhNotebook,
  archive: PhArchive
}
</script>

<template>
  <a
    :href="to"
    class="nav-link"
    :class="{ active, mobile: isMobileView }"
  >
    <component :is="icons[icon]" size="18" weight="duotone" />
    {{ label }}
  </a>
</template>

<!-- ❗不要 scoped，方便全局覆盖 -->
<style>
/* ── 桌面横排 ───────────────────────────── */
.nav-link{
  display:inline-flex;
  align-items:center;
  gap:.25rem;
  line-height:1.2;
  white-space:nowrap;
  color:var(--vp-c-text-1);
  transition:color .2s;
}
.nav-link.active{color:var(--vp-c-brand-1);}
html.dark .nav-link{color:var(--vp-c-text-dark-1);}

/* ── 手机竖排（screenMenu 或 UA 判定） ── */
.nav-link.mobile{
  display:flex;
  align-items:center;
  width:100%;
  padding:.75rem 1rem;
  /* border-bottom:1px solid var(--vp-c-divider); */
}
.nav-link.mobile:last-child{border-bottom:none;}
</style>
