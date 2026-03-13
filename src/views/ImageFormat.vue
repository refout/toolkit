<template>
  <div class="page-container">
    <p class="description">图片格式转换工具，支持 JPEG、PNG、WebP、BMP、GIF 格式互转</p>

    <div class="format-container">
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
            <div class="el-upload__tip">支持 JPEG、PNG、WebP、BMP、GIF 格式</div>
          </template>
        </el-upload>
      </div>

      <div v-if="originalImage" class="convert-section">
        <div class="preview-item">
          <h3>原始图片</h3>
          <el-image :src="originalImage" :preview-src-list="[originalImage]" fit="contain" />
          <div class="info">
            <p>格式: {{ originalFormat }}</p>
            <p>大小: {{ formatFileSize(originalSize) }}</p>
            <p>尺寸: {{ imageWidth }} x {{ imageHeight }}</p>
          </div>
        </div>

        <div class="settings">
          <h3>转换设置</h3>
          <el-form label-width="100px">
            <el-form-item label="输出格式">
              <el-select v-model="outputFormat" placeholder="选择格式">
                <el-option label="JPEG" value="image/jpeg" />
                <el-option label="PNG" value="image/png" />
                <el-option label="WebP" value="image/webp" />
                <el-option label="BMP" value="image/bmp" />
              </el-select>
            </el-form-item>
            
            <el-form-item v-if="outputFormat === 'image/jpeg' || outputFormat === 'image/webp'" label="质量">
              <el-slider
                v-model="quality"
                :min="10"
                :max="100"
                :format-tooltip="(val: number) => val + '%'"
              />
            </el-form-item>

            <el-form-item label="调整尺寸">
              <el-switch v-model="resize" />
            </el-form-item>

            <template v-if="resize">
              <el-form-item label="缩放比例">
                <el-slider
                  v-model="scaleRatio"
                  :min="10"
                  :max="200"
                  :format-tooltip="(val: number) => val + '%'"
                />
              </el-form-item>
            </template>
          </el-form>

          <el-button type="primary" @click="convertImage" :loading="converting" style="width: 100%;">
            开始转换
          </el-button>
        </div>

        <div v-if="convertedImage" class="preview-item">
          <h3>转换后</h3>
          <el-image :src="convertedImage" :preview-src-list="[convertedImage]" fit="contain" />
          <div class="info">
            <p>格式: {{ getFormatName(outputFormat) }}</p>
            <p>大小: {{ formatFileSize(convertedSize) }}</p>
            <p v-if="resize">尺寸: {{ scaledWidth }} x {{ scaledHeight }}</p>
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

const uploadRef = ref()
const originalImage = ref('')
const convertedImage = ref('')
const originalSize = ref(0)
const convertedSize = ref(0)
const originalFormat = ref('')
const outputFormat = ref('image/png')
const quality = ref(92)
const resize = ref(false)
const scaleRatio = ref(100)
const converting = ref(false)

const imageWidth = ref(0)
const imageHeight = ref(0)
const scaledWidth = ref(0)
const scaledHeight = ref(0)

const handleFileChange = (file: any) => {
  const rawFile = file.raw
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  originalSize.value = rawFile.size
  originalFormat.value = getFormatName(rawFile.type)
  
  const reader = new FileReader()
  reader.onload = (e) => {
    originalImage.value = e.target?.result as string
    convertedImage.value = ''
    
    // 获取图片尺寸
    const img = new Image()
    img.src = originalImage.value
    img.onload = () => {
      imageWidth.value = img.width
      imageHeight.value = img.height
    }
  }
  reader.readAsDataURL(rawFile)
}

const convertImage = async () => {
  if (!originalImage.value) {
    ElMessage.warning('请先上传图片')
    return
  }

  converting.value = true
  
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
      const ratio = scaleRatio.value / 100
      width = Math.floor(width * ratio)
      height = Math.floor(height * ratio)
      scaledWidth.value = width
      scaledHeight.value = height
    }

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    
    // JPEG 格式需要填充白色背景
    if (outputFormat.value === 'image/jpeg') {
      ctx!.fillStyle = '#FFFFFF'
      ctx!.fillRect(0, 0, width, height)
    }
    
    ctx?.drawImage(img, 0, 0, width, height)

    const qualityValue = outputFormat.value === 'image/png' || outputFormat.value === 'image/bmp' 
      ? undefined 
      : quality.value / 100
    
    const dataUrl = canvas.toDataURL(outputFormat.value, qualityValue)
    
    convertedImage.value = dataUrl
    
    // 计算转换后大小
    const base64Length = dataUrl.split(',')[1].length
    convertedSize.value = Math.floor(base64Length * 0.75)

    ElMessage.success('转换完成')
  } catch (error) {
    ElMessage.error('转换失败')
    console.error(error)
  } finally {
    converting.value = false
  }
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = convertedImage.value
  const ext = outputFormat.value.split('/')[1]
  link.download = `converted-image.${ext === 'jpeg' ? 'jpg' : ext}`
  link.click()
}

const getFormatName = (mimeType: string): string => {
  const formats: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/bmp': 'BMP',
    'image/gif': 'GIF'
  }
  return formats[mimeType] || mimeType
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<style scoped>
.format-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-section {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.convert-section {
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

.preview-item img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
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
