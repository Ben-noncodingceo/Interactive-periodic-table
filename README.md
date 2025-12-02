# 互动化学元素周期表

一款纯前端网页版互动化学元素周期表，支持可视化查询和探索化学元素信息。

## 功能特性

### 核心功能
- **元素详情查看**：点击任意元素单元格，查看该元素的详细信息
- **电子排布可视化**：展示最大丰度同位素的完整电子排布，包括电子层、亚层和电子数分布
- **元素性质颜色编码**：通过颜色梯度直观展示元素性质
  - 电负性
  - 稳定性
  - 放射性（特殊警示色 + 图标）
  - 电离能
  - 原子半径
  - 电子亲和能
  - 熔点

### 附加功能
- **镧系/锕系元素显示控制**：可切换显示或隐藏镧系和锕系元素
- **图例说明**：页面底部提供完整的图例说明，标注各颜色对应的性质含义

## 技术架构

- **纯前端实现**：仅使用 HTML/CSS/JavaScript，无后端依赖
- **静态部署**：可直接部署到 Cloudflare Pages 等静态托管平台
- **现代浏览器支持**：支持 Chrome、Firefox、Edge 等主流现代浏览器

## 文件结构

```
CHEM-Periodic-table/
├── index.html              # 主HTML文件
├── styles.css              # 样式文件
├── app.js                  # 主应用逻辑
├── elements-data-part1.js  # 元素数据（1-24号元素）
├── elements-data-part2.js  # 元素数据（25-48号元素）
├── elements-data-part3.js  # 元素数据（49-72号元素，含镧系）
├── elements-data-part4.js  # 元素数据（73-96号元素，含锕系）
├── elements-data-part5.js  # 元素数据（97-118号元素）
├── elements-data.js        # 合并后的元素数据
├── 404.html                # 404错误页面（GitHub Pages）
├── .nojekyll               # 禁用Jekyll（GitHub Pages）
├── _config.yml             # Jekyll配置（可选）
├── _redirects              # Cloudflare Pages路由配置
├── cloudflare-pages.json    # Cloudflare Pages配置
└── DEPLOYMENT.md            # 详细部署说明
```

## 使用方法

1. **本地运行**：
   - 直接在浏览器中打开 `index.html` 文件
   - 或使用本地服务器（如 `python -m http.server`）

2. **部署到 GitHub Pages**：
   - 在仓库 Settings → Pages 中启用
   - 选择 main 分支和 / (root) 目录
   - 访问：`https://Ben-noncodingceo.github.io/Interactive-periodic-table`

3. **部署到 Cloudflare Pages**：
   - 连接 GitHub 仓库到 Cloudflare Pages
   - 构建命令留空，输出目录设为 `/`
   - 详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

**注意**：项目已配置为同时支持两个平台，推送代码到 GitHub 后会自动部署。

## 交互说明

1. **查看元素详情**：点击周期表中的任意元素单元格
2. **切换镧系元素**：点击"显示/隐藏镧系元素"按钮
3. **切换锕系元素**：点击"显示/隐藏锕系元素"按钮
4. **关闭详情面板**：点击详情面板右上角的关闭按钮

## 数据说明

每个元素包含以下信息：
- 原子序数、符号、名称
- 周期和族的位置
- 完整电子排布（最大丰度同位素）
- 电负性、稳定性、放射性
- 电离能、原子半径、电子亲和能、熔点

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Edge (最新版)
- Safari (最新版)

## 许可证

本项目为教育用途，数据来源于公开的化学元素数据库。

