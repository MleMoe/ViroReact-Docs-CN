---
sidebarDepth: 4
---

# Scenes

在 ViroReact 中，应用程序由一个个场景组成，场景由组件 `ViroScene` 或 `ViroARScene` 表示。在大多数 2D 应用程序框架中，**场景**的概念等同于 3D 视图。场景包含 ViroReact 在 AR/VR 中呈现的所有内容：UI 控件、3D 对象、灯光等等。

一个 使用 ViroReact 的应用程序，通常包含一个或多个场景组件（放置在 `ViroSceneNavigator` 或 `ViroARSceneNavigator` 中）。

## 基础场景

下面提供了一个简单的 `<ViroScene>` 示例。这个场景内有一个 `<ViroText>` 对象，显示文本为 "Hello World"。

```js
<ViroScene>
  <ViroText text='Hello World' position={[0, -0.1, -1]} />
</ViroScene>
```

## 在场景中放置对象

Viro 使用的坐标系统为右手坐标系，其观察方向沿负 z 轴（如下图）。可以通过修改[相机](https://docs.viromedia.com/docs/camera)参数来修改观察方向和起点。相机默认设置为放置在 `[0, 0, 0]` 点 ，沿 `[0, 0, -1]` 方向观察。

在仅支持 3DOF（3 自由度）的框架（如 mobile VR）中，相机始终保持在 [0,0,0] 点，除非被开发者改动，用户只能控制相机的旋转。

支持 6DOF 的框架（如 AR ），允许用户在其真实世界中移动，相应的，Viro 场景会移动相机坐标以作为响应。

<div style="text-align: center;">
  <img src="https://files.readme.io/54ce6ff-viro_camera_diagram.png" height=300 />
</div>

场景中的对象通过属性 `position` 来定位在这个 3D 坐标系中。随着场景越来越复杂，在放置对象时最好使用 Viro 的底层[场景图](#场景图)。

## 场景背景

场景的背景是远处渲染的内容，位于所有对象的后面。背景可以是一个 360 degree image（全景图片） 或者 skybox（天空盒）。

将 360 degree image 渲染为背景，需要把 `<Viro360Image>` 组件添加到场景中，如下所示：

```js
<ViroScene style={styles.container}>
  <Viro360Image source={require('./res/360_diving.jpg')} />
</ViroScene>
```

要渲染天空盒，需要使用 `<ViroSkybox>` 组件。天空盒是一个包围着用户的有 6 个面的立方体。可以设置天空盒的`color`属性为六个面指定颜色，或者通过设置`origin`属性为每个面指定一个纹理。在下面的示例中，天空盒的每一面都分配了相同的图像。

```js
<ViroScene style={styles.container}>
  <ViroSkybox
    source={{
      nx: require('./res/grid_bg.jpg'),
      px: require('./res/grid_bg.jpg'),
      ny: require('./res/grid_bg.jpg'),
      py: require('./res/grid_bg.jpg'),
      nz: require('./res/grid_bg.jpg'),
      pz: require('./res/grid_bg.jpg'),
    }}
  />
</ViroScene>
```

`source` 中的参数 nx、px、ny、py、nz 和 pz 指定每个面的纹理（其中 nx 是负 x 方向的面，px 是正 x 方向的面， 其余类似）。

## 场景 Graph

`<ViroScene>` 的底层是一个全特性支持的 3D 场景图引擎。场景图是节点的分层树结构，允许开发者直观地构建 3D 环境。其根节点就是 `<ViroScene>` 本身，子节点由 `<ViroNode>` 对象表示。每个 `<ViroNode>` 代表 3D 空间中的一个位置和变换，你可以将 3D 对象、灯光或其它内容与该位置绑定。

`<ViroNode>` 并没有实质的渲染可见内容，它只代表一个坐标，即相对于其 parent `<ViroNode>` 节点的坐标空间变换（位置、旋转和缩放）。你可以使用多层次的 `<ViroNode>` 来构建你的空间场景。

例如，在下面的场景中，Text A 的最终 position 是 `[0, 0.9, -2]`，而 Text B 的最终 position 是 `[1, 1, -1]`。类似地，Text A 的最终 scale 值为 `[2, 2, 2]`，而 Text B 的最终 scale 为 [4, 4, 4]，因为它们从其 parent 节点获取 scale 值。

```js
<ViroScene>
  <ViroNode position={[0, 1, -1]} scale={[2, 2, 2]}>
    <ViroText text='Text A' position={[0, -0.1, -1]} />

    <ViroNode position={[1, 0, 0]} scale={[4, 4, 4]}>
      <ViroText text='Text B' />
    </ViroNode>
  </ViroNode>
</ViroScene>
```

举一个更具体的例子，假设你的 APP 需要展示一个太阳系的动画视图。你可以构建一个 `<ViroNode>` 层次结构，来模拟天体之间的位置变动。每个物体都是一个 `<ViroNode>`，它在其轨道上的位置由其在 parent 坐标系中的坐标来定义。

太阳有自己的空间坐标系，地球将自己定位在该坐标系中。与此同时，地球也有自己的坐标系，月球将在其中定位自己。下面的片段展示了一个简单的太阳系：

```js
<ViroNode position={[0, 0, -3]} /**sun-earth system**/>
  <ViroSphere materials={['sunClipart']} />
  <ViroNode position={[0, 0, -5]} /**moon-earth system**/>
    <ViroSphere position={[0, 0, 0]} materials={['earth']} />
    <ViroSphere
      position={[0, 1, -2]}
      scale={[0.2, 0.2, 0.2]}
      materials={['moon']}
    />
  </ViroNode>
</ViroNode>
```

这种场景层次结构使天体动画变得很直观：月球绕地球公转和地球绕太阳公转相结合，使得月球跟随行星绕太阳公转。
