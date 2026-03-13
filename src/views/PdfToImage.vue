<template>
  <div class="page-container">
    <p class="description">上传PDF文件，将其转换为图片，支持批量下载</p>

    <el-upload
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleFileChange"
      accept=".pdf"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽PDF文件到此处或<em>点击上传</em>
      </div>
    </el-upload>

    <div v-if="pdfFile" class="file-info">
      <el-tag>{{ pdfFile.name }}</el-tag>
      <el-button type="primary" @click="convertToImages" :loading="converting">
        开始转换
      </el-button>
    </div>

    <div v-if="images.length > 0" class="result-section">
      <div class="actions-bar">
        <h3>转换结果 ({{ images.length }}张图片)</h3>
        <el-button type="success" @click="downloadAll">
          <el-icon><Download /></el-icon>
          打包下载
        </el-button>
      </div>
      
      <div class="image-preview">
        <div v-for="(img, index) in images" :key="index" class="image-item">
          <el-image :src="img.url" :preview-src-list="images.map(i => i.url)" :initial-index="index" fit="contain" />
          <div class="image-actions">
            <el-button size="small" type="primary" @click="downloadSingle(img, index)">
              下载
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import * as pdfjsLib from 'pdfjs-dist'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// 设置 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface ImageData {
  url: string
  blob: Blob
}

const pdfFile = ref<File | null>(null)
const images = ref<ImageData[]>([])
const converting = ref(false)

const handleFileChange = (file: any) => {
  pdfFile.value = file.raw
  images.value = []
}

const convertToImages = async () => {
  if (!pdfFile.value) return
  
  converting.value = true
  images.value = []
  
  try {
    const arrayBuffer = await pdfFile.value.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const scale = 2 // 提高分辨率
      const viewport = page.getViewport({ scale })
      
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.height = viewport.height
      canvas.width = viewport.width
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas
      }).promise
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
      })
      
      const url = URL.createObjectURL(blob)
      images.value.push({ url, blob })
    }
    
    ElMessage.success(`成功转换 ${images.value.length} 张图片`)
  } catch (error) {
    console.error(error)
    ElMessage.error('转换失败，请检查PDF文件')
  } finally {
    converting.value = false
  }
}

const downloadSingle = (img: ImageData, index: number) => {
  saveAs(img.blob, `page-${index + 1}.png`)
}

const downloadAll = async () => {
  const zip = new JSZip()
  
  images.value.forEach((img, index) => {
    zip.file(`page-${index + 1}.png`, img.blob)
  })
  
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, `${pdfFile.value?.name.replace('.pdf', '')}-images.zip`)
}
</script>

<style scoped>
.file-info {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.result-section {
  margin-top: 24px;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.image-item {
  position: relative;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  overflow: hidden;
}

.image-item :deep(.el-image) {
  display: block;
  width: 200px;
  height: 200px;
}

.image-item :deep(.el-image img) {
  object-fit: contain;
  cursor: pointer;
}

.image-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-item:hover .image-actions {
  opacity: 1;
}
</style>
