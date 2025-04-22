---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<!-- 之所以将代码写在 md 里面，而非单独封装为 Vue 组件，因为 aside 不会动态刷新，参考 https://github.com/vuejs/vitepress/issues/2686 -->
<template v-for="post in curPosts" :key="post.url">
  <h2 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
      >​</a
    >
    <div class="post-date hollow-text source-han-serif">{{ post.date.string }}</div>
  </h2>
  <t-tag
    v-for="tag in post.tags"
    :key="tag"
    class="mr-2"
    variant="outline"
    shape="round"
    >{{ tag }}</t-tag
  >
  <div v-if="post.excerpt" v-html="post.excerpt"></div>
</template>

<!-- <Pagination /> -->
<div class="pagination-container">
  <t-config-provider :global-config="enConfig">
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="total"
      size="small"
      :showPageSize="false"
      :showPageNumber="!isMobile()"
      :showJumper="isMobile()"
      @current-change="onCurrentChange"
    />
  </t-config-provider>
</div>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vitepress';

// 引入英文国际化包
import enConfig from 'tdesign-vue-next/es/locale/en_US';

// 你自己的数据和工具
import { data as posts } from './.vitepress/theme/posts.data.mts';
import { isMobile } from './.vitepress/theme/utils/mobile.ts';

const route = useRoute();
const getPage = () => {
  const search = route.query;
  const searchParams = new URLSearchParams(search as any);
  return Number(searchParams.get('page') || '1');
};

const current = ref(getPage());
const pageSize = ref(10);
const total = ref(posts.length);

const router = useRouter();
router.onAfterRouteChange = () => {
  current.value = getPage();
};

const curPosts = computed(() => {
  return posts.slice(
    (current.value - 1) * pageSize.value,
    current.value * pageSize.value
  );
});

const onCurrentChange = (page: number) => {
  const url = new URL(window.location as any);
  url.searchParams.set('page', page.toString());
  window.history.replaceState({}, '', url);
  window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
/* 去掉.vp-doc li + li 的 margin-top */
.post-title {
  /* 这里替换成你想要的字体名称，务必已在全局引入 */
  /* font-family: 'DM Sans', sans-serif; */
  /* font-weight: 600; */
}
.pagination-container {
  margin-top: 60px;
  :deep(li) {
    margin-top: 0;
  }
}

.mr-2 {
  margin-right: 2px;
}

.post-title {
  margin-bottom: 6px;
  margin-top: 60px;
  border-top: 0;
  position: relative;

  > a {
    font-weight: 400;
  }

  .post-date {
    position: absolute;
    top: -12px;
    left: -10px;
    z-index: -1;
    opacity: .16;
    font-size: 76px;
    font-weight: 900;
  }

  @media (max-width: 425px) {
    .post-date {
      font-size: 60px !important;
    }
  }

  &:first-child {
    margin-top: 20px;
  }
}

.hollow-text {
  /* 设置文本颜色为透明，只保留描边 */
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
