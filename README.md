# Hide Elements Chrome Extension

## 简介

Hide Elements 是一个简单实用的 Chrome 扩展程序，它允许用户通过 CSS 选择器快速隐藏网页上的元素。这对于以下情况特别有用：

- 隐藏网页上的广告
- 移除干扰阅读的元素
- 简化网页界面
- 临时调整网页布局

## 功能

- 点击扩展图标弹出输入框
- 输入 CSS 选择器（支持多个选择器，以逗号分隔）
- 一键隐藏匹配的元素

## 安装方法

1. 下载或克隆此仓库到本地
2. 打开 Chrome 浏览器，进入 `chrome://extensions/` 页面
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含此扩展程序文件的文件夹

## 使用方法

1. 在需要隐藏元素的网页上，点击 Chrome 工具栏中的 Hide Elements 图标
2. 在弹出的输入框中输入 CSS 选择器，例如：
   - `.ad-banner` - 隐藏所有类名为 "ad-banner" 的元素
   - `#sidebar` - 隐藏 ID 为 "sidebar" 的元素
   - `div.popup` - 隐藏所有类名为 "popup" 的 div 元素
   - `.ad-banner, #sidebar` - 同时隐藏多个不同的元素（以逗号分隔）
3. 点击"Hide Elements"按钮应用更改

示例

```
.navbar,body > div > div > div.col-md-3,body > div > footer
```

## 注意事项

- 隐藏效果仅在当前页面有效，刷新页面后会恢复原状
- 选择器语法遵循标准 CSS 选择器规则
- 如果选择器无效或没有匹配到元素，不会有任何变化

## 技术实现

此扩展使用 Chrome Extension Manifest V3 开发，主要包含以下文件：

- `manifest.json` - 扩展配置文件
- `popup.html` - 用户界面
- `popup.js` - 实现隐藏元素的核心逻辑
