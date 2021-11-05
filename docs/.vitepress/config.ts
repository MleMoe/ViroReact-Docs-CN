import type { UserConfig } from 'vitepress';

const config: UserConfig = {
	title: 'Viro CN Docs',
	description: 'the Chinese version of viro media/community documents',
	lang: 'zh-CN',
	themeConfig: {
		displayAllHeaders: true,
		sidebar: [
			{
				path: '/',
				children: [
					{
						text: '前言',
						link: '/',
					},
					{
						text: '起步',
						link: '/getting-started/',
						children: [
							{
								text: '快速上手',
								link: '/getting-started/quick-start',
							},
							{
								text: 'AR 教程',
								link: '/getting-started/tutorial-ar',
							},
						],
					},
				],
			},
		],
	},
};

export default config;
