# Veilux Website - Vercel 部署指南

## 🚀 快速部署

### 方法一：通过 Vercel Dashboard（推荐）

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 Git 仓库
   - 或直接拖拽项目文件夹到 Vercel

3. **配置项目**
   - Project Name: `veilux-website`
   - Framework Preset: `Other`
   - Root Directory: `./` (根目录)
   - Build Command: 留空（静态网站）
   - Output Directory: `./` (根目录)

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常1-2分钟）

### 方法二：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   # 在项目根目录执行
   vercel
   
   # 生产环境部署
   vercel --prod
   ```

## 📁 项目结构

```
veilux-website/
├── index.html              # 首页
├── whitepaper.html         # 白皮书页面
├── apps.html              # 应用页面
├── contact.html           # 联系页面
├── assets/                # 静态资源
│   ├── css/              # 样式文件
│   ├── js/               # JavaScript文件
│   ├── img/              # 图片资源
│   └── fonts/            # 字体文件
├── vercel.json           # Vercel 配置
├── package.json          # 项目配置
├── .vercelignore         # 部署忽略文件
└── DEPLOYMENT.md         # 部署说明
```

## ⚙️ Vercel 配置说明

### vercel.json 配置项

- **路由配置**: 支持干净的URL（无.html后缀）
- **安全头部**: 添加了安全相关的HTTP头部
- **缓存策略**: 静态资源长期缓存
- **重定向**: 友好的URL重定向

### 支持的路由

- `/` → `index.html`
- `/whitepaper` → `whitepaper.html`
- `/apps` → `apps.html`
- `/applications` → `apps.html`
- `/contact` → `contact.html`

## 🔧 自定义域名

1. **在 Vercel Dashboard 中**
   - 进入项目设置
   - 点击 "Domains" 标签
   - 添加你的自定义域名

2. **DNS 配置**
   ```
   # CNAME 记录
   www.yourdomain.com → cname.vercel-dns.com
   
   # A 记录
   yourdomain.com → 76.76.19.61
   ```

## 📊 性能优化

### 已配置的优化项

- ✅ 静态资源缓存（1年）
- ✅ 安全HTTP头部
- ✅ 干净的URL结构
- ✅ 压缩传输
- ✅ CDN 分发

### 建议的进一步优化

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 添加 lazy loading

2. **CSS/JS 优化**
   - 压缩 CSS 和 JS 文件
   - 移除未使用的代码
   - 使用 CDN 加载第三方库

## 🌐 环境变量（如需要）

在 Vercel Dashboard 的 Settings > Environment Variables 中添加：

```
NODE_ENV=production
SITE_URL=https://yourdomain.com
```

## 📈 监控和分析

### Vercel Analytics
- 在项目设置中启用 Analytics
- 查看访问量、性能指标等

### 自定义分析工具
- Google Analytics
- Plausible Analytics
- Umami Analytics

## 🔄 自动部署

### Git 集成
- 推送到 `main` 分支自动部署生产环境
- 推送到其他分支创建预览部署
- Pull Request 自动创建预览链接

### 部署钩子
```bash
# 手动触发部署
curl -X POST https://api.vercel.com/v1/integrations/deploy/[DEPLOY_HOOK_URL]
```

## 🐛 故障排除

### 常见问题

1. **404 错误**
   - 检查 `vercel.json` 中的路由配置
   - 确认文件路径正确

2. **CSS/JS 不加载**
   - 检查资源路径是否正确
   - 确认文件存在于 `assets` 目录

3. **部署失败**
   - 检查 `.vercelignore` 文件
   - 查看部署日志

### 调试命令

```bash
# 查看部署日志
vercel logs

# 本地预览
vercel dev

# 检查配置
vercel inspect
```

## 📞 支持

- [Vercel 文档](https://vercel.com/docs)
- [Vercel 社区](https://github.com/vercel/vercel/discussions)
- [Veilux 技术支持](mailto:support@veilux.network)

---

**最后更新**: 2025年12月
**版本**: v1.0.0
