---
sidebarDepth: 4
---

# 概述

> **AR 功能仅可用于支持 ARKit 和 ARCore 的手机设备** > [ARKit 支持的设备](https://developer.apple.com/library/content/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html) > [ARCore 支持的设备](https://developers.google.com/ar/discover/supported-devices)

Viro 通过各种 AR 特定组件和功能支持增强现实 (AR) 开发。本指南将首先概述 AR，并提供使开发人员能够构建 AR 体验的组件和功能的进阶概述。

## Developing for AR

> viro 文档暂无内容

## 构建 AR 体验

Viro 平台提供了大量组件，开发人员可以利用这些组件来构建 AR 体验。然而，与传统的 3D 渲染和 VR 不同，AR 体验旨在响应用户的真实世界。为了实现这一点，Viro 平台提供了一些特定于 AR 的组件和功能，详情如下：

### AR 组件

这些是 Viro 的 特意为 AR 构建，并仅用于 AR 的组件。

| 组件                                                                             | 描述                                                                                                                                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`ViroARSceneNavifator`](https://docs.viromedia.com/docs/viroarscenenavigator)   | top 级 RN 组件，呈现 ViroARScenes 视图                                                                                                                             |
| [`ViroARScene`](https://docs.viromedia.com/docs/viroarscenenavigator)            | 呈现一段 AR 体验必要的 AR 组件的逻辑容器，维护在现实世界中以 AR 渲染的场景图。若需要多种 AR 体验，可使用多个 `ViroARScene`                                         |
| [`ViroARPlane`](https://docs.viromedia.com/docs/viroarplane)                     | 一个组件，可以允许并自动管理 ViroReact 组件（ 有关于 AR 系统发现的平面）的定位。 可以是桌面游戏的表面，也可以是安装虚拟图片的墙壁。                                |
| [`ViroARPlaneSelector`](https://docs.viromedia.com/docs/viroarplaneselector)     | 包含 `ViroARPlane` 的一个便利组件，允许最终用户选择希望开发人员用来显示内容的平面。                                                                                |
| [`ViroARImageMarker`](https://docs.viromedia.com/docs/viroarplaneselector)       | 一个 AR 系统检测到给定图像，开发人员能够相对于其放置对象的组件。可以创建出现在真实世界图像上的整个虚拟用户界面。或者让电影海报之类的物体在被检测到时变得生动起来。 |
| [`ViroARTrackingTargets`](https://docs.viromedia.com/docs/viroartrackingtargets) | 允许用户创建与 `ViroARImageMarker` 一起使用的目标组件。 API 类似于材料。                                                                                           |

如你所见，`ViroARSceneNavigator` 和 `ViroARScene` 替换了 VR 的 `ViroSceneNavigator` 和 `ViroScene`，并添加了更多特定于 AR 的方法和属性。

`ViroARPlane` 和 `ViroARPlaneSelector` 是另外两个仅用于 AR 的组件，它们允许开发人员相对于现实世界中的平面放置内容。

### AR 特性

AR 系统还提供一些其它信息，通过现有 AR 组件的以下功能提供：

| 特性                                  | API 位置                                                                                                                                | 描述                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 6 度相机移动                          | 可以通过 `ViroARScene` 中的 `getCameraOrientationAsync()` 访问相机方向。                                                                | (虚拟)相机会随着用户在现实世界中的移动而自动移动。这导致虚拟对象看起来停留在它们的位置。                 |
| 摄像直通（呈现为背景）                | 自动加载                                                                                                                                | 在 AR 中，后置摄像头被启用并用作渲染虚拟对象的视图的“背景”。                                             |
| 环境光估计                            | `ViroARScene` 中的 `onAmbientLightUpdate`                                                                                               | 提供相机检测到的光强度和色温的估计值。                                                                   |
| `FixedToWorld` 和 `FixedToPlane` 拖动 | 所有“可拖动”组件都通过 dragType 属性支持。                                                                                              | 允许用户拖动对象，使它们看起来固定在现实世界中的点上。                                                   |
| AR-based Hit Tests                    | [`ViroARScene`](https://docs.viromedia.com/docs/viroarscene) 中的方法                                                                   | 允许用户从 AR 系统中获取现实世界中的位置。例如，如果用户触摸屏幕，她触摸了哪个现实世界的对象（如果有）？ |
| 传送门                                | [`ViroPortalScene`](https://docs.viromedia.com/docs/viroportalscene) 和 [`ViroPortal`](https://docs.viromedia.com/docs/viroportal) 组件 | 允许开发人员将虚拟“门户”从现实世界添加到虚拟世界，然后再返回。                                           |
| 后期处理效果                          | `ViroARScene` 中的 `postProcessEffects` 属性                                                                                            | 允许开发人员给场景应用预先构建的后期处理效果。                                                           |
| 视频和静态捕获                        | ViroARSceneNavigator 中的 Recording API                                                                                                 | 允许开发人员在记录的摄像机视图之上轻松记录虚拟对象。                                                     |

借助上述功能，开发人员可以使用更逼真的照明来照亮其 AR 体验，使虚拟对象与环境进行逼真的交互，添加异界门等等。
