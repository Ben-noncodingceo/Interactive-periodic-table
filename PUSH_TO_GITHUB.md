# 推送到 GitHub 的步骤

## 1. 在 GitHub 上创建新仓库
访问 https://github.com/new 创建新仓库

## 2. 连接并推送代码

将下面的命令中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/CHEM-Periodic-table.git

# 或者使用 SSH（如果你配置了 SSH key）
# git remote add origin git@github.com:YOUR_USERNAME/CHEM-Periodic-table.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## 3. 验证

推送成功后，访问你的 GitHub 仓库页面，应该能看到所有文件。

## 后续更新

以后如果有代码修改，使用以下命令：

```bash
git add .
git commit -m "描述你的修改"
git push
```

