<template>
  <div class="page-container">
    <p class="description">图片压缩工具，支持 JPEG、PNG、WebP 格式，可调整压缩质量</p>

    <div class="compress-container">
      <div class="upload-section">
        <el-upload
          ref="uploadRef"
          drag
          :auto-upload="false"
          :on-change="handleFileChange"
          :show-file-list="false"
          accept="image/*"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽图片到此处或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">支持 JPEG、PNG、WebP 格式图片</div>
          </template>
        </el-upload>
      </div>

      <div v-if="originalImage" class="preview-section">
        <div class="preview-item">
          <h3>原始图片</h3>
          <el-image :src="originalImage" :preview-src-list="[originalImage]" fit="contain" />
          <div class="info">
            <p>大小: {{ formatFileSize(originalSize) }}</p>
            <p>格式: {{ originalFormat }}</p>
          </div>
        </div>

        <div class="settings">
          <h3>压缩设置</h3>
          <el-form label-width="100px">
            <el-form-item label="输出格式">
              <el-select v-model="outputFormat" placeholder="选择格式">
                <el-option label="JPEG" value="image/jpeg" />
                <el-option label="PNG" value="image/png" />
                <el-option label="WebP" value="image/webp" />
              </el-select>
            </el-form-item>
            
            <el-form-item v-if="outputFormat !== 'image/png'" label="压缩质量">
              <el-slider
                v-model="quality"
                :min="10"
                :max="100"
                :format-tooltip="(val: number) => val + '%'"
              />
            </el-form-item>

            <el-form-item v-if="outputFormat === 'image/jpeg'" label="调整尺寸">
              <el-switch v-model="resize" />
            </el-form-item>

            <template v-if="resize">
              <el-form-item label="宽度">
                <el-input-number v-model="maxWidth" :min="100" :max="10000" />
              </el-form-item>
              <el-form-item label="高度">
                <el-input-number v-model="maxHeight" :min="100" :max="10000" />
              </el-form-item>
            </template>
          </el-form>

          <el-button type="primary" @click="compressImage" :loading="compressing">
            开始压缩
          </el-button>
        </div>

        <div v-if="compressedImage" class="preview-item">
          <h3>压缩后</h3>
          <el-image :src="compressedImage" :preview-src-list="[compressedImage]" fit="contain" />
          <div class="info">
            <p>大小: {{ formatFileSize(compressedSize) }}</p>
            <p>压缩率: {{ compressionRate }}%</p>
          </div>
          <el-button type="success" @click="downloadImage" style="margin-top: 12px;">
            下载图片
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const originalImage = ref('')
const compressedImage = ref('')
const originalSize = ref(0)
const compressedSize = ref(0)
const originalFormat = ref('')
const outputFormat = ref('image/jpeg')
const quality = ref(80)
const resize = ref(false)
const maxWidth = ref(1920)
const maxHeight = ref(1080)
const compressing = ref(false)

const compressionRate = ref('0')

const handleFileChange = (file: any) => {
  const rawFile = file.raw
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  originalSize.value = rawFile.size
  originalFormat.value = rawFile.type.split('/')[1].toUpperCase()
  
  const reader = new FileReader()
  reader.onload = (e) => {
    originalImage.value = e.target?.result as string
    compressedImage.value = ''
  }
  reader.readAsDataURL(rawFile)
}

const compressImage = async () => {
  if (!originalImage.value) {
    ElMessage.warning('请先上传图片')
    return
  }

  compressing.value = true
  
  try {
    const img = new Image()
    img.src = originalImage.value
    
    await new Promise((resolve) => {
      img.onload = resolve
    })

    const canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height

    if (resize.value) {
      const ratio = Math.min(maxWidth.value / width, maxHeight.value / height)
      if (ratio < 1) {
        width = Math.floor(width * ratio)
        height = Math.floor(height * ratio)
      }
    }

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, width, height)

    const qualityValue = outputFormat.value === 'image/png' ? undefined : quality.value / 100
    const dataUrl = canvas.toDataURL(outputFormat.value, qualityValue)
    
    compressedImage.value = dataUrl
    
    // 计算压缩后大小
    const base64Length = dataUrl.split(',')[1].length
    compressedSize.value = Math.floor(base64Length * 0.75)
    
    const rate = ((1 - compressedSize.value / originalSize.value) * 100).toFixed(1)
    compressionRate.value = rate

    ElMessage.success('压缩完成')
  } catch (error) {
    ElMessage.error('压缩失败')
    console.error(error)
  } finally {
    compressing.value = false
  }
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = compressedImage.value
  const ext = outputFormat.value.split('/')[1]
  link.download = `compressed-image.${ext}`
  link.click()
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<style scoped>
.compress-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-section {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.preview-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.preview-item {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.preview-item h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.preview-item :deep(.el-image) {
  width: 100%;
  max-height: 300px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.preview-item :deep(.el-image img) {
  object-fit: contain;
  cursor: pointer;
}

.preview-item .info {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-color);
}

.preview-item .info p {
  margin: 4px 0;
}

.settings {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.settings h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}
</style>
