<template>
  <div class="page-container">
    <p class="description">上传多张图片，将它们合并为一个PDF文件并下载</p>

    <el-upload
      :auto-upload="false"
      :file-list="fileList"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
      accept="image/*"
      multiple
      drag
      list-type="picture-card"
    >
      <el-icon><Plus /></el-icon>
      <template #tip>
        <div class="el-upload__tip">
          支持上传多张图片，可拖拽排序
        </div>
      </template>
    </el-upload>

    <div v-if="fileList.length > 0" class="actions-section">
      <el-alert
        title="提示：拖动图片可调整顺序"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 20px"
      />
      
      <el-form :model="pdfConfig" label-width="120px">
        <el-form-item label="PDF页面尺寸">
          <el-select v-model="pdfConfig.pageSize">
            <el-option label="A4 (210 × 297 mm)" value="a4" />
            <el-option label="Letter (216 × 279 mm)" value="letter" />
            <el-option label="适应图片大小" value="auto" />
          </el-select>
        </el-form-item>
        <el-form-item label="页面方向">
          <el-radio-group v-model="pdfConfig.orientation">
            <el-radio label="portrait">纵向</el-radio>
            <el-radio label="landscape">横向</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片适配方式">
          <el-radio-group v-model="pdfConfig.fitMode">
            <el-radio label="contain">包含（留白）</el-radio>
            <el-radio label="cover">填充（裁剪）</el-radio>
            <el-radio label="stretch">拉伸</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            @click="generatePdf"
            :loading="generating"
          >
            <el-icon><Document /></el-icon>
            生成PDF
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="previewPdf" class="preview-section">
      <h3>PDF预览</h3>
      <iframe :src="previewPdf" class="pdf-preview"></iframe>
      <div class="preview-actions">
        <el-button type="success" size="large" @click="downloadPdf">
          <el-icon><Download /></el-icon>
          下载PDF
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { jsPDF } from 'jspdf'
import type { UploadFile, UploadFiles } from 'element-plus'

interface PdfConfig {
  pageSize: 'a4' | 'letter' | 'auto'
  orientation: 'portrait' | 'landscape'
  fitMode: 'contain' | 'cover' | 'stretch'
}

const fileList = ref<UploadFile[]>([])
const previewPdf = ref<string>('')
const generating = ref(false)
const pdfBlob = ref<Blob | null>(null)

const pdfConfig = reactive<PdfConfig>({
  pageSize: 'a4',
  orientation: 'portrait',
  fitMode: 'contain'
})

const handleFileChange = (_file: UploadFile, files: UploadFiles) => {
  fileList.value = files
}

const handleFileRemove = (_file: UploadFile, files: UploadFiles) => {
  fileList.value = files
}

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

const generatePdf = async () => {
  if (fileList.value.length === 0) {
    ElMessage.warning('请先上传图片')
    return
  }

  generating.value = true

  try {
    // 创建 PDF
    const pdf = new jsPDF({
      orientation: pdfConfig.orientation,
      unit: 'mm',
      format: pdfConfig.pageSize === 'auto' ? 'a4' : pdfConfig.pageSize
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10

    for (let i = 0; i < fileList.value.length; i++) {
      const file = fileList.value[i]
      
      if (i > 0) {
        pdf.addPage()
      }

      const img = await loadImage(file.url!)
      
      let imgWidth = img.width
      let imgHeight = img.height
      const imgRatio = imgWidth / imgHeight

      // 根据配置调整图片大小
      let finalWidth: number
      let finalHeight: number
      let x = margin
      let y = margin

      if (pdfConfig.pageSize === 'auto') {
        // 自动适应图片大小 - 按比例缩放到适合的尺寸
        const maxWidth = 210
        const maxHeight = 297
        
        if (imgRatio > maxWidth / maxHeight) {
          finalWidth = maxWidth
          finalHeight = maxWidth / imgRatio
        } else {
          finalHeight = maxHeight
          finalWidth = maxHeight * imgRatio
        }
        
        x = (maxWidth - finalWidth) / 2
        y = (maxHeight - finalHeight) / 2
      } else {
        const availableWidth = pageWidth - 2 * margin
        const availableHeight = pageHeight - 2 * margin
        const pageRatio = availableWidth / availableHeight

        switch (pdfConfig.fitMode) {
          case 'contain':
            if (imgRatio > pageRatio) {
              finalWidth = availableWidth
              finalHeight = availableWidth / imgRatio
            } else {
              finalHeight = availableHeight
              finalWidth = availableHeight * imgRatio
            }
            x = (pageWidth - finalWidth) / 2
            y = (pageHeight - finalHeight) / 2
            break

          case 'cover':
            if (imgRatio > pageRatio) {
              finalHeight = availableHeight
              finalWidth = availableHeight * imgRatio
            } else {
              finalWidth = availableWidth
              finalHeight = availableWidth / imgRatio
            }
            x = (pageWidth - finalWidth) / 2
            y = (pageHeight - finalHeight) / 2
            break

          case 'stretch':
            finalWidth = availableWidth
            finalHeight = availableHeight
            x = margin
            y = margin
            break

          default:
            finalWidth = availableWidth
            finalHeight = availableHeight
        }
      }

      // 将图片添加到 PDF
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight)
    }

    // 生成 Blob
    const pdfOutput = pdf.output('blob')
    pdfBlob.value = pdfOutput
    previewPdf.value = URL.createObjectURL(pdfOutput)
    
    ElMessage.success('PDF生成成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('PDF生成失败')
  } finally {
    generating.value = false
  }
}

const downloadPdf = () => {
  if (!pdfBlob.value) return
  
  const url = URL.createObjectURL(pdfBlob.value)
  const link = document.createElement('a')
  link.href = url
  link.download = `images-${Date.now()}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.actions-section {
  margin-top: 24px;
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.preview-section {
  margin-top: 24px;
}

.pdf-preview {
  width: 100%;
  height: 600px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  margin-top: 12px;
}

.preview-actions {
  margin-top: 16px;
  text-align: center;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 148px;
  height: 148px;
}
</style>
