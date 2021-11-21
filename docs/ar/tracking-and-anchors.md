---
sidebarDepth: 4
---

# 追踪与锚点

当你使用 AR 时，你会关注的第一件事一定是相机传送过来的背景影像。这个相机背景代表着真实世界。Viro 可以让你与真实世界融合虚拟对象和 UI。可以使用跟踪和锚点来完成此操作。

## 相机追踪

viro 支持 6 自由度的 AR 体验开发，这意味着 viro 通过移动虚拟相机来响应用户的旋转和位置。

viro AR 和 VR 一样，使用右手坐标系，相机的初始坐标点为 `[0, 0, 0]`，看向 `[0, 0, -1]` 方向，摆放位置为 `[0, 1, 0]`

<div style="text-align: center;">
  <img src="https://files.readme.io/2b217fb-camera.png" height=300 />
</div>

当用户首次进入 AR 体验时，相机将放置在 `[0,0,0]` 点，同时底层的 AR 系统会得到其方位信息。在短暂的一会后，相机跟踪就会完成，开发人员会接收 `OntrackingInitialized` 回调，此时相机已经可以跟踪用户在其世界的移动。

## 锚检测

向真实世界添加虚拟内容的主要方法是侦听 AR 系统检测到的锚点。锚点是真实世界中发现的垂直/水平平面，或者是图像（如海报或标记）。若想将内容附加到图像，请参阅[图像识别](https://docs.viromedia.com/docs/ar-image-recognition)。本指南描述了将内容添加到检测到的平面的两种方法。

### 自动锚定

要启用自动锚定，请为组件传入 minheight 和 minwidth 属性。在检测到平面时，将在组件（作为子组件）内嵌入您想要显示的内容。

当 AR 系统找到与给定尺寸匹配的平面时，将会与现实世界平面固定，并且显示子组件。这些子组件使用平面组件的坐标体系。任何真实世界平面的更新将通过 [`ViroARScene`](https://docs.viromedia.com/docs/viroarscene)的回调函数`onAnchorFound`、 `onAnchorUpdated` 和 `onAnchorRemoved` 反馈给开发人员。

例如，下面的示例将在检测到宽度和高度至少为 0.5 米的平面时，显示一个 box。

```js
<ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}>
  <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
</ViroARPlane>
```

### 手动锚定

手动锚定让开发人员通过监听所有传入的锚点来专门选择要使用的平面，而不是让平台选择第一个符合声明要求的可用平面。

要侦听检测到的锚点，请对 `ViroARScene` 组件设置 `onAnchorFound`、`onAnchorUpdated` 和 `onAnchorRemoved` 侦听器。找到合适的锚点后，在渲染函数中设置要固定到该锚点的平面的 `anchorId` 属性。

```js
<ViroARPlane anchorId={foundAnchor.anchorId}>
  <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
</ViroARPlane>
```
