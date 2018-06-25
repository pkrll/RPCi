import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main/Main.vue';
import Browser from '@/components/Browser/Main/Main.vue';
import File from '@/components/Browser/File/File.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/browse',
      name: 'Browser',
      component: Browser,
      meta: {
				tab: 1,
				requiresAuth: true
			}
    },
    {
			path: '/browse/:path',
			name: 'Directory',
			component: Browser,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
    {
			path: '/browser/file/:path',
			name: 'File',
			component: File,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		}
  ]
});
