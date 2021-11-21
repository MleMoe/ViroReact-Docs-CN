---
sidebarDepth: 4
---

# 图像识别

图像识别是 AR 的一个关键组成部分：它使你能够解读现实世界并做出相应的反应。本指南概述了 Viro 的图像识别功能。

## 图像目标

图像目标是 Viro 将识别和跟踪的参考图像。例如，如果你提供一个特斯拉标志的图像目标，那么你的应用程序每次遇到特斯拉标志时你都可以获得相应回调；在该回调中，你可以创建有关 logo 的虚拟 UI。下面是一个例子：

![img](https://files.readme.io/3269a8e-viro_car_marker_demo.gif)

Viro 中的图像目标由 `ViroARTrackingTargets` 表示。你可以以任何图像（JPG、PNG 等）构建该目标。要开始搜索 logo，请将组件添加到你的 `<ViroARScene>` 或任何 `<ViroNode>`。当 Viro 检测到用户世界中的图像时，将呈现 `<ViroARImageMarker>` 的内容。`<ViroARImageMarker>` 将被持续跟踪并与检测到的图像保持同步。下面是一个简单的用法示例：

```js
// In your render function, add an image marker that references the target
<ViroARScene>
  <ViroARImageMarker target={'targetOne'}>
    <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
  </ViroARImageMarker>
</ViroARScene>;

// Outside of the render function, register the target

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('./res/targetOne.jpg'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
});
```

在下面更复杂的示例中，我们使用“黑豹”电影海报来完成此操作。检测到海报后，我们加载一个代表黑豹的 3D 对象，并让他从海报中跳出来。

```js
// In your render function:

<ViroARScene>
   <ViroAmbientLight color="#ffffff" intensity={200}/>
   <ViroARImageMarker target={"poster"}
                      onAnchorFound={this._onAnchorFound}
                      pauseUpdates={this.state.pauseUpdates}>

   <ViroNode position={[0, -.1, 0]} scale={[0,0,0]} rotation={[-90, 0, 0]}
             dragType="FixedToWorld" onDrag={()=>{}}
             animation={{name:"scaleModel", run:this.state.playAnim}}>

       <Viro3DObject onLoadEnd={this._onModelLoad}
                     source={require('./res/blackpanther/object_bpanther_anim.vrx')}
                     position={[0, -1.45, 0]}
                     scale={[.9,.9,.9]}
                     animation={{name:"01", run:true, loop:false,                                                 onFinish:this._onFinish}}
                     type="VRX" />
     </ViroNode>
</ViroARImageMarker>

// Outside the render function:

ViroARTrackingTargets.createTargets({
  poster : {
    source : require('./res/blackpanther.jpg'),
    orientation : "Up",
    physicalWidth : 0.6096 // real world width in meters
  }
});
```

此示例的完整代码包含在 [Viro Samples](https://github.com/viromedia/viro/tree/master/code-samples/js/ARPosterDemo) 存储库中。最终结果将如下所示：

![黑豹](https://files.readme.io/f56f163-viro_black_panther_marker_demo.gif)

## 连续图像跟踪（仅限 iOS 12）

ARKit 2.0 引入了一个新的 API，它支持连续图像跟踪，而不是简单的图像检测。这使你的标记能够在用户四处移动时被平稳地跟踪和跟随。

该功能通过 `ViroARSceneNavigator` 的新属性 `numberOfTrackedImages` 暴露，该属性可接收同时跟踪的图像个数。例如，如果此数字设置为 3，则将跟踪场景中可见的前 3 个图像。即使总共有 5 个 ViroARImageMarkers，也只会跟踪前 3 个，如果一个标记离开视图，则将跟踪未跟踪的标记。请记住，该数字应保持较低，因为数字越大，性能越差。

## 图像目标质量

谷歌发布了一个工具（用于 OSX 和 Windows）来检查图像目标的质量，可在它们的[网站上](https://developers.google.com/ar/develop/c/augmented-images/arcoreimg)查看。

该工具为 iOS 和 Android 上的图像识别提供了良好的基准。
