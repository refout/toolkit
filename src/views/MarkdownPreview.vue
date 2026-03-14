<template>
  <div class="page-container markdown-container">
    <div class="page-title">
      <h2>Markdown 预览</h2>
      <p class="description">实时预览 Markdown 文档，支持导出 PDF 和 HTML，自定义样式</p>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-select v-model="selectedStyle" placeholder="选择样式" @change="handleStyleChange" style="width: 180px">
          <el-option label="GitHub" value="github" />
          <el-option label="GitHub Dark" value="github-dark" />
          <el-option label="VuePress" value="vuepress" />
          <el-option label="自定义样式" value="custom" />
        </el-select>
        
        <el-upload
          v-if="selectedStyle === 'custom'"
          :show-file-list="false"
          :before-upload="handleStyleUpload"
          accept=".css"
        >
          <el-button type="primary" plain style="margin-left: 12px">
            <el-icon><Upload /></el-icon>
            上传样式文件
          </el-button>
        </el-upload>
      </div>
      
      <div class="toolbar-right">
        <el-button type="primary" @click="exportHTML">
          <el-icon><Download /></el-icon>
          导出 HTML
        </el-button>
        <el-button type="primary" @click="exportPDF">
          <el-icon><Download /></el-icon>
          导出 PDF
        </el-button>
      </div>
    </div>

    <!-- 编辑器和预览区域 -->
    <div class="editor-wrapper">
      <div class="editor-panel">
        <div class="panel-header">
          <span>编辑器</span>
        </div>
        <el-input
          v-model="markdownText"
          type="textarea"
          :rows="20"
          placeholder="在此输入 Markdown 文本..."
          @input="handleInput"
          class="markdown-editor"
        />
      </div>
      
      <div class="preview-panel">
        <div class="panel-header">
          <span>预览</span>
        </div>
        <div class="markdown-preview" :class="previewClass" v-html="renderedHTML"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import { ElMessage } from 'element-plus'
import { Download, Upload } from '@element-plus/icons-vue'

const markdownText = ref('')
const selectedStyle = ref('github')
const customStyle = ref('')

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true
})

// 预览区域的样式类
const previewClass = computed(() => {
  return `markdown-style-${selectedStyle.value}`
})

// 渲染 HTML
const renderedHTML = computed(() => {
  try {
    const rawHTML = marked(markdownText.value) as string
    return DOMPurify.sanitize(rawHTML)
  } catch (error) {
    console.error('Markdown 渲染错误:', error)
    return ''
  }
})

