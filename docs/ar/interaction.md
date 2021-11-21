---
sidebarDepth: 4
---

# 交互

Viro 支持多种机制，用户可以通过这些机制与现实世界和虚拟 UI 进行交互。下面是详细。

## AR 命中检测

`<ViroARScene>` 有多种方法用于针对现实世界进行“命中测试”。这些命中测试可用于（尽 Viro 的最大能力）确定 2D 屏幕上的给定点存在哪些真实世界的特征。请注意，由于视图上的单个 2D 点对应于场景中的 3D 射线，因此可能会返回多个结果（每个在不同的深度）。结果可能是锚点——比如平面——或者它们可能是尚未完全识别的特征点。

在下面的示例中，我们使用射线执行 AR 命中测试。有关 AR 命中测试的更多详细信息，请参阅 [ViroARScene](https://docs.viromedia.com/docs/viroarscene) 和 [ARHitTestResult](https://docs.viromedia.com/docs/viroarscene#ARHitTestResult) 参考。

```js
this.refs['arscene']
  .performARHitTestWithRay(orientation.forward)
  .then((results) => {
    for (var i = 0; i < results.length; i++) {
      let result = results[i];
      if (result.type == 'ExistingPlaneUsingExtent') {
        // We hit a plane, do something!
      }
    }
  });
```

## 固定世界拖拽

通常在拖动 `<ViroNode>` 节点时（通过设置其 `onDrag` 属性），节点在拖动时与用户保持固定距离，就好像用户正在将节点拖过球体的内表面。这称为固定距离拖动。

Viro 还支持在 AR 中进行 FixedToWorld 拖动，其中拖动节点与用户的距离不是固定的，而是由其与最近的真实世界对象的交点决定的。例如，这对于在现实世界的表面上拖动虚拟对象很有用。要启用此功能，请将节点的 `dragType` 属性设置为 `FixedToWorld`。

## 固定平面拖拽

固定到平面拖动能让你自主指定可以拖动 `<ViroNode>` 的平面。该节点将无法离开该平面。您还可以指定节点可以移动的距离相机的最大距离，以防止用户将节点拖到无穷远处。为此，请将节点的 `dragType` 属性设置为 `FixedToPlane`。然后要定义平面，设置 `dragPlane` 属性。您可以通过指定平面上的任何点和平面的法线向量来定义可沿其拖动节点的平面。

```js
dragPlane: PropTypes.shape({
  planePoint  : PropTypes.arrayOf(PropTypes.number),
  planeNormal : PropTypes.arrayOf(PropTypes.number),
  maxDistance : PropTypes.number
}),
```

在下面的示例中，我们只允许 Box 在我们下方 1 米的水平面上拖动，并阻止它移动到距我们 5 米以上的地方。

```js
<ViroNode
  position={[0, -1, -1]}
  dragType='FixedToPlane'
  dragPlane={{ planePoint: [0, -1, 0], planeNormal: [0, 1, 0], maxDistance: 5 }}
></ViroNode>
```
