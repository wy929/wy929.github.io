// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from 'vitepress/theme' // https://vitepress.dev/zh/guide/extending-default-theme#using-different-fonts
import TDesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
// 引入主题的全局样式
import "./style.css";
import Comment from "./components/Comment.vue";
import ImageViewer from "./components/ImageViewer.vue"
import GoBack from "./components/GoBack.vue";


// import PhosphorIcons from '@phosphor-icons/vue'
import NavIconLink from './components/NavIconLink.vue'
import ToggleAnswer from './components/ToggleAnswer.vue'
import QuestionTag from './components/QuestionTag.vue'
import QuestionBlock from './components/QuestionBlock.vue'
import Pron from './components/Pron.vue'

export default {
	...Theme,
	Layout: () => {
		return h(Theme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-after": () => h(Comment),
			"doc-top": () => h(ImageViewer),
			"aside-top": () => h(GoBack),
		});
	},


	enhanceApp({ app, router }: any) {
		app.use(TDesign);
		app.component("Comment", Comment);
		app.component("ImageViewer", ImageViewer);
		app.component("GoBack", GoBack);
		// 全量注册 phosphor-vue 里的组件
		// app.use(PhosphorIcons)
		app.component('NavIconLink', NavIconLink);
		app.component('ToggleAnswer', ToggleAnswer);
		app.component('QuestionTag', QuestionTag);
		app.component('QuestionBlock', QuestionBlock);
		app.component('Pron', Pron)
	},
};

