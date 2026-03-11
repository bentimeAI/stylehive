# Netlify部署超简单教程

## 🚀 3步完成部署（5分钟搞定！）

---

## 第一步：登录Netlify

1. 访问 https://netlify.com
2. 点击右上角的 "Sign up" 或 "Log in"
3. 选择登录方式：
   - **推荐**：用 GitHub 账号登录（你已经有GitHub账号了）
   - 或者用 Email、Google、GitLab 等登录

---

## 第二步：拖拽部署（超简单！）

登录成功后：

### 方法A：直接拖拽（推荐）

1. 你会看到一个页面，中间有个大大的区域写着：
   > **Drag and drop your site output folder here**
   > （把你的网站文件夹拖到这里）

2. 打开 **Finder**（Mac的文件管理器）
3. 找到文件夹：`/Users/bentime/Documents/trae_projects/dress`
4. **直接把整个 `dress` 文件夹拖到Netlify网页上**
5. 等待几秒钟...

### 方法B：手动上传

如果拖拽不工作：
1. 点击 "Browse files" 按钮
2. 选择 `dress` 文件夹
3. 点击上传

---

## 第三步：完成！🎉

部署成功后：
- 你会看到一个随机生成的网址，比如：
  > `https://amazing-stylehive-12345.netlify.app`
- 点击这个网址就能访问你的网站了！
- 可以把这个链接分享给朋友！

---

## ✨ 进阶设置

### 修改网站名称（自定义域名）

1. 在Netlify控制台，点击你的网站
2. 点击 "Site settings"（网站设置）
3. 点击 "Change site name"（修改网站名称）
4. 输入你想要的名字，比如：`stylehive`
5. 点击 "Save"
6. 现在你的网址变成了：`https://stylehive.netlify.app`

### 绑定自己的域名（可选）

如果你有自己的域名（比如 stylehive.com）：
1. 在Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示配置DNS解析

---

## 🔄 更新网站

修改代码后，重新部署：

### 方法A：再次拖拽（最简单）
1. 修改你的代码
2. 回到Netlify控制台
3. 点击 "Site overview"
4. 找到 "Deploy manually" 区域
5. 再次拖拽 `dress` 文件夹

### 方法B：连接GitHub自动部署（推荐）
1. 在Netlify控制台，点击 "Site settings" → "Build & deploy"
2. 点击 "Link repository"
3. 选择你的GitHub仓库
4. 以后每次 push 到GitHub，Netlify会自动部署！

---

## 💡 常见问题

### Q: 部署后网站打不开？
A: 确保你的文件夹里有 `index.html` 文件，并且在根目录。

### Q: 如何查看部署日志？
A: 在Netlify控制台，点击 "Deploys" 标签，可以看到每次部署的详情。

### Q: 可以回滚到之前的版本吗？
A: 可以！在Deploys页面，点击任意历史版本的 "..." → "Publish deploy"

### Q: Netlify免费吗？
A: 是的！个人使用完全免费，足够支持你的项目。

---

## 📚 更多资源

- **Netlify文档**: https://docs.netlify.com
- **Netlify入门指南**: https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/

---

## ✅ 检查清单

- [ ] 登录Netlify
- [ ] 拖拽dress文件夹到Netlify
- [ ] 访问部署好的网站
- [ ] （可选）修改网站名称
- [ ] 分享给朋友！

祝你部署顺利！🎉
