---
sidebarDepth: 4
---

# 场景导航

`<Viro*SceneNavigator>` 处理 `<ViroScene>` 对象之间的过渡。它启用了 3D 场景间的一个导航堆栈(stack)。

> \* 指代 AR 或者 VR

Viro 显示在栈顶的场景。要进入新场景，只需将该场景入栈即可（push 操作）。要返回上一个场景，仅需将当前场景从堆栈中弹出（pop 操作）。每个场景都有一个 `sceneNavigator` 属性，这个属性指代场景导航器本身，于是场景可以自行应用这些导航操作。

这是一个简单的例子，展示了用一个 `<ViroVRSceneNavigator>` 来渲染一个简单的初始场景。

```js
var FirstScene = require('./FirstScene');

var ViroSceneNav = React.createClass({
  render: function () {
    return (
      <ViroVRSceneNavigator
        initialScene={{
          scene: FirstScene,
        }}
      />
    );
  },
});
```

启动 APP，会显示 FirstScene.js 中导出的场景。这个例子中，`FirstScene` 是一个放置图像的简单场景，如下所示：

```js
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function () {
    return (
      <ViroScene>
        <ViroImage
          source={require('./res/image.jpg')}
          position={[0, 0, -5]}
          onClick={this._pushNextScene}
        />
      </ViroScene>
    );
  },

  _pushNextScene() {
    this.props.sceneNavigator.push({ scene: SecondScene });
  },
});

module.exports = FirstScene;
```

这个图片有一个单击处理程序 `_pushNextScene()`，当触发时，会将 `SecondScene` 入栈。请注意，场景导航器始终可通过 `this.props.sceneNavigator` 使用（而不仅仅只在 `Scene` 对象中）。

`SecondScene` 入栈，就会被渲染，直到另一个新场景入栈，或者通过 `this.props.sceneNavigator.pop()` 将之从栈中弹出。

> 提示：确保没有弹出栈中的最后一个场景元素，否则会导致在开发中出现带有“无法弹出低于 0”信息的红屏，以及发布时会程序崩溃！

## 跳转

除了 `push` 和 `pop` 场景，你还可以在场景间使用 `jump` 跳转操作。

`jump` 被用来即时跳转场景导航栈中存在的场景。如果要跳转的场景本来就存在于栈中，那么就把该场景移至栈顶，将之显示给用户。如果该场景不在栈中，直接将之 push 入栈顶。

当 APP 需要频繁在多个场景中切换的时候，`jump` 操作会很有用。而且 `jump` 经过优化，比单纯的 `push` 和 `pop` 操作组合响应更快。

> 注意，为了能准确跳转场景，每个场景都需要有一个 **scene key**。这个 key 是场景的标识符，使 Viro 能够识别出该场景何时进入堆栈，可以快速跳转到该场景。

```js
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function () {
    return (
      <ViroScene>
        <ViroImage
          source={require('./res/image.jpg')}
          position={[0, 0, -5]}
          onClick={this._jumpNextScene}
        />
      </ViroScene>
    );
  },

  _jumpNextScene() {
    this.props.sceneNavigator.jump('scene2', { scene: SecondScene });
  },
});

module.exports = FirstScene;
```

## 替换

最后，为了简单的替换栈顶场景，我们可以简单地使用 `replace` 方法。`replace` 对于一个不需要使用分层的场景栈来说很有用，只要在根级别简单地交换两个场景就可以了。

```js
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function () {
    return (
      <ViroScene>
        <ViroImage
          source={require('./res/image.jpg')}
          position={[0, 0, -5]}
          onClick={this._replaceNextScene}
        />
      </ViroScene>
    );
  },

  _replaceNextScene() {
    this.props.sceneNavigator.replace({ scene: SecondScene });
  },
});

module.exports = FirstScene;
```

## 场景间传参

对于大部分移动端 app 来说，你可能需要通过不同的 experiences 操作体验，或者场景，来传递信息。

例如，如果用户从虚拟菜单中选择一个项目，然后在新进入的场景中显示，你的 app 就需要将所选项目信息传递到新场景中。

在 viro 中，有 3 种方法能让你在场景之间传递数据。

- **方法 1：使用 `passProps`**
  如果你想要传一些静态的数据给下一个场景，可以在场景导航中使用 `passProps` 参数。这个方法对于传递静态/不可辨的参数给单个场景来说很有用处。
  一旦使用这个参数推送场景数据，就无法更改 passProp！ （要解决这个问题，可以使用下面的第二种方法。）

```js
// For your initial scene, you can populate passProps as part of
// the initialScene dictionary, using the following syntax:
<ViroARSceneNavigator
          apiKey="API_KEY_HERE"
          initialScene={{
                      scene:InitialARScene,
                                passProps:{displayObject:true}
          }}/>

// To Pass properties when pushing another scene, use the following syntax:
this.props.sceneNavigator.jump("Shop", {
    scene : require('./Shop'),
    passProps: {
        displayObject : true
    }
);
```

然后在我们的 InitialARScene 中，你应该能够使用 `this.props.displayObject` 引用传进来的值。

- **方法 2：使用 `viroAppProps`**
  事实上，场景导航器对象也是作为一个参数传递给每个场景的，参数名字为 `sceneNavigator` ，如果你使用的是 AR 场景导航器 `ViroARSceneNavigator` 的话，就叫做 `arSceneNavigator` 。这个导航器对象有一个叫做 `viroAppProps` 的字典对象，你可以把它当成一个全局的字典对象来在你的 app 里存储或者传递数据。它可以被用来维持应用状态。

```js
// For your initial scene, you treat viroAppProps as a
// global dictionary container with which to pass information.
<ViroARSceneNavigator
  apiKey='API_KEY_HERE'
  initialScene={{ scene: InitialARScene }}
  viroAppProps={{ displayObject: false }}
/>;

// To pass information from the current scene to the next, simply
// reference the dictionary with the sceneNavigator that is passed
// to each scene.
this.props.sceneNavigator.viroAppProps = { displayObject: true };
```

接下来你可以在 `InitialARScene` 中检查一下 `this.props.sceneNavigator.viroAppProps.displayObject` 的值。

- **方法 3：使用 `Redux`**

通常来说，假如你想在多个组件之间共享 props ，我建议使用 Redux 去管理应用状态。这更加适合偏大型项目，先前提到的两种方案在项目越来越大的时候是不够的。

> 关于如何在 react native 中使用 redux，可参考这篇文档：[getting-started-with-react-native-redux](https://medium.com/@jonlebensold/getting-started-with-react-native-redux-2b01408c0053)
