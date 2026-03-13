<template>
  <div class="page-container">
    <p class="description">上传PDF文件，自动为每一页添加页码，支持自定义页码样式和位置</p>

    <div class="pdf-page-container">
      <div class="upload-section">
        <el-upload
          ref="uploadRef"
          drag
          :auto-upload="false"
          :on-change="handleFileChange"
          :show-file-list="false"
          accept=".pdf"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽PDF文件到此处或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">仅支持 PDF 文件</div>
          </template>
        </el-upload>
      </div>

      <div v-if="pdfFile" class="settings-section">
        <div class="file-info">
          <el-tag type="info" size="large">{{ pdfFile.name }}</el-tag>
          <span class="pages-count">共 {{ pageCount }} 页</span>
        </div>

        <el-alert
          type="info"
          :closable="false"
          style="margin-bottom: 20px"
        >
          <template #title>
            <strong>字体说明：</strong>使用默认英文字体仅支持英文和数字格式。如需中文格式，请上传中文字体文件（TTF/OTF）。
          </template>
        </el-alert>

        <el-collapse accordion style="margin-bottom: 20px">
          <el-collapse-item title="📁 如何找到系统字体文件？" name="guide">
            <div class="font-guide">
              <div class="os-section">
                <div class="os-header">
                  <h4>Windows 系统</h4>
                  <el-button size="small" @click="copyPath('C:\\Windows\\Fonts')">
                    <el-icon><CopyDocument /></el-icon>
                    复制路径
                  </el-button>
                </div>
                <code>C:\Windows\Fonts</code>
                <el-alert type="warning" :closable="false" style="margin-top: 8px">
                  <strong>注意：</strong>Windows 字体文件夹为特殊系统文件夹，无法直接在文件选择器中访问
                </el-alert>
                <p class="hint">解决方案：</p>
                <ul class="solution-list">
                  <li>复制所需字体文件到桌面或其他文件夹后再上传</li>
                  <li>或从下方链接下载免费字体</li>
                </ul>
              </div>
              
              <div class="os-section">
                <div class="os-header">
                  <h4>macOS 系统</h4>
                  <div class="btn-group">
                    <el-button size="small" @click="copyPath('/System/Library/Fonts')">
                      <el-icon><CopyDocument /></el-icon>
                      系统字体
                    </el-button>
                    <el-button size="small" @click="copyPath('~/Library/Fonts')">
                      <el-icon><CopyDocument /></el-icon>
                      用户字体
                    </el-button>
                  </div>
                </div>
                <code>/System/Library/Fonts</code> 或 <code>~/Library/Fonts</code>
                <p class="hint">常见字体：PingFang.ttc、STHeiti Light.ttc、Songti.ttc</p>
              </div>
              
              <div class="os-section">
                <div class="os-header">
                  <h4>Linux 系统</h4>
                  <div class="btn-group">
                    <el-button size="small" @click="copyPath('/usr/share/fonts')">
                      <el-icon><CopyDocument /></el-icon>
                      系统字体
                    </el-button>
                    <el-button size="small" @click="copyPath('~/.local/share/fonts')">
                      <el-icon><CopyDocument /></el-icon>
                      用户字体
                    </el-button>
                  </div>
                </div>
                <code>/usr/share/fonts</code> 或 <code>~/.local/share/fonts</code>
                <p class="hint">常见字体：NotoSansCJK.ttc、WenQuanYi Micro Hei.ttf</p>
              </div>

              <div class="instructions">
                <h4>推荐方案：</h4>
                <div class="download-section">
                  <p><strong>方案一：下载免费字体（推荐）</strong></p>
                  <div class="download-links">
                    <el-button type="primary" size="small" @click="downloadFont('noto-sans-sc')">
                      下载思源黑体 (Noto Sans SC)
                    </el-button>
                    <el-button type="primary" size="small" @click="downloadFont('noto-serif-sc')">
                      下载思源宋体 (Noto Serif SC)
                    </el-button>
                  </div>
                  
                  <p style="margin-top: 12px"><strong>方案二：复制系统字体</strong></p>
                  <ol>
                    <li>Win+R 打开运行，输入 <code>fonts</code> 回车</li>
                    <li>找到需要的字体文件（如 msyh.ttc）</li>
                    <li>右键复制到桌面或其他文件夹</li>
                    <li>使用上方上传按钮选择复制后的字体文件</li>
                  </ol>
                </div>
              </div>

              <div class="tip">
                <el-icon><InfoFilled /></el-icon>
                <span>更多字体：<a href="https://fonts.google.com/noto/fonts" target="_blank">Google Fonts</a> | <a href="https://github.com/adobe-fonts" target="_blank">Adobe Fonts</a></span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

        <h3>字体设置</h3>
        <el-form label-width="120px">
          <el-form-item label="字体文件">
            <el-upload
              :auto-upload="false"
              :on-change="handleFontChange"
              :show-file-list="false"
              accept=".TTF,.otf"
            >
              <el-button>
                <el-icon><Upload /></el-icon>
                上传字体文件
              </el-button>
            </el-upload>
            <el-tag v-if="fontFile" type="success" style="margin-left: 12px">
              {{ fontFile.name }}
            </el-tag>
            <el-button v-if="fontFile" text type="danger" @click="clearFont">
              清除
            </el-button>
          </el-form-item>
        </el-form>

        <h3>页码设置</h3>
        <el-form :model="pageNumberConfig" label-width="120px">
          <el-form-item label="页码位置">
            <el-radio-group v-model="pageNumberConfig.position">
              <el-radio-button label="bottom-center">底部居中</el-radio-button>
              <el-radio-button label="bottom-left">底部左侧</el-radio-button>
              <el-radio-button label="bottom-right">底部右侧</el-radio-button>
              <el-radio-button label="top-center">顶部居中</el-radio-button>
              <el-radio-button label="top-left">顶部左侧</el-radio-button>
              <el-radio-button label="top-right">顶部右侧</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="页码格式">
            <el-select v-model="pageNumberConfig.format" :disabled="!fontFile && (pageNumberConfig.format.includes('chinese'))">
              <el-option label="1, 2, 3..." value="numeric" />
              <el-option label="Page 1" value="english" />
              <el-option label="1 / N" value="total" />
              <el-option label="Page 1 of N" value="englishTotal" />
              <el-option label="第 1 页" value="chinese" :disabled="!fontFile" />
              <el-option label="第 1 页 / 共 N 页" value="chineseTotal" :disabled="!fontFile" />
            </el-select>
          </el-form-item>

          <el-form-item label="起始页码">
            <el-input-number v-model="pageNumberConfig.startNumber" :min="1" :max="9999" />
          </el-form-item>

          <el-form-item label="字体大小">
            <el-slider
              v-model="pageNumberConfig.fontSize"
              :min="8"
              :max="24"
              :format-tooltip="(val: number) => val + ' pt'"
            />
          </el-form-item>

          <el-form-item label="字体颜色">
            <el-color-picker v-model="pageNumberConfig.color" />
          </el-form-item>

          <el-form-item label="页边距">
            <el-slider
              v-model="pageNumberConfig.margin"
              :min="10"
              :max="50"
              :format-tooltip="(val: number) => val + ' pt'"
            />
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" @click="addPageNumbers" :loading="processing" style="width: 100%;">
          <el-icon><Document /></el-icon>
          添加页码
        </el-button>
      </div>

      <div v-if="processedPdfUrl" class="result-section">
        <h3>处理结果</h3>
        <div class="preview-container">
          <iframe :src="processedPdfUrl" class="pdf-preview"></iframe>
        </div>
        <div class="actions">
          <el-button type="success" size="large" @click="downloadPdf">
            <el-icon><Download /></el-icon>
            下载PDF
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled, Document, Download, Upload, InfoFilled, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