// 预设样式
const presetStyles: Record<string, string> = {
  github: `
    .markdown-style-github {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #24292f;
      background-color: #ffffff;
    }
    .markdown-style-github h1, .markdown-style-github h2, .markdown-style-github h3,
    .markdown-style-github h4, .markdown-style-github h5, .markdown-style-github h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    .markdown-style-github h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    .markdown-style-github h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: .3em; }
    .markdown-style-github h3 { font-size: 1.25em; }
    .markdown-style-github h4 { font-size: 1em; }
    .markdown-style-github p { margin-bottom: 16px; }
    .markdown-style-github code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(175,184,193,0.2);
      border-radius: 6px;
    }
    .markdown-style-github pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-github pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-style-github blockquote {
      padding: 0 1em;
      color: #57606a;
      border-left: 0.25em solid #d0d7de;
      margin: 0 0 16px 0;
    }
    .markdown-style-github ul, .markdown-style-github ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-github table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
    }
    .markdown-style-github table th, .markdown-style-github table td {
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
    .markdown-style-github table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    .markdown-style-github img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #ffffff;
    }
    .markdown-style-github a {
      color: #0969da;
      text-decoration: none;
    }
    .markdown-style-github a:hover {
      text-decoration: underline;
    }
  `,
  'github-dark': `
    .markdown-style-github-dark {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #c9d1d9;
      background-color: #0d1117;
    }
    .markdown-style-github-dark h1, .markdown-style-github-dark h2, .markdown-style-github-dark h3,
    .markdown-style-github-dark h4, .markdown-style-github-dark h5, .markdown-style-github-dark h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #c9d1d9;
    }
    .markdown-style-github-dark h1 { font-size: 2em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    .markdown-style-github-dark h2 { font-size: 1.5em; border-bottom: 1px solid #30363d; padding-bottom: .3em; }
    .markdown-style-github-dark h3 { font-size: 1.25em; }
    .markdown-style-github-dark h4 { font-size: 1em; }
    .markdown-style-github-dark p { margin-bottom: 16px; }
    .markdown-style-github-dark code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(110,118,129,0.4);
      border-radius: 6px;
    }
    .markdown-style-github-dark pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #161b22;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-github-dark pre code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-style-github-dark blockquote {
      padding: 0 1em;
      color: #8b949e;
      border-left: 0.25em solid #30363d;
      margin: 0 0 16px 0;
    }
    .markdown-style-github-dark ul, .markdown-style-github-dark ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-github-dark table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
    }
    .markdown-style-github-dark table th, .markdown-style-github-dark table td {
      padding: 6px 13px;
      border: 1px solid #30363d;
    }
    .markdown-style-github-dark table tr:nth-child(2n) {
      background-color: #161b22;
    }
    .markdown-style-github-dark img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #0d1117;
    }
    .markdown-style-github-dark a {
      color: #58a6ff;
      text-decoration: none;
    }
    .markdown-style-github-dark a:hover {
      text-decoration: underline;
    }
  `,
  vuepress: `
    .markdown-style-vuepress {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.7;
      color: #2c3e50;
      background-color: #ffffff;
    }
    .markdown-style-vuepress h1, .markdown-style-vuepress h2, .markdown-style-vuepress h3,
    .markdown-style-vuepress h4, .markdown-style-vuepress h5, .markdown-style-vuepress h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #1a1a1a;
    }
    .markdown-style-vuepress h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    .markdown-style-vuepress h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    .markdown-style-vuepress h3 { font-size: 1.25em; }
    .markdown-style-vuepress h4 { font-size: 1em; }
    .markdown-style-vuepress p { margin-bottom: 16px; }
    .markdown-style-vuepress code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(27,31,35,0.05);
      border-radius: 3px;
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
    .markdown-style-vuepress pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #282c34;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .markdown-style-vuepress pre code {
      background-color: transparent;
      padding: 0;
      color: #abb2bf;
    }
    .markdown-style-vuepress blockquote {
      padding: 0.5rem 1rem;
      color: #6a737d;
      border-left: 0.25rem solid #dfe2e5;
      margin: 0 0 16px 0;
      background-color: #f6f8fa;
    }
    .markdown-style-vuepress ul, .markdown-style-vuepress ol {
      padding-left: 2em;
      margin-bottom: 16px;
    }
    .markdown-style-vuepress table {
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
      display: block;
      overflow-x: auto;
    }
    .markdown-style-vuepress table th, .markdown-style-vuepress table td {
      padding: 10px 13px;
      border: 1px solid #dfe2e5;
    }
    .markdown-style-vuepress table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    .markdown-style-vuepress img {
      max-width: 100%;
    }
    .markdown-style-vuepress a {
      color: #3eaf7c;
      text-decoration: none;
    }
    .markdown-style-vuepress a:hover {
      text-decoration: underline;
    }
  `
}

// 处理样式变化
const handleStyleChange = () => {
  if (selectedStyle.value !== 'custom') {
    applyStyle(selectedStyle.value)
  } else if (customStyle.value) {
    applyCustomStyle()
  }
}

// 应用预设样式
const applyStyle = (styleName: string) => {
  removeExistingStyle()
  const styleElement = document.createElement('style')
  styleElement.id = 'markdown-preview-style'
  styleElement.textContent = presetStyles[styleName] || ''
  document.head.appendChild(styleElement)
}

