<template>
	<div class="comments" v-if="!frontmatter.isNoComment">
	  <!-- params generate in https://giscus.app/zh-CN -->
	  <Giscus
		v-if="showComment"
		repo="Justin3go/justin3go.com"
		repo-id="R_kgDOJq6kjw"
		category="Announcements"
		category-id="DIC_kwDOJq6kj84CW7-L"
		mapping="specific"
		:term="term"
		strict="1"
		reactions-enabled="1"
		emit-metadata="0"
		input-position="top"
		:theme="theme"
		:lang="lang"
		loading="lazy"
		crossorigin="anonymous"
	  />
	</div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, nextTick, computed } from "vue";
  import { useData, useRoute } from "vitepress";
  import Giscus from "@giscus/vue";
  
  const route = useRoute();
  const { isDark, frontmatter } = useData();
  
  // root "/" → English；"/cn/..." → 中文
  const term = computed(() =>
	route.path.startsWith("/cn") ? route.path.slice(3) : route.path
  );
  const theme = computed(() =>
	isDark.value ? "noborder_dark" : "noborder_light"
  );
  const lang = computed(() =>
	route.path.startsWith("/cn") ? "zh-Hans" : "en"
  );
  
  // 强制在路由变化时重新渲染 Giscus
  const showComment = ref(true);
  watch(
	() => route.path,
	() => {
	  showComment.value = false;
	  nextTick(() => {
		showComment.value = true;
	  });
	},
	{ immediate: true }
  );
  </script>
  
  <style lang="scss" scoped>
  .comments {
	margin-top: 80px;
  }
  </style>
  