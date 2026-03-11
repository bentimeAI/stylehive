# Vercel部署完整教程

## 📋 目录
1. [创建GitHub账号](#1-创建github账号)
2. [创建GitHub仓库](#2-创建github仓库)
3. [初始化Git并上传代码](#3-初始化git并上传代码)
4. [连接Vercel](#4-连接vercel)
5. [部署项目](#5-部署项目)
6. [自定义域名（可选）](#6-自定义域名可选)

---

## 1️⃣ 创建GitHub账号

### 步骤：
1. 访问 https://github.com
2. 点击右上角 "Sign up"
3. 填写邮箱、用户名、密码
4. 验证邮箱
5. 完成注册！

---

## 2️⃣ 创建GitHub仓库

### 步骤：
1. 登录GitHub后，点击右上角的 "+" 号
2. 选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `stylehive`（或你喜欢的名字）
   - **Description**: `智能衣橱时尚社交平台`
   - **Public/Private**: 选择 Public（推荐，免费）或 Private
   - **不要**勾选 "Initialize this repository with a README"
   - **不要**勾选 "Add .gitignore"
   - **不要**勾选 "Choose a license"
4. 点击 "Create repository"

---

## 3️⃣ 初始化Git并上传代码

### 在终端中执行以下命令：

```bash
# 进入项目目录
cd /Users/bentime/Documents/trae_projects/dress

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "Initial commit: STYLEHIVE智能衣橱应用"

# 关联GitHub仓库（把下面的YOUR_USERNAME换成你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/stylehive.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### ⚠️ 注意：
- 把 `YOUR_USERNAME` 替换成你实际的GitHub用户名
- 如果提示输入用户名密码，使用GitHub账号登录
- 如果开启了2FA，需要使用Personal Access Token

---

## 4️⃣ 连接Vercel

### 步骤：
1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub"
4. 授权Vercel访问你的GitHub账号
5. 完成登录！

---

## 5️⃣ 部署项目

### 步骤：
1. 登录Vercel后，点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 中找到你的 `stylehive` 仓库
3. 点击 "Import"
4. 配置项目（通常保持默认即可）：
   - **Project Name**: `stylehive`（可以自定义）
   - **Framework Preset**: 会自动检测为 "Other"
   - **Root Directory**: 保持为空或 `./`
   - **Build Command**: 留空
   - **Output Directory**: 留空
5. 点击 "Deploy"
6. 等待1-2分钟，部署完成！

### 🎉 部署成功后：
- 你会获得一个类似 `https://stylehive-abc123.vercel.app` 的域名
- 可以直接在浏览器中打开访问
- 可以分享给朋友使用

---

## 6️⃣ 自定义域名（可选）

### 如果你有自己的域名：
1. 在Vercel项目页面，点击 "Settings" → "Domains"
2. 输入你的域名，如 `stylehive.com`
3. 按照提示配置DNS解析
4. 等待生效（通常几分钟到几小时）

---

## 🔄 后续更新代码

### 修改代码后，只需要：

```bash
# 进入项目目录
cd /Users/bentime/Documents/trae_projects/dress

# 添加修改的文件
git add .

# 提交修改
git commit -m "更新描述"

# 推送到GitHub
git push
```

Vercel会**自动检测到更新并重新部署**！

---

## 💡 常见问题

### Q: 推送时提示权限错误？
A: 检查GitHub仓库地址是否正确，确保你有写入权限。

### Q: Vercel部署失败？
A: 检查项目根目录是否有 `index.html` 文件，确保文件结构正确。

### Q: 如何查看部署日志？
A: 在Vercel项目页面，点击 "Deployments" 可以查看每次部署的详情和日志。

### Q: 可以回滚到之前的版本吗？
A: 可以！在Vercel的Deployments页面，点击任意历史版本的 "..." → "Promote to Production"

---

## 📚 更多资源

- **Vercel文档**: https://vercel.com/docs
- **GitHub文档**: https://docs.github.com
- **Git教程**: https://git-scm.com/doc

---

## ✅ 检查清单

- [ ] 创建GitHub账号
- [ ] 创建GitHub仓库
- [ ] 初始化Git并上传代码
- [ ] 注册Vercel账号
- [ ] 导入并部署项目
- [ ] 测试访问部署的网站
- [ ] 分享给朋友！

祝你部署顺利！🎉
