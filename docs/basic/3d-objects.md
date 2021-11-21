---
sidebarDepth: 4
---

# 3D 对象

`<Viro3DObject>` 组件可以将 3D 对象（也称为模型或网格）加载到场景中。

`<Viro3DObject>` 定义了 3D 对象的结构：它的顶点、面和纹理（texture）坐标。场景图或 `<ViroNode>` 节点层次结构确定对象的方向和位置。最后，对象的外观由其材质（materials）定义。

## 加载 3d 对象

Viro 支持加载 `FBX`、`GLTF` 和 `OBJ` 格式的 3D 模型。Viro 将加载文件中的几何体、纹理和光照参数。对于 FBX Viro 将额外加载所有已安装的骨骼动画。OBJ 文件通过设置 `<Viro3DObject>` 的 `source` 属性直接加载，而 FBX 文件需要转换成 Viro 自己的 VRX 格式。

例如，以下片段显示了如何加载人类心脏模型。`position` 属性相对于其上层 `<ViroNode>` 的坐标系定位对象，而 `materials` 属性设置应该使用的材质。

```js
<Viro3DObject
  source={require('./res/heart.obj')}
  position={[-0.0, -5.5, -1.15]}
  materials={['heart']}
  type='OBJ'
/>
```

下面的代码片段显示了如何从 Web (URI) 加载模型。

```js
<Viro3DObject
  source={{ uri: 'http://example.org/myobject.obj' }}
  position={[-0.0, -5.5, -1.15]}
  materials={['heart']}
  type='OBJ'
/>
```