const pdfFile = ref<File | null>(null)
const fontFile = ref<File | null>(null)
const fontBytes = ref<ArrayBuffer | null>(null)
const pageCount = ref(0)
const processing = ref(false)
const processedPdfUrl = ref('')
const processedPdfBytes = ref<Uint8Array | null>(null)

const pageNumberConfig = ref({
  position: 'bottom-center',
  format: 'numeric',
  startNumber: 1,
  fontSize: 12,
  color: '#000000',
  margin: 30
})

const handleFontChange = async (file: any) => {
  const rawFile = file.raw
  if (!rawFile.name.match(/\.(ttf|otf)$/i)) {
    ElMessage.error('请选择 TTF 或 OTF 字体文件')
    return
  }

  try {
    fontFile.value = rawFile
    fontBytes.value = await rawFile.arrayBuffer()
    ElMessage.success('字体加载成功')
  } catch (error) {
    ElMessage.error('字体文件读取失败')
    console.error(error)
  }
}

const clearFont = () => {
  fontFile.value = null
  fontBytes.value = null
  // 如果当前选中的是中文格式，自动切换回英文格式
  if (pageNumberConfig.value.format.includes('chinese')) {
    pageNumberConfig.value.format = 'numeric'
  }
  ElMessage.success('字体已清除')
}

