# Flutter 是 Google 用以帮助开发者在 iOS 和 Android 两个平台开发高质量原生 UI 的移动 SDK。

Flutter 兼容现有的代码，免费且开源，在全球开发者中广泛被使用。

- https://flutter-io.cn/#section-codelabs
- github: https://github.com/flutter/flutter
- doc: https://flutter.io/docs/
- https://github.com/flutter

## 架构主要分成三层:Framework，Engine和Embedder
- Framework使用dart实现
  包括Material Design风格的Widget,Cupertino(针对iOS)风格的Widgets，文本/图片/按钮等基础Widgets，渲染，动画，手势等。
  此部分的核心代码是:flutter仓库下的flutter package，以及sky_engine仓库下的io,async,ui(dart:ui库提供了Flutter框架和引擎之间的接口)等package。
- Engine使用C++实现，主要包括:Skia,Dart和Text。Skia是开源的二维图形库，提供了适用于多种软硬件平台的通用API。
- Embedder是一个嵌入层，即把Flutter嵌入到各个平台上去

## install Windows
- https://flutter.io/setup-windows/



## 参考资料
- 深入理解flutter的编译原理与优化： https://www.yuque.com/xytech/flutter/sh4fbm
