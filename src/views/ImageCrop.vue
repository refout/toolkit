<template>
  <div class="page-container">
    <p class="description">图片剪裁工具，支持自定义剪裁区域和比例</p>

    <div class="crop-container">
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

      <div v-if="imageUrl" class="crop-section">
        <div class="canvas-container">
          <canvas ref="canvasRef" @mousedown="startCrop" @mousemove="updateCrop" @mouseup="endCrop" @mouseleave="endCrop"></canvas>
        </div>

        <div class="controls">
          <h3>剪裁设置</h3>
          
          <el-form label-width="100px">
            <el-form-item label="预设比例">
              <el-select v-model="aspectRatio" placeholder="选择比例" @change="applyAspectRatio">
                <el-option label="自由剪裁" :value="null" />
                <el-option label="1:1" value="1:1" />
                <el-option label="4:3" value="4:3" />
                <el-option label="16:9" value="16:9" />
                <el-option label="21:9" value="21:9" />
              </el-select>
            </el-form-item>

            <el-divider content-position="left">剪裁区域</el-divider>

            <el-form-item label="X 坐标">
              <el-input-number v-model="cropRect.x" :min="0" :max="imageWidth" @change="updateCanvas" />
            </el-form-item>

            <el-form-item label="Y 坐标">
              <el-input-number v-model="cropRect.y" :min="0" :max="imageHeight" @change="updateCanvas" />
            </el-form-item>

            <el-form-item label="宽度">
              <el-input-number v-model="cropRect.width" :min="10" :max="imageWidth" @change="updateCanvas" />
            </el-form-item>

            <el-form-item label="高度">
              <el-input-number v-model="cropRect.height" :min="10" :max="imageHeight" @change="updateCanvas" />
            </el-form-item>
          </el-form>

          <el-button type="primary" @click="cropImage" style="width: 100%;">
            确认剪裁
          </el-button>
          <el-button type="success" @click="downloadImage" style="width: 100%; margin-top: 8px;" :disabled="!croppedImage">
            下载图片
          </el-button>
        </div>
      </div>

      <div v-if="croppedImage" class="result-section">
        <h3>剪裁结果</h3>
        <img :src="croppedImage" alt="剪裁后图片" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const canvasRef = ref<HTMLCanvasElement>()
const imageUrl = ref('')
const croppedImage = ref('')
const imageWidth = ref(0)
const imageHeight = ref(0)
const aspectRatio = ref<string | null>(null)

const cropRect = ref({
  x: 0,
  y: 0,
  width: 200,
  height: 200
})

const originalImage = ref<HTMLImageElement>()
let isDragging = false
let startX = 0
let startY = 0

const handleFileChange = (file: any) => {
  const rawFile = file.raw
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string
    
    nextTick(() => {
      loadImage()
    })
  }
  reader.readAsDataURL(rawFile)
}

const loadImage = () => {
  const img = new Image()
  img.src = imageUrl.value
  img.onload = () => {
    originalImage.value = img
    imageWidth.value = img.width
    imageHeight.value = img.height
    
    const canvas = canvasRef.value!
    const maxWidth = 800
    const ratio = Math.min(maxWidth / img.width, 1)
    
    canvas.width = img.width * ratio
    canvas.height = img.height * ratio
    
    cropRect.value = {
      x: 50,
      y: 50,
      width: Math.min(200, img.width - 100),
      height: Math.min(200, img.height - 100)
    }
    
    updateCanvas()
  }
}

const updateCanvas = () => {
  if (!canvasRef.value || !originalImage.value) return
  
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')!
  
  const img = originalImage.value
  const ratio = canvas.width / img.width
  
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制原图
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  
  // 绘制半透明遮罩
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 清空剪裁区域
  const x = cropRect.value.x * ratio
  const y = cropRect.value.y * ratio
  const w = cropRect.value.width * ratio
  const h = cropRect.value.height * ratio
  
  ctx.clearRect(x, y, w, h)
  ctx.drawImage(img, 
    cropRect.value.x, cropRect.value.y, cropRect.value.width, cropRect.value.height,
    x, y, w, h
  )
  
  // 绘制剪裁框边框
  ctx.strokeStyle = '#67C23A'
  ctx.lineWidth = 2
  ctx.strokeRect(x, y, w, h)
}

const startCrop = (e: MouseEvent) => {
  isDragging = true
  const rect = canvasRef.value!.getBoundingClientRect()
  startX = e.clientX - rect.left
  startY = e.clientY - rect.top
}

const updateCrop = (e: MouseEvent) => {
  if (!isDragging || !canvasRef.value || !originalImage.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const currentX = e.clientX - rect.left
  const currentY = e.clientY - rect.top
  
  const ratio = canvasRef.value.width / originalImage.value.width
  
  const x = Math.min(startX, currentX) / ratio
  const y = Math.min(startY, currentY) / ratio
  let width = Math.abs(currentX - startX) / ratio
  let height = Math.abs(currentY - startY) / ratio
  
  // 应用宽高比限制
  if (aspectRatio.value) {
    const [ratioW, ratioH] = aspectRatio.value.split(':').map(Number)
    const targetRatio = ratioW / ratioH
    height = width / targetRatio
  }
  
  cropRect.value = {
    x: Math.max(0, Math.min(x, imageWidth.value - width)),
    y: Math.max(0, Math.min(y, imageHeight.value - height)),
    width: Math.min(width, imageWidth.value - cropRect.value.x),
    height: Math.min(height, imageHeight.value - cropRect.value.y)
  }
  
  updateCanvas()
}

const endCrop = () => {
  isDragging = false
}

const applyAspectRatio = () => {
  if (!aspectRatio.value || !originalImage.value) return
  
  const [ratioW, ratioH] = aspectRatio.value.split(':').map(Number)
  const targetRatio = ratioW / ratioH
  
  const newHeight = cropRect.value.width / targetRatio
  
  if (cropRect.value.y + newHeight <= imageHeight.value) {
    cropRect.value.height = newHeight
  } else {
    cropRect.value.height = imageHeight.value - cropRect.value.y
    cropRect.value.width = cropRect.value.height * targetRatio
  }
  
  updateCanvas()
}

const cropImage = () => {
  if (!originalImage.value) return
  
  const canvas = document.createElement('canvas')
  canvas.width = cropRect.value.width
  canvas.height = cropRect.value.height
  
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    originalImage.value,
    cropRect.value.x, cropRect.value.y, cropRect.value.width, cropRect.value.height,
    0, 0, cropRect.value.width, cropRect.value.height
  )
  
  croppedImage.value = canvas.toDataURL('image/png')
  ElMessage.success('剪裁完成')
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = croppedImage.value
  link.download = 'cropped-image.png'
  link.click()
}
</script>

<style scoped>
.crop-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-section {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.crop-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.canvas-container {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-container canvas {
  cursor: crosshair;
  max-width: 100%;
  border-radius: 6px;
}

.controls {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.controls h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.result-section {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
}

.result-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.result-section :deep(.el-image) {
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.result-section :deep(.el-image img) {
  cursor: pointer;
}
</style>