const copyPath = async (path: string) => {
  try {
    await navigator.clipboard.writeText(path)
    ElMessage.success('路径已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
  }
}

const downloadFont = (fontName: string) => {
  const fontUrls: Record<string, string> = {
    'noto-sans-sc': 'https://fonts.google.com/download?family=Noto%20Sans%20SC',
    'noto-serif-sc': 'https://fonts.google.com/download?family=Noto%20Serif%20SC'
  }
  
  const url = fontUrls[fontName]
  if (url) {
    window.open(url, '_blank')
    ElMessage.success('已打开字体下载页面，下载后请解压并上传 TTF 文件')
  }
}

const handleFileChange = async (file: any) => {
  const rawFile = file.raw
  if (rawFile.type !== 'application/pdf') {
    ElMessage.error('请选择PDF文件')
    return
  }

  pdfFile.value = rawFile
  processedPdfUrl.value = ''
  processedPdfBytes.value = null

  // 读取PDF页数
  try {
    const arrayBuffer = await rawFile.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    pageCount.value = pdfDoc.getPageCount()
  } catch (error) {
    ElMessage.error('读取PDF失败')
    console.error(error)
  }
}

const addPageNumbers = async () => {
  if (!pdfFile.value) {
    ElMessage.warning('请先上传PDF文件')
    return
  }

  processing.value = true

  try {
    const arrayBuffer = await pdfFile.value.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // 注册 fontkit 以支持自定义字体
    pdfDoc.registerFontkit(fontkit)
    
    const pages = pdfDoc.getPages()
    
    // 根据是否上传字体选择字体
    let font
    if (fontBytes.value) {
      font = await pdfDoc.embedFont(fontBytes.value)
    } else {
      font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    }
    
    const totalPages = pages.length
    const color = hexToRgb(pageNumberConfig.value.color)

    pages.forEach((page, index) => {
      const { width, height } = page.getSize()
      const pageNumber = index + pageNumberConfig.value.startNumber
      const text = formatPageNumber(pageNumber, totalPages)
      
      const fontSize = pageNumberConfig.value.fontSize
      const textWidth = font.widthOfTextAtSize(text, fontSize)
      const margin = pageNumberConfig.value.margin

      let x = 0
      let y = 0

      // 计算x坐标
      if (pageNumberConfig.value.position.includes('center')) {
        x = (width - textWidth) / 2
      } else if (pageNumberConfig.value.position.includes('left')) {
        x = margin
      } else if (pageNumberConfig.value.position.includes('right')) {
        x = width - textWidth - margin
      }

      // 计算y坐标
      if (pageNumberConfig.value.position.includes('bottom')) {
        y = margin
      } else if (pageNumberConfig.value.position.includes('top')) {
        y = height - margin - fontSize
      }

      // 添加页码文本
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b)
      })
    })

    const pdfBytes = await pdfDoc.save()
    processedPdfBytes.value = pdfBytes
    
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' })
    processedPdfUrl.value = URL.createObjectURL(blob)
    
    ElMessage.success('页码添加成功')
  } catch (error) {
    ElMessage.error('处理失败')
    console.error(error)
  } finally {
    processing.value = false
  }
}

const formatPageNumber = (pageNumber: number, totalPages: number): string => {
  const format = pageNumberConfig.value.format
  
  switch (format) {
    case 'numeric':
      return `${pageNumber}`
    case 'english':
      return `Page ${pageNumber}`
    case 'total':
      return `${pageNumber} / ${totalPages}`
    case 'englishTotal':
      return `Page ${pageNumber} of ${totalPages}`
    case 'chinese':
      return `第 ${pageNumber} 页`
    case 'chineseTotal':
      return `第 ${pageNumber} 页 / 共 ${totalPages} 页`
    default:
      return `${pageNumber}`
  }
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 }
}

const downloadPdf = () => {
  if (!processedPdfBytes.value) return

  const blob = new Blob([processedPdfBytes.value], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${pdfFile.value?.name.replace('.pdf', '')}-with-page-numbers.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.pdf-page-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.settings-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.pages-count {
  font-size: 14px;
  color: var(--text-color);
}

.settings-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.result-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.result-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.preview-container {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  overflow: hidden;
}

.pdf-preview {
  width: 100%;
  height: 600px;
  border: none;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.font-guide {
  padding: 8px 0;
}

.os-section {
  margin-bottom: 16px;
}

.os-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.os-header h4 {
  margin: 0;
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.os-section h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

.os-section code {
  display: inline-block;
  padding: 4px 12px;
  background: var(--bg-color);
  border-radius: 4px;
  font-size: 12px;
  color: #67C23A;
  font-family: 'Courier New', monospace;
}

.os-section .hint {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(103, 194, 58, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-color);
}

.tip a {
  color: #67C23A;
  text-decoration: none;
}

.tip a:hover {
  text-decoration: underline;
}

.instructions {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 6px;
}

.instructions h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

.instructions ol {
  margin: 0;
  padding-left: 20px;
}

.instructions li {
  margin: 6px 0;
  font-size: 12px;
  color: var(--text-color);
  line-height: 1.5;
}

.solution-list {
  margin: 8px 0;
  padding-left: 20px;
}

.solution-list li {
  margin: 4px 0;
  font-size: 12px;
  color: var(--text-color);
  line-height: 1.5;
}

.download-section {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 6px;
}

.download-section p {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: var(--text-color);
}

.download-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.download-section ol {
  margin: 8px 0 0 0;
  padding-left: 20px;
}



</style>
