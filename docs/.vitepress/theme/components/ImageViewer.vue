<template>
	<div class="image-viewer">
	  <ClientOnly>
		<t-config-provider :global-config="globalConfig">
		  <t-image-viewer
			v-model:visible="show"
			:images="previewImageInfo.list"
			:default-index="previewImageInfo.idx"
			:key="previewImageInfo.idx"
			@close="show = false"
		  />
		  <TDesignDark />
		</t-config-provider>
	  </ClientOnly>
	</div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
  import { useRoute } from "vitepress";
  import enConfig from "tdesign-vue-next/es/locale/en_US";
  import zhConfig from "tdesign-vue-next/es/locale/zh_CN";
  
  import TDesignDark from "./TDesignDark.vue";
  
  // 根据路由前缀决定语言：
  //   "/cn/..." → 中文；其余（包括 "/"）→ 英文
  const route = useRoute();
  const globalConfig = ref<typeof zhConfig | typeof enConfig>(enConfig);
  watch(
	() => route.path,
	() => {
	  globalConfig.value = route.path.startsWith("/cn") ? zhConfig : enConfig;
	},
	{ immediate: true }
  );
  
  // 图片预览相关
  const show = ref(false);
  const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>({
	url: "",
	list: [],
	idx: 0,
  });
  
  function previewImage(e: Event) {
	const target = e.target as HTMLElement;
	const container = e.currentTarget as HTMLElement;
	if (target.tagName.toLowerCase() === "img") {
	  const imgs = container.querySelectorAll<HTMLImageElement>(
		".content-container .main img"
	  );
	  const idx = Array.from(imgs).findIndex((el) => el === target);
	  const urls = Array.from(imgs).map((el) => el.src);
  
	  const url = (target as HTMLImageElement).src;
	  previewImageInfo.url = url;
	  previewImageInfo.list = urls;
	  previewImageInfo.idx = idx;
  
	  if (idx === -1) {
		// 点在非主图上的 img
		previewImageInfo.list.push(url);
		previewImageInfo.idx = previewImageInfo.list.length - 1;
	  }
	  show.value = true;
	}
  }
  
  onMounted(() => {
	const docDom = document.querySelector("#VPContent");
	docDom?.addEventListener("click", previewImage);
  });
  
  onUnmounted(() => {
	const docDom = document.querySelector("#VPContent");
	docDom?.removeEventListener("click", previewImage);
  });
  </script>
  
  <style scoped>
  /* 隐藏下载按钮 */
  .t-image-viewer__modal-icon:nth-child(7) {
	display: none !important;
  }
  </style>
  