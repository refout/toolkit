<template>
  <div class="page-container">
    <p class="description">图片与Base64编码相互转换，支持复制和下载</p>

    <el-tabs v-model="activeTab" class="tabs-container">
      <!-- 图片转Base64 -->
      <el-tab-pane label="图片转Base64" name="imageToBase64">
        <div class="section">
          <el-upload
            drag
            :auto-upload="false"
            :on-change="handleImageToBase64"
            :show-file-list="false"
            accept="image/*"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽图片到此处或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">支持 JPEG、PNG、GIF、WebP 等格式</div>
            </template>
          </el-upload>

          <div v-if="imagePreview" class="preview-container">
            <div class="preview-left">
              <h4>图片预览</h4>
              <el-image :src="imagePreview" :preview-src-list="[imagePreview]" fit="contain" />
              <div class="info">
                <p>文件名: {{ imageInfo.name }}</p>
                <p>大小: {{ formatFileSize(imageInfo.size) }}</p>
                <p>格式: {{ imageInfo.type }}</p>
              </div>
            </div>
            
            <div class="preview-right">
              <h4>Base64 编码</h4>
              <el-input
                v-model="base64Result"
                type="textarea"
                :rows="10"
                readonly
                placeholder="Base64编码将显示在这里"
              />
              <div class="actions">
                <el-button type="primary" @click="copyBase64">
                  <el-icon><CopyDocument /></el-icon>
                  复制Base64
                </el-button>
                <el-button type="success" @click="downloadBase64">
                  <el-icon><Download /></el-icon>
                  下载为文本
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- Base64转图片 -->
      <el-tab-pane label="Base64转图片" name="base64ToImage">
        <div class="section">
          <el-input
            v-model="base64Input"
            type="textarea"
            :rows="8"
            placeholder="请输入Base64编码（支持带或不带 data:image/xxx;base64, 前缀）"
          />
          
          <div class="convert-actions">
            <el-button type="primary" @click="convertBase64ToImage" :disabled="!base64Input">
              转换为图片
            </el-button>
            <el-button @click="clearBase64">
              清空
            </el-button>
          </div>

          <div v-if="convertedImage" class="result-container">
            <h4>转换结果</h4>
            <el-image :src="convertedImage" :preview-src-list="[convertedImage]" fit="contain" />
            <div class="actions">
              <el-button type="success" @click="downloadImage">
                <el-icon><Download /></el-icon>
                下载图片
              </el-button>
              <el-button type="primary" @click="copyImageUrl">
                <el-icon><CopyDocument /></el-icon>
                复制图片URL
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled, CopyDocument, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('imageToBase64')

const imagePreview = ref('')
const base64Result = ref('')
const imageInfo = ref({
  name: '',
  size: 0,
  type: ''
})

const base64Input = ref('')
const convertedImage = ref('')

const handleImageToBase64 = (file: any) => {
  const rawFile = file.raw
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  imageInfo.value = {
    name: rawFile.name,
    size: rawFile.size,
    type: rawFile.type
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    imagePreview.value = result
    base64Result.value = result
  }
  reader.readAsDataURL(rawFile)
}

const copyBase64 = async () => {
  if (!base64Result.value) {
    ElMessage.warning('没有可复制的内容')
    return
  }

  try {
    await navigator.clipboard.writeText(base64Result.value)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const downloadBase64 = () => {
  if (!base64Result.value) {
    ElMessage.warning('没有可下载的内容')
    return
  }

  const blob = new Blob([base64Result.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${imageInfo.value.name}.base64.txt`
  link.click()
  URL.revokeObjectURL(url)
}

const convertBase64ToImage = () => {
  if (!base64Input.value.trim()) {
    ElMessage.warning('请输入Base64编码')
    return
  }

  try {
    let base64Data = base64Input.value.trim()
    
    // 如果没有前缀，尝试添加默认前缀
    if (!base64Data.startsWith('data:image')) {
      base64Data = 'data:image/png;base64,' + base64Data
    }

    // 验证是否是有效的Base64图片
    const img = new Image()
    img.onload = () => {
      convertedImage.value = base64Data
      ElMessage.success('转换成功')
    }
    img.onerror = () => {
      ElMessage.error('无效的Base64图片编码')
    }
    img.src = base64Data
  } catch (error) {
    ElMessage.error('转换失败，请检查Base64编码格式')
  }
}

const clearBase64 = () => {
  base64Input.value = ''
  convertedImage.value = ''
}

const downloadImage = () => {
  if (!convertedImage.value) return

  const link = document.createElement('a')
  link.href = convertedImage.value
  link.download = `converted-image-${Date.now()}.png`
  link.click()
}

const copyImageUrl = async () => {
  if (!convertedImage.value) {
    ElMessage.warning('没有可复制的内容')
    return
  }

  try {
    await navigator.clipboard.writeText(convertedImage.value)
    ElMessage.success('已复制图片URL到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<style scoped>
.tabs-container {
  margin-top: 20px;
}

.section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.preview-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.preview-left,
.preview-right {
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.preview-left h4,
.preview-right h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-color);
}

.preview-left :deep(.el-image) {
  width: 100%;
  max-height: 300px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.preview-left :deep(.el-image img) {
  object-fit: contain;
  cursor: pointer;
}

.info {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-color);
}

.info p {
  margin: 4px 0;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.convert-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 20px;
}

.result-container {
  margin-top: 20px;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.result-container h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-color);
}

.result-container :deep(.el-image) {
  max-width: 100%;
  max-height: 400px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.result-container :deep(.el-image img) {
  cursor: pointer;
}
</style>
