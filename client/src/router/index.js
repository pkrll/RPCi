import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Browser from '@/components/Browser/Main'
import File from '@/components/Browser/File'
import SystemMain from '@/components/System/Main'
import Settings from '@/components/Settings/Main'
import SettingsBrowser from '@/components/Settings/Browser'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/',
			name: 'Main',
			component: Main
		},
		{
			path: '/browser/',
			name: 'Browser',
			component: Browser,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/browser/:path',
			name: 'Directory',
			component: Browser,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/Browser/:path',
			name: 'File',
			component: File,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/system',
			name: 'System',
			component: SystemMain,
			meta: {
				tab: 2,
				requiresAuth: true
			}
		},
		{
			path: '/settings',
			name: 'Settings',
			component: Settings,
			meta: {
				tab: 3
			}
		},
		{
			path: '/settings/browser',
			name: 'Settings: Browser',
			component: SettingsBrowser,
			meta: {
				tab: 3
			}
		}
  ]
})
