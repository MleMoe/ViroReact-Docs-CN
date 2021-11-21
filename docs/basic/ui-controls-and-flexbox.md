---
sidebarDepth: 4
---

# UI 控件和 Flexbox

使用传统 UI 控件为场景添加交互性

Viro 场景是 3D 环境，但通常用于显示 2D 内容。 2D 内容提供了一种简单的机制，可以通过文本和图像向用户提供信息，或公开交互目标，例如按钮。

Viro 提供了以下传统的 UI 控件：

- 显示图像（远程或本地）
- 交互接触点
- 显示文本（具有强大的格式选项）
- 传统的进度指示器
- 将视频（远程或本地）流式地传输到 2D 表面上

这些组件中的每一个都支持各种各样的[事件](https://docs.viromedia.com/docs/events)，并具有特定的属性，所有这些属性都记录在上面链接的各自参考指南中。

要将这些控件放置在你的场景中，请设置它们的位置属性并将它们添加到 `<ViroNode>`。然而，由于完全以这种方式放置控件通常既乏味又耗时，我们还实现了 Flexbox，这是一种熟悉且强大的 UI 布局方式。

## flexbox 布局

CSS 中使用 flexbox 算法来布局 2D 组件。可以在[这里](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)找到 CSS flexbox 的一个很好的概述。

与 React Native 非常相似，Viro 支持 flexbox 布局属性的子集。

## 在 viro 中使用 flexbox

要在 Viro 中使用 Flexbox，你需要使用一个 `<ViroFlexView>`。 `<ViroFlexView>` 是一个容器对象，允许你创建锚定在 3D 空间中的 2D 面板。允许成为 `<ViroFlexView>` 子项的组件是 `<ViroText>`、`<ViroImage>`、`<ViroVideo>`、`<ViroButton>`、`<ViroSpinner>` 和 `<ViroFlexView>` 自身。

让我们从一个简单的例子开始：

```js
<ViroFlexView
  style={{ flexDirection: 'row', padding: 0.1 }}
  width={5.0}
  height={5.0}
  position={[-5.0, 0.0, -2.0]}
  rotation={[0, 45, 0]}
>
  <ViroImage source={require('./res/myImage1.jpg')} style={{ flex: 0.5 }} />
  <ViroImage source={require('./res/myImage2.jpg')} style={{ flex: 0.5 }} />
</ViroFlexView>
```

上面代码的结果是一行简单的 2 张图像并排对齐。上面的 `<ViroFlexView>` 有一个 style 属性，它定义了 child 组件的布局。在本例中，我们通过设置 flexDirection:row 告诉 `<ViroFlexView>` 将其 child 项对齐成一行。我们还指出每个 child 都应该有 0.1 的 padding。

`<ViroImage>` 子元素也有样式属性。在这个例子中，它们使用 flex 属性来指示它们在容器内应该有多大。在这种情况下，两个图像的值都是 0.5，因此每个图像最终都占用了容器的一半空间。

这个例子只涉及最基本的 Flexbox 属性。可以在[此处](https://facebook.github.io/react-native/docs/layout-props.html)找到所有布局属性的列表。

## 高级示例

假设你想创建一些更复杂的东西，在顶行中有一个图像，在底行中有两个并排对齐的图像。这将涉及嵌套的 `<ViroFlexView>` 容器。下面的示例演示了如何在 `render()` 中完成此操作：

```js
render() {

//... render code that has <ViroScene>, etc.

<ViroFlexView style={{flexDirection: 'column', padding: .1}}
              width={5.0} height={5.0}
              position={[-5.0, 0.0, -2.0]}
              rotation={[0, 45, 0]} >
  <ViroImage source={require('./res/topImage.jpg')} style={{flex: .5}} />
  <ViroFlexView style={{flex: .5, flexDirection: 'row'}} >
    <ViroImage source={require('./res/myImage1.jpg')} style={{flex: .5}} />
    <ViroImage source={require('./res/myImage2.jpg')} style={{flex: .5}} />
  </ViroFlexView>
</ViroFlexView>

//... whatever other views we have!!
},
```

从上面的示例中，你可以看到我们添加了一个嵌套的 `<ViroFlexView>`，它将子项的 `flexDirection` 更改为 `row` 并添加了填充。你可以根据需要嵌套任意数量的 `<ViroFlexView>` 容器。

请注意，最外面的 `<ViroFlexView>` 是唯一具有位置和旋转属性的元素。位置、旋转和缩放道具仅适用于最外层的 `<ViroFlexView>`。这些属性将 2D 面板锚定在 3D 空间中。

查看我们的[代码示例](https://docs.viromedia.com/docs/code-samples)，了解有关如何使用 Flexbox 在 VR 中创建 2D UI 的更多示例。
