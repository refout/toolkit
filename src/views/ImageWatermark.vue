<template>
  <div class="page-container">
    <p class="description">上传图片，添加自定义水印，支持预览和下载</p>

    <el-upload
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleFileChange"
      accept="image/*"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽图片到此处或<em>点击上传</em>
      </div>
    </el-upload>

    <div v-if="originalImage" class="watermark-settings">
      <h3>水印设置</h3>
      <el-form :model="watermarkConfig" label-width="100px">
        <el-form-item label="水印文字">
          <el-input v-model="watermarkConfig.text" placeholder="请输入水印文字" />
        </el-form-item>
        <el-form-item label="字体大小">
          <el-slider v-model="watermarkConfig.fontSize" :min="12" :max="100" show-input />
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="watermarkConfig.opacity" :min="0" :max="1" :step="0.1" show-input />
        </el-form-item>
        <el-form-item label="旋转角度">
          <el-slider v-model="watermarkConfig.rotate" :min="-180" :max="180" show-input />
        </el-form-item>
        <el-form-item label="水印颜色">
          <el-color-picker v-model="watermarkConfig.color" />
        </el-form-item>
        <el-form-item label="平铺模式">
          <el-switch v-model="watermarkConfig.tile" />
        </el-form-item>
        <el-form-item v-if="!watermarkConfig.tile" label="位置">
          <el-select v-model="watermarkConfig.position">
            <el-option label="左上" value="top-left" />
            <el-option label="右上" value="top-right" />
            <el-option label="左下" value="bottom-left" />
            <el-option label="右下" value="bottom-right" />
            <el-option label="居中" value="center" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyWatermark">应用水印</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="originalImage || watermarkedImage" class="preview-section">
      <h3>预览对比</h3>
      <div class="preview-container">
        <div v-if="originalImage" class="preview-item">
          <h4>原图</h4>
          <img :src="originalImage" alt="原图" />
        </div>
        <div v-if="watermarkedImage" class="preview-item">
          <h4>水印图</h4>
          <img :src="watermarkedImage" alt="水印图" />
          <div class="preview-actions">
            <el-button type="primary" @click="downloadImage">
              <el-icon><Download /></el-icon>
              下载图片
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

interface WatermarkConfig {
  text: string
  fontSize: number
  opacity: number
  rotate: number
  color: string
  tile: boolean
  position: string
}

const originalImage = ref<string>('')
const watermarkedImage = ref<string>('')
const imageFile = ref<File | null>(null)

const watermarkConfig = reactive<WatermarkConfig>({
  text: '水印文字',
  fontSize: 24,
  opacity: 0.5,
  rotate: -30,
  color: '#ffffff',
  tile: true,
  position: 'center'
})

const handleFileChange = (file: any) => {
  imageFile.value = file.raw
  originalImage.value = URL.createObjectURL(file.raw)
  watermarkedImage.value = ''
}

const applyWatermark = () => {
  if (!originalImage.value || !imageFile.value) return

  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    
    canvas.width = img.width
    canvas.height = img.height
    
    // 绘制原图
    ctx.drawImage(img, 0, 0)
    
    // 设置水印样式
    ctx.font = `${watermarkConfig.fontSize}px Arial`
    ctx.fillStyle = watermarkConfig.color
    ctx.globalAlpha = watermarkConfig.opacity
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    if (watermarkConfig.tile) {
      // 平铺模式
      const gap = 150
      ctx.rotate((watermarkConfig.rotate * Math.PI) / 180)
      
      for (let y = -canvas.height; y < canvas.height * 2; y += gap) {
        for (let x = -canvas.width; x < canvas.width * 2; x += gap) {
          ctx.fillText(watermarkConfig.text, x, y)
        }
      }
    } else {
      // 单个水印
      let x = 0, y = 0
      const padding = 50
      
      switch (watermarkConfig.position) {
        case 'top-left':
          x = padding + watermarkConfig.fontSize
          y = padding + watermarkConfig.fontSize
          break
        case 'top-right':
          x = canvas.width - padding - watermarkConfig.fontSize
          y = padding + watermarkConfig.fontSize
          break
        case 'bottom-left':
          x = padding + watermarkConfig.fontSize
          y = canvas.height - padding - watermarkConfig.fontSize
          break
        case 'bottom-right':
          x = canvas.width - padding - watermarkConfig.fontSize
          y = canvas.height - padding - watermarkConfig.fontSize
          break
        case 'center':
          x = canvas.width / 2
          y = canvas.height / 2
          break
      }
      
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((watermarkConfig.rotate * Math.PI) / 180)
      ctx.fillText(watermarkConfig.text, 0, 0)
      ctx.restore()
    }
    
    watermarkedImage.value = canvas.toDataURL('image/png')
    ElMessage.success('水印添加成功')
  }
  
  img.src = originalImage.value
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.download = `watermarked-${Date.now()}.png`
  link.href = watermarkedImage.value
  link.click()
}
</script>

<style scoped>
.watermark-settings {
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

.preview-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.preview-item {
  flex: 1;
  text-align: center;
}

.preview-item h4 {
  margin-bottom: 12px;
  color: var(--text-color);
}

.preview-item img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.preview-actions {
  margin-top: 16px;
}
</style>
