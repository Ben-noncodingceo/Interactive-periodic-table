# 部署说明

本项目支持部署到 GitHub Pages 和 Cloudflare Pages，两个平台都可以通过 GitHub 自动同步部署。

## GitHub Pages 部署

### 方法 1：通过 GitHub 设置（推荐）

1. 访问你的 GitHub 仓库：https://github.com/Ben-noncodingceo/Interactive-periodic-table
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分：
   - 选择 **Deploy from a branch**
   - Branch 选择 **main**
   - Folder 选择 **/ (root)**
5. 点击 **Save**
6. 等待几分钟，GitHub 会自动构建并部署
7. 访问你的网站：`https://Ben-noncodingceo.github.io/Interactive-periodic-table`

### 方法 2：使用 GitHub Actions（可选）

如果需要自定义构建流程，可以创建 `.github/workflows/deploy.yml` 文件。

## Cloudflare Pages 部署

### 步骤 1：连接 GitHub 仓库

1. 登录 Cloudflare Dashboard：https://dash.cloudflare.com/
2. 在左侧菜单选择 **Pages**
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问你的 GitHub 账户
6. 选择仓库：`Ben-noncodingceo/Interactive-periodic-table`

### 步骤 2：配置构建设置

在配置页面填写：

- **Project name**: `interactive-periodic-table`（或你喜欢的名称）
- **Production branch**: `main`
- **Build command**: （留空，因为是纯静态文件）
- **Build output directory**: `/`（根目录）

### 步骤 3：环境变量（可选）

通常不需要环境变量，因为这是纯前端项目。

### 步骤 4：部署

1. 点击 **Save and Deploy**
2. Cloudflare 会自动开始首次部署
3. 部署完成后，你会获得一个 Cloudflare Pages 的 URL
4. 可以自定义域名（在项目设置中）

### 自动部署

配置完成后，每次你向 GitHub 仓库推送代码时：
- **GitHub Pages** 会自动重新部署（通常需要几分钟）
- **Cloudflare Pages** 会自动触发构建和部署（通常更快，几秒钟）

## 项目配置文件说明

- **`.nojekyll`**: 告诉 GitHub Pages 不要使用 Jekyll 处理（因为这是纯静态 HTML）
- **`_config.yml`**: Jekyll 配置文件（如果使用 Jekyll）
- **`404.html`**: 404 错误页面（GitHub Pages 会自动使用）
- **`cloudflare-pages.json`**: Cloudflare Pages 的配置文件（路由和头部设置）

## 验证部署

部署成功后，访问你的网站并检查：
- ✅ 页面正常加载
- ✅ 所有元素数据正常显示
- ✅ 点击元素可以查看详情
- ✅ 性质切换功能正常
- ✅ 镧系/锕系元素切换正常

## 故障排除

### GitHub Pages 问题

- 如果页面显示 404，检查仓库设置中的 Pages 配置
- 确保 `.nojekyll` 文件存在
- 检查文件路径是否正确（使用相对路径）

### Cloudflare Pages 问题

- 检查构建日志中的错误信息
- 确保 `cloudflare-pages.json` 配置正确
- 如果路由有问题，检查 SPA 路由配置

## 更新网站

只需向 GitHub 推送代码即可：

```bash
git add .
git commit -m "更新内容"
git push
```

两个平台都会自动检测更改并重新部署。

