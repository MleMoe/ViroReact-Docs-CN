import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  title: 'ViroReact-AR 中文文档',
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
          {
            text: '基础',
            children: [
              {
                text: 'Scenes',
                link: '/basic/scenes',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default config;
