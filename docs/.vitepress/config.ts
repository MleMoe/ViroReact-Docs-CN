import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  title: 'ViroReact-AR 中文文档',
  description: 'the Chinese version of viro media/community documents',
  lang: 'zh-CN',
  base: '/ViroReact-Docs-CN/',
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
              {
                text: 'Scene Navigation',
                link: '/basic/scene-navigation',
              },
              {
                text: '输入事件',
                link: '/basic/input-events',
              },
              {
                text: '3d 对象',
                link: '/basic/3d-objects',
              },
              {
                text: '资源文件',
                link: '/basic/assets',
              },
              {
                text: 'UI 控件 & flex 布局',
                link: '/basic/ui-controls-and-flexbox',
              },
            ],
          },
          {
            text: 'AR',
            children: [
              {
                text: '概述',
                link: '/ar/overview',
              },
              {
                text: '追踪与锚点',
                link: '/ar/tracking-and-anchors',
              },
              {
                text: '交互',
                link: '/ar/interaction',
              },
              {
                text: '图像识别',
                link: '/ar/image-recognition',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default config;
