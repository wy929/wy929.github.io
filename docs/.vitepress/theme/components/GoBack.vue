<template>
	<t-button
	  v-if="isPosts && !frontmatter.isNoBackBtn"
	  theme="default"
	  variant="dashed"
	  style="margin-bottom: 10px"
	  @click="goBack"
	>
	  <template #icon><RollbackIcon /></template>
	  {{ isEN ? "Go back" : "返回上一页" }}
	</t-button>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useRoute, useData } from "vitepress";
  import { RollbackIcon } from "tdesign-icons-vue-next";
  
  const route = useRoute();
  const { frontmatter } = useData();
  
  // 如果路径以 /cn 开头，则认为是中文页面，否则是英文页面
  const isEN = computed(() => !route.path.startsWith("/cn"));
  
  // posts 页面在 /posts（英文）或 /cn/posts（中文）
  const isPosts = computed(() =>
	route.path.startsWith("/posts") ||
	route.path.startsWith("/cn/posts")
  );
  
  function goBack() {
	if (window.history.length <= 1) {
	  // 没有上一页就跳到首页（保留语言前缀）
	  location.href = isEN.value ? "/" : "/cn/";
	} else {
	  window.history.go(hashChangeCount.value);
	  hashChangeCount.value = -1;
	}
  }
  
  const hashChangeCount = ref(-1);
  onMounted(() => {
	window.onhashchange = () => {
	  hashChangeCount.value--;
	};
  });
  onUnmounted(() => {
	window.onhashchange = null;
  });
  </script>
  
  <style scoped>
  .img-container {
	height: 105px;
	width: 100px;
  }
  
  img {
	height: 100px;
	border-radius: 5px;
	margin-top: 5px;
  }
  </style>
  