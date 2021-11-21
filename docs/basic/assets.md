---
sidebarDepth: 4
---

# Assets 资源

将资源加载到你的场景中

资源是应用程序所需的文本或二进制资源。其中包括图像、纹理、声音、视频等。对于绝大多数组件，包括 `<ViroImage>`、`<ViroSound>`、`<ViroVideo>` 等，要使用的资源是通过 source 属性指定的。

`source` 接受本地和远程资源。要使用本地资源，请使用 require 函数，如下所示：

```js
<Viro360Image source={require('./res/360_park.jpg')} />
```

在调试版本中，本地资源从正在运行的包服务器中提取。在发布版本中，本地资源与你的应用程序捆绑在一起。

要使用远程资源，只需设置源 URI，如下例所示：

```js
<Viro360Image source={{ uri: 'https://www.mywebsite.com/360_park.jpg' }} />
```

> **资源文件命名指南**
> 包服务器和资源捆绑器将无法正确提供名称中包含空格、连字符、括号或其它符号的资源。
> 名称相同但扩展名不同的资源在 Android 上不起作用。为每个资源提供唯一的名称。

## 支持的资源类型

React Native 开箱即用地支持以下资源，这意味着它们将在发布模式下与你的应用程序一起打包，并在调试模式下由你的包服务器支持获取。

图片格式：“jpg”、“jpeg”、“png”、“gif”
视频格式：“m4v”、“mov”、“mp4”、“mpeg”、“mpg”、“webm”
音频格式：“aac”、“aiff”、“caf”、“m4a”、“mp3”、“wav”

此外，Viro 增加了对 3D 对象资源的支持：
3D 对象格式：obj、mtl、vrx（Viro 自定义 3d 模型格式）、gltf、glb、bin、arobject

> Viro 仅为通过 react-viro-cli 脚本创建的项目添加了对这些格式的支持。对于不是使用此脚本创建的项目，必须按照下一部分手动添加这些格式。

## 增加资源类别

> 区分大小写
> 资源类型区分大小写！例如，默认情况下不支持“JPG”作为扩展名，而“jpg”支持。

要添加其它资源类型，请编辑（如果不存在则创建）项目根目录（包含 node_modules 的文件夹）的 rn-cli.config 文件。在此文件中，编辑 getAssetExts() 以返回你想要包含的其它资源类型。

```js
'use strict';

const blacklist = require('react-native/packager/blacklist');
const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetRoots() {
    return this._getRoots();
  },

  getAssetExts() {
    return [
      'obj',
      'mtl',
      'JPG',
      'vrx',
      'hdr',
      'gltf',
      'glb',
      'bin',
      'arobject',
      'gif',
    ];
  },

  getBlacklistRE() {
    return blacklist();
  },

  _getRoots() {
    // match on either path separator
    if (__dirname.match(/node_modules[\/\\]react-native[\/\\]packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else if (__dirname.match(/Pods\/React\/packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else {
      return [path.resolve(__dirname, '.')];
    }
  },

  getTransformModulePath() {
    return require.resolve('react-native/packager/transformer');
  },
};
```
