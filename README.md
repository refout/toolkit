# Toolkit

一个基于 Vue 3 + TypeScript + Element Plus 的在线工具箱。

## 功能特性

### 1. PDF 转图片
- 上传 PDF 文件，自动转换为高清图片
- 支持单张下载或打包下载所有图片
- 保持原始 PDF 的清晰度

### 2. 图片水印
- 上传图片，添加自定义文字水印
- 支持调整水印字体、大小、颜色、透明度、旋转角度
- 支持平铺模式或单点定位模式
- 实时预览效果
- 一键下载带水印的图片

### 3. 颜色工具
- 可视化颜色选择器
- 支持 HEX、RGB、RGBA、HSL 等多种格式
- 一键复制颜色值
- 常用颜色色板
- 历史记录功能

### 4. 图片合并 PDF
- 上传多张图片，合并为一个 PDF 文件
- 支持调整图片顺序
- 支持选择页面尺寸（A4、Letter、自适应）
- 支持横向/纵向布局
- 支持多种图片适配模式
- 在线预览并下载

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Element Plus** - 基于 Vue 3 的组件库
- **Vue Router** - Vue.js 官方路由
- **Vite** - 下一代前端构建工具
- **PDF.js** - PDF 解析库
- **jsPDF** - PDF 生成库
- **JSZip** - ZIP 文件处理库
- **FileSaver.js** - 文件保存库

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到 GitHub Pages

### 方式一：自动部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages，选择 "GitHub Actions" 作为构建和部署源
3. 推送到 main/master 分支时会自动触发部署

### 方式二：手动部署

1. 修改 `vite.config.ts` 中的 `base` 配置为你的仓库名
2. 运行 `npm run build` 构建项目
3. 将 `dist` 目录的内容推送到 `gh-pages` 分支

## 项目结构

```
toolkit/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions 部署配置
├── src/
│   ├── router/
│   │   └── index.ts          # 路由配置
│   ├── styles/
│   │   └── main.css          # 全局样式
│   ├── views/
│   │   ├── PdfToImage.vue    # PDF 转图片
│   │   ├── ImageWatermark.vue # 图片水印
│   │   ├── ColorPicker.vue   # 颜色工具
│   │   └── ImageToPdf.vue    # 图片合并 PDF
│   ├── App.vue               # 根组件
│   ├── main.ts               # 入口文件
│   └── vite-env.d.ts         # TypeScript 类型声明
├── index.html                # HTML 模板
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
└── package.json              # 项目依赖
```

## 许可证

MIT
