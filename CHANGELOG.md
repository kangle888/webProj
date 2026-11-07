# Changelog

## 2026-11-07（升级至 0.3.0）

### Changed

- **组件库 @reglow/reui 升级至 ^0.6.11**（自 ^0.6.10；`package.json` / `package-lock.json` 同步）：
  - 新增 `Slider` 滑块（单值 / 范围 / 垂直 / 步进 / 反向 / 禁用）、`InputGroup` 输入框组（前后置图标 / 文本 / 按钮，共享边框与聚焦环）、`ScrollArea` 自定义滚动区域（纵向 / 横向与 `type` 显示策略）
  - `Carousel` 切换箭头默认显示并对齐 shadcn-vue 圆形 outline 样式；拖拽增强——惯性强甩切换、非无限循环贴边边界钳制、内部可交互元素不触发拖拽、触屏 `touch-pan-y` 优化
- **README**：当前版本说明同步为 @reglow/reui 0.6.11
- **构建校验**：`npm run build`（nuxt build）通过

## 2026-11-03（升级至 0.2.0）

### Changed

- **组件库 @reglow/reui 升级至 ^0.6.10**（自 ^0.6.8；`package.json` / `package-lock.json` 同步）：
  - 0.6.9：Calendar 日 / 周 / 多日视图统一 CSS grid 列轨道、表头与全天行 sticky 固定，修复滚动条占位导致时间网格竖线与全天分割线错位；GaugeChart / RadarChart 默认色改 `--chart-1`；Checkbox 新增 `color`（自定义强调色）；`--vis-color-main` 统一为 `--chart-1`
  - 0.6.10：PageTable 表头改为「左操作、右筛选」布局——`toolbar` 插槽（操作按钮）移至左侧，`filters` / 搜索框 / 列设置集中在右侧
- **README**：补充当前版本说明（@reglow/reui 0.6.10）
- **构建校验**：`npm run build`（nuxt build）通过
