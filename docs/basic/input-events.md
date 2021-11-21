---
sidebarDepth: 4
---

# 输入事件

输入事件就是控制器的触发事件。Viro UI 控件通过事件处理程序以冒泡的方式响应输入事件：事件在组件层中向上传递，直到遇到可以处理事件的组件。

> 控制器类似 Daydream Controller 和 Oculus Gear Touchpad

有很多类型的事件：`onHover`、`onClick`、 `onClickState`、 `onDrag`、 `onScroll`、 `onSwipe`、 `onFuse`， 和 `onTouch`。不是所有组件都能响应所有类型的事件，具体请在 API 文档里查阅各组件的属性。下文也介绍了每个类别的事件，并给出了样例代码。

所有触发事件都源自给定的控制器输入源。这使开发人员可以轻松识别正在按下哪个输入按钮，以及来自哪个手持控制器。每个 Viro 事件处理程序回调都提供一个唯一的数字源标识符，该标识符对应于物理控制器上的输入源。你可以在下方查看输入源 ID 到 Gear、Cardboard 和 Daydream 的映射。

> 此章节跟具体控制器有关，暂且不翻译
