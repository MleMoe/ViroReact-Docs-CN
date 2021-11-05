# Tutorial AR

> 原文：[Tutorial AR](https://docs.viromedia.com/docs/tutorial-ar)

## 前置任务

需要完成 [快速入门](./quick-start) 章节

## 纪念品

这份教程将一步一步地指导你开发出一个简单的 AR app。

你接下来将会：

- 了解 HelloWorldSceneAR.js 这份代码
- 将一个带纹理的 box 放入周围世界场景
- 在场景中添加笑脸 emoji
- 选择一个 AR 放置平面
- 将 emoji 添加到平面上
- 为 emoji 添加阴影效果
- 使 emoji 可拖动
- 为 box 增加动画

## 了解 HelloWorldSceneAR.js

打开你的测试 app，你应该可以在相机视图中看到以下白色的 “Hello World” 字样。

![HelloWorldAR Scene](https://files.readme.io/9a353c5-IMG_BAFBC32D0716-1.jpeg)

您所看到的场景正是 HelloWorldSceneAR.js。App.js 作为应用程序的入口点，拥有一个 ViroARSceneNavigator 组件，HelloWorldSceneAR.js 作为该组件的 initialScene 的 props 输入。

ViroReact 构建在 React Native 之上，并使用 React Native 来轻松创建原生 AR 应用程序。除了了解 Javascript，您还需要了解一些基本的 React 概念，例如 JSX、components、state 和 props。

以下是 HelloWorldSceneAR 的代码

```js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default HelloWorldSceneAR;
```

接下来说说这段代码都做了些什么

## 导入工具 components

代码的最初需要导入我们需要的 components，分别是：

- 从 react 导入 `React` 和 一个 react hooks `useState`
- 从 react native 导入样式工具 `StyleSheet`
- 还需导入这个 app 用到的 react-viro components，如 `ViroARScene`，`ViroText`，`ViroConstants`。

```js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from '@viro-community/react-viro';
```

## HelloWorldSceneAR 组件

在 `import` 语句下面，我们创建了一个 react 函数组件 `HelloWorldSceneAR` 。

首先我们使用 `useState` 来定义一个 `text` state，及其更新函数 `setText()`。变量`text` 类型为字符串，初始化值为 `Initializing AR...`。

接下来我们 return 一个 [jsx](https://zh-hans.reactjs.org/docs/introducing-jsx.html) 语句来描述我们的场景该如何展示。

```js
...
const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};
...
```

在 return 的 jsx 语句中，顶层元素是一个 `ViroARScene` 组件。每个 AR 场景的顶层元素都必须是 `ViroARScene` 。其它组件则只能作为 `ViroARScene` 的子组件。

我们使用一个 callback 类型的参数，`onTrackingUpdated` ，来调用 `onInitialized()` 函数。当跟踪状态为 `TRACKING_NORMAL`时，该函数会将 `text` 设置为 “Hello World！”。

接下来声明一个 `ViroText`，其文本内容根据 `text` 状态在“Initializing AR...”和“Hello World”之间切换。使用 style 属性指定的字体、字体大小和颜色来渲染该文本对象。对象坐标设为[0,0,-1]。在 viro 的坐标系中，观察者面向负 Z 方向，因此物体对象坐标 Z = -1 ，会将其置于观察者的前方。

## 声明样式

在 `HelloWorldSceneAR` 组件之外，还需声明可以在组件中使用的样式。样式通常表示组件的布局属性。

在我们的 app 中，我们使用 `StyleSheet` 创建了一个 `styles` 变量，其内定义了一个名为 `helloWorldTextStyle` 的样式，用于描述 `ViroText` 组件的字体类型、颜色、大小和对齐方式。

```js
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
```

我们已经描述了我们的场景是如何工作的，现在让我们看看如何去扩展它。

## 下载 assets

我们需要做的第一件事是下载我们将用于本教程的资源文件，请按照以下步骤操作：

- 下载资源包：[res](https://github.com/viromedia/ViroARSampleApp/tree/master/js/res)
  > 注：此为 github repo 内文件，请使用任意合适方法下载。可使用插件：[GitZip for github](https://chrome.google.com/webstore/detail/gitzip-for-github/ffabmkklhbepgcgfonabamgnfafbdlkn/related)
- 放至 /ViroSample/js/ 中的 res 文件夹。

## 往场景中加入组件

就以这个 HelloWorld 场景为例，让我们在 "Hello World" 文本对象上加一个 3D Box。我们可用 `ViroBox` 组件做这个事情，可遵循以下步骤：

首先，从 `@viro-community/react-viro` 包中导入 `ViroBox` 和 `ViroMaterials`。

```js
import {
  ...
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';

```

接下来把 Box 加入到场景中。可以参考 [ViroBox API](https://docs.viromedia.com/docs/virobox) 设置 `ViroBox` 对象属性以自定义我们的 Box。

将下面的代码放置在 `ViroText` 组件代码之下：

```js
<ViroBox
  position={[0, -0.5, -1]}
  scale={[0.3, 0.3, 0.1]}
  materials={['grid']}
/>
```

### 定制 ViroBox 属性

在上面的代码啊种，我们把 `ViroBox` 的位置坐标设置为 `[0, -0.5, -1]`，从 y 轴来看，我们把 `Box` 放置在了 `Text` 的下面。

`ViroBox` 物体对象的 `width`、`height` 和 `length` 属性值默认为 1(meter) 。我们通过 `scale` 属性值，将其依序缩放 `[0.3, 0.3, 0.1]`。

`materials` 属性允许我们设置一个预定义好的材质（详情请参考 [ViroMaterials](https://docs.viromedia.com/docs/materials)）作为 Box 的纹理。在这个例子中，我们在 `ViroBox` 上设置了一个名为 `grid` 的材质，我们将在下一步中定义/创建它。

### 定义材质

在我们可以使用上面讲的 `grid` 材质之前，我们需要定义它。由于我们已经导入了 `ViroMaterials`，我们可以简单地在 `styles` 样式声明下方添加以下代码：

```js
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});
```

由此我们定义了一个包含 `diffuseTexture`(漫反射纹理) 的 `grid` 材质。该材质指向 res 目录中的文件 grid_bg.jpg。

这里要注意两点：

- `require()` 函数是 `React` 提供的一个特殊函数，它将文件路径转换为一个可用于获取资源的值。
- `require()` 的参数是一个文件路径，且为一个相对路径。

这个时候，我们的 `HelloWorldSceneAR.js` 代码长这样：

```js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        position={[0, 0, -1]}
        scale={[0.5, 0.5, 0.5]}
        style={styles.helloWorldTextStyle}
      />
      <ViroBox
        position={[0, -0.5, -1]}
        scale={[0.3, 0.3, 0.1]}
        materials={['grid']}
      />
    </ViroARScene>
  );
};

export default HelloWorldSceneAR;
```

保存 `HelloWorldSceneAR.js` 文件，重载 app。你现在应该在 Hello World 文本下看到了一个粉红色和灰色的立方体。

![text and box](https://files.readme.io/0019cfa-IMG_BEC77E650A4B-1.jpeg)

> 对于 ios 设备调试，若要重新加载文件，只需摇动设备，就会出现一个调试菜单，如下所示。点击“重新加载”，将出现一个选择 AR 或 VR 的屏幕。点击 AR，更改将刷新。

## 加一个 3D 物体对象到场景中

现在让我们向场景中添加一个 3D 对象。 res 文件夹中有一个“emoji_smile”文件夹。我们将使用这些文件向场景中添加 3D emoji。