// 应用自定义样式
const applyCustomStyle = () => {
  removeExistingStyle()
  const styleElement = document.createElement('style')
  styleElement.id = 'markdown-preview-style'
  styleElement.textContent = customStyle.value
  document.head.appendChild(styleElement)
}

// 移除现有样式
const removeExistingStyle = () => {
  const existingStyle = document.getElementById('markdown-preview-style')
  if (existingStyle) {
    existingStyle.remove()
  }
}

// 处理样式上传
const handleStyleUpload = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    customStyle.value = e.target?.result as string
    applyCustomStyle()
    ElMessage.success('样式文件上传成功')
  }
  reader.readAsText(file)
  return false
}

// 防抖函数
let debounceTimer: NodeJS.Timeout | null = null
const handleInput = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    // 触发重新渲染
  }, 300)
}

// 导出 HTML
const exportHTML = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <style>
    ${presetStyles[selectedStyle.value] || customStyle.value}
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="${previewClass.value}">
    ${renderedHTML.value}
  </div>
</body>
</html>
  `
  
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'markdown-export.html'
  link.click()
  URL.revokeObjectURL(url)
  
  ElMessage.success('HTML 导出成功')
}

// 导出 PDF
const exportPDF = async () => {
  try {
    ElMessage.info('正在生成 PDF，请稍候...')
    
    const html2pdf = (await import('html2pdf.js')).default
    
    const element = document.createElement('div')
    element.innerHTML = renderedHTML.value
    element.className = previewClass.value
    
    // 应用样式
    const styleElement = document.createElement('style')
    styleElement.textContent = presetStyles[selectedStyle.value] || customStyle.value
    element.appendChild(styleElement)
    
    const opt = {
      margin: 1,
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    }
    
    await html2pdf().set(opt).from(element).save()
    ElMessage.success('PDF 导出成功')
  } catch (error) {
    console.error('PDF 导出错误:', error)
    ElMessage.error('PDF 导出失败')
  }
}

// 初始化
onMounted(() => {
  // 设置默认样式
  applyStyle('github')
  
  // 设置示例 Markdown
  markdownText.value = `# Markdown 预览示例

## 功能特性

- ✅ 实时预览
- ✅ 代码高亮
- ✅ 多种预设样式
- ✅ 自定义样式上传
- ✅ 导出 HTML
- ✅ 导出 PDF

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!')
}
\`\`\`

## 表格示例

| 功能 | 描述 |
|------|------|
| 预览 | 实时渲染 Markdown |
| 样式 | 支持多种预设样式 |
| 导出 | 导出为 HTML 或 PDF |

## 引用示例

> 这是一段引用文字
> 可以有多行

## 列表示例

1. 第一项
2. 第二项
3. 第三项

- 无序列表项 1
- 无序列表项 2
- 无序列表项 3

**粗体文字** 和 *斜体文字* 以及 \`行内代码\`

[链接示例](https://example.com)
`
})
</script>

<style scoped>
.markdown-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--glass-bg);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  flex-wrap: wrap;
  gap: 12px;
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.editor-wrapper {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.editor-panel, .preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  overflow: hidden;
}

.panel-header {
  padding: 12px 16px;
  background: rgba(103, 194, 58, 0.1);
  border-bottom: 1px solid var(--glass-border);
  font-weight: 600;
  color: var(--text-color);
}

.markdown-editor {
  flex: 1;
}

.markdown-editor :deep(.el-textarea__inner) {
  height: 100% !important;
  resize: none;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  padding: 16px;
}

.markdown-preview {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toolbar-left, .toolbar-right {
    justify-content: center;
  }
  
  .editor-wrapper {
    flex-direction: column;
    min-height: 600px;
  }
  
  .editor-panel, .preview-panel {
    min-height: 300px;
  }
}
</style>