> 模型未出现？
>
> 1. 尝试增加光源：
>    `<ViroAmbientLight color="#FFFFFF" />`
> 2. 材料/纹理在正确的存放位置吗？大多数 OBJ/FBX 模型都默认材料/纹理在同一目录中。
> 3. 模型是否正确缩放/定位？ Viro 以顶点坐标到世界空间的 1 对 1 映射显示对象，因此如果对象坐标指定 100x100x100 模型，那么它在 Viro 中将显示为 100x100x100。
> 4. 如果你遇到文件路径问题，请确保你的 rn-cli.config 文件已更新为正确的扩展名 -> [添加资产类型](https://docs.viromedia.com/docs/importing-assets#adding-asset-types)

## 方向和位置

节点层次结构及其变换决定了 3D 对象在场景中的定位方式。有关更多信息，请参阅[场景图指南](https://docs.viromedia.com/docs/scenes#scene-graph)。

## 材质

材料定义了 3D 对象的外观。材质控制对象如何响应光。有关详细信息，请参阅照明和材料指南。
对于 OBJ 模型，可以显式设置材质（如上例所示），也可以通过 MTL 文件加载它们。 MTL 是 OBJ 文件格式的扩展，它允许为模型的每个表面设置材料属性。要加载具有关联 MTL 文件的 OBJ，必须指定 MTL 文件及其所有关联纹理，如下例所示：

```js
<Viro3DObject
  source={require('./res/model.obj')}
  resources={[
    require('./res/model.mtl'),
    require('./res/texture1.jpg'),
    require('./res/texture2.jpg'),
    require('./res/texture3.jpg'),
  ]}
  position={[0.0, 0.0, -10]}
  scale={[0.1, 0.1, 0.1]}
  type='OBJ'
/>
```

请注意，OBJ 文件本身已经引用了指定的 MTL 文件和纹理，但我们必须将它们包含在 `<Viro3DObject>` 的资源数组中，以便 Viro 知道将这些资源与应用程序一起打包。

## 回调

OBJ 加载是异步执行的，以免在你的应用程序中引入延迟。 Viro 提供回调来响应 OBJ 加载过程的每一步。你可以注册函数来侦听加载开始、加载结束和加载错误。以下示例说明了所有三个回调，在收到每个事件时向控制台打印一条消息。

```js
var OBJTest = React.createClass({
  render: function() {
    <ViroScene>
        <Viro3DObject source={require('./res/model.obj')}
           resources={[require('./res/model.mtl'),
                       require('./res/texture1.jpg'),
                       require('./res/texture2.jpg'),
                       require('./res/texture3.jpg')]}
           type="OBJ"
           position={[0.0, 0.0, -10]}
           scale={[0.1, 0.1, 0.1]}
           onLoadStart={this._onLoadStart}
           onLoadEnd={this._onLoadEnd}
           onError={this._onError}
      />
    </ViroScene>
  }

  _onLoadStart() {
     console.log("OBJ loading has started");
  }
  _onLoadEnd() {
     console.log("OBJ loading has finished");
  }
  _onError(event) {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  },
});
```

## FBX

FBX 是一种广泛而灵活的 3D 模型格式，大多数 3D 创作软件都支持。要加载 FBX 文件，请使用 ViroFBX 脚本将 FBX 文件转换为 VRX 文件。然后可以使用 `<Viro3DObject>` 加载 VRX 文件。 ViroFBX 脚本可以在你项目的 node_modules/react-viro/bin 目录中找到。

ViroFBX 脚本可以在[这里](https://s3-us-west-2.amazonaws.com/virocore/1_5_0/ViroFBX.zip)找到。

> 目前 ViroFBX 工具仅在 Mac OS X 上运行。对其它平台的支持正在准备中。

以下示例显示了如何将模型转换为 VRX 格式：

```bash
./ViroFBX path/to/model.fbx path/to/model.vrx
```

在上面的示例中，path/to/model.fbx 是要转换的 FBX 文件的路径，path/to/model.vrx 是要创建的 VRX 文件的路径。创建 VRX 文件后，即可将其加载到带有 `<Viro3DObject>` 的应用程序中。同样，请记住将模型的关联纹理与 VRX 文件放在同一目录中。下面是加载 VRX 文件的简单示例。此处通知类型设置为 VRX：

```js
<Viro3DObject
  source={require('./res/model.vrx')}
  resources={[
    require('./res/texture1.jpg'),
    require('./res/texture2.jpg'),
    require('./res/texture3.jpg'),
  ]}
  position={[0.0, 0.0, -10]}
  scale={[0.1, 0.1, 0.1]}
  type='VRX'
/>
```

## 骨骼动画

FBX 模型支持骨骼动画。骨骼动画是一种分层技术，用于为类人机器人等复杂的几何图形设置动画。 Viro 通过其标准动画系统支持这些动画。要运行骨架动画，只需将动画的名称设置为 FBX 文件中为动画指定的名称。例如，如果 FBX 文件有一个名为“Take 001”的动画，你可以像这样运行动画：

```js
<Viro3DObject
  source={require('./res/model.vrx')}
  resources={[
    require('./res/texture1.jpg'),
    require('./res/texture2.jpg'),
    require('./res/texture3.jpg'),
  ]}
  position={[0.0, 0.0, -10]}
  scale={[0.1, 0.1, 0.1]}
  type='VRX'
  animation={{ name: 'Take 001', run: true, loop: true, delay: 1000 }}
/>
```

有关动画的更多信息，请参阅[动画](https://docs.viromedia.com/docs/animation)指南。

## GLTF

GL 传输格式 (glTF) 是一种 API 中立的运行时资产交付格式。 glTF 通过为 3D 内容的传输和加载提供高效、可扩展和可互操作的格式，弥合了 3D 内容创建工具和现代 3D 应用程序之间的差距。 Viro 目前支持 gLTF 2.0。

### glTF 模型格式

glTF assets 由以下 3 个子组件表示：
![gltf assets](https://files.readme.io/517c2d6-files.png)

1. 包含完整场景描述的 JSON 格式文件 (.gltf)：节点层次结构、材质、相机以及网格、动画和其它构造的描述符信息
2. 包含几何和动画数据以及其它基于缓冲区的数据的二进制文件 (.bin)
3. 纹理的图像文件（.jpg、.png）

### 加载 glTF 模型

可以通过 3 种方式将 glTF 数据提供给 Viro 进行渲染：

1. 分别导入基本的 3 个组件：.gltf、其对应的二进制文件及其图像文件。
2. 导入单个 .gltf 文件，其中二进制和图像数据都作为 Base64 编码数据嵌入到 .gltf 文件中。
3. 导入以原始二进制格式表示所有必需 glTF 组件的单个 .glb 文件。

与 FBX 一样，你可以使用 `<Viro3DObject>` 组件将 glTF 模型加载到你的场景中。加载 glTF 文件时，将类型属性设置为“GLTF”（对于上述选项 1 和 2）或“GLB”（对于选项 3：原始 glTF 二进制文件）。

同样重要的是要注意任何相关的 glTF assets（如二进制数据或图像文件）总是由 glTF 文件中指定的 URI 引用，相对路径与 glTF 文件的位置有关。

> 传入的 GLTF 功能和限制
> 目前，Viro 支持渲染静态 2.0 glTF 模型。我们目前也在实现对全套 gLTF 功能的全面支持，敬请期待！ :)
> 传入的功能包括：
>
> - 支持其它 gLTF 扩展。
> - 自发光贴图
> - 稀疏存取器数据格式
> - 非索引网格渲染（drawArray 渲染）
> - 其它原始模式（Line_Loop 和 Triangle_Fan）
> - 材质 Alpha 蒙版模式
> - 额外的 Min / Mag 过滤器模式
> - 双面渲染
> - 在 gLTF 相机中烘焙
> - 变形目标
