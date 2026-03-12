<template>
  <div class="page-container">
    <p class="description">颜色选择与格式转换，支持HEX、RGB、HSL等多种格式</p>

    <div class="color-tool-container">
      <!-- 顶部：颜色选择器 + 预览 + 格式 -->
      <div class="top-section" >
        <div class="picker-area">
          <h3>颜色选择器</h3>
          <el-color-picker v-model="currentColor" @change="handleColorChange" show-alpha size="large" />
        </div>
       
        <div class="formats-area">
          <div class="format-item">
            <label>HEX</label>
            <el-input v-model="formats.hex" readonly size="small">
              <template #append>
                <el-button size="small" @click="copyToClipboard(formats.hex)">复制</el-button>
              </template>
            </el-input>
          </div>
          <div class="format-item">
            <label>RGB</label>
            <el-input v-model="formats.rgb" readonly size="small">
              <template #append>
                <el-button size="small" @click="copyToClipboard(formats.rgb)">复制</el-button>
              </template>
            </el-input>
          </div>
          <div class="format-item">
            <label>RGBA</label>
            <el-input v-model="formats.rgba" readonly size="small">
              <template #append>
                <el-button size="small" @click="copyToClipboard(formats.rgba)">复制</el-button>
              </template>
            </el-input>
          </div>
          <div class="format-item">
            <label>HSL</label>
            <el-input v-model="formats.hsl" readonly size="small">
              <template #append>
                <el-button size="small" @click="copyToClipboard(formats.hsl)">复制</el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>

      <!-- 下部：左侧颜色输入，右侧常用颜色和历史 -->
      <div class="bottom-section">
        <!-- 左侧：颜色输入 -->
        <div class="input-section">
          <h3>颜色输入</h3>
          <el-input
            v-model="colorInput"
            placeholder="输入颜色值 (HEX, RGB, RGBA, HSL)"
            @keyup.enter="parseColorInput"
            clearable
          >
            <template #append>
              <el-button @click="parseColorInput">预览</el-button>
            </template>
          </el-input>
          <div class="input-preview" v-if="inputPreviewColor">
            <span>预览：</span>
            <div class="preview-box" :style="{ backgroundColor: inputPreviewColor }"></div>
          </div>
        </div>

        <!-- 右侧：常用颜色和历史 -->
        <div class="colors-section">
          <div class="palette-area">
            <h3>常用颜色</h3>
            <div class="color-palette">
              <div
                v-for="color in commonColors"
                :key="color"
                class="palette-color"
                :style="{ backgroundColor: color }"
                @click="currentColor = color"
              ></div>
            </div>
          </div>
          
          <div class="history-area">
            <h3>历史记录</h3>
            <div class="color-history">
              <div
                v-for="(color, index) in colorHistory"
                :key="index"
                class="history-color"
                :style="{ backgroundColor: color }"
                @click="currentColor = color"
              ></div>
              <el-empty v-if="colorHistory.length === 0" description="暂无历史记录" :image-size="40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

interface ColorFormats {
  hex: string
  rgb: string
  rgba: string
  hsl: string
}

const currentColor = ref('#409EFF')
const colorInput = ref('')
const inputPreviewColor = ref('')
const colorHistory = ref<string[]>([])

const formats = reactive<ColorFormats>({
  hex: '#409EFF',
  rgb: 'rgb(64, 158, 255)',
  rgba: 'rgba(64, 158, 255, 1)',
  hsl: 'hsl(217, 100%, 63%)'
})

const commonColors = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF',
  '#FFC0CB', '#FF69B4', '#DC143C', '#B22222', '#8B0000', '#FFD700', '#FFA500',
  '#F0E68C', '#90EE90', '#00FA9A', '#00CED1', '#1E90FF', '#4169E1', '#8A2BE2',
  '#FF1493', '#000000', '#2F4F4F', '#696969', '#808080', '#A9A9A9', '#D3D3D3',
  '#DCDCDC', '#F5F5F5', '#FFFFFF', '#FFF5EE', '#FAEBD7', '#FFE4C4', '#FFDAB9'
]

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const updateFormats = (color: string) => {
  // 提取 HEX 值
  let hex = color
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    const matches = color.match(/\d+/g)
    if (matches && matches.length >= 3) {
      hex = '#' + matches.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('')
    }
  }
  
  formats.hex = hex.toUpperCase()
  
  const rgb = hexToRgb(hex)
  if (rgb) {
    formats.rgb = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    formats.rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    formats.hsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  }
}

const parseColorInput = () => {
  const input = colorInput.value.trim()
  
  if (!input) {
    ElMessage.warning('请输入颜色值')
    return
  }

  let validColor = ''
  
  // 尝试解析不同格式的颜色
  try {
    // HEX 格式
    if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(input)) {
      let hex = input.startsWith('#') ? input : '#' + input
      if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
      }
      validColor = hex
    }
    // RGB 格式
    else if (/^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(input)) {
      validColor = input
    }
    // RGBA 格式
    else if (/^rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/i.test(input)) {
      validColor = input
    }
    // HSL 格式
    else if (/^hsl\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i.test(input)) {
      validColor = input
    }
    // 颜色名称
    else {
      const ctx = document.createElement('canvas').getContext('2d')
      if (ctx) {
        ctx.fillStyle = input
        validColor = ctx.fillStyle
      }
    }
    
    if (validColor) {
      inputPreviewColor.value = validColor
      currentColor.value = validColor
      ElMessage.success('颜色格式有效')
    } else {
      ElMessage.error('无法识别的颜色格式')
    }
  } catch (error) {
    ElMessage.error('颜色格式无效')
  }
}

const handleColorChange = (color: string) => {
  updateFormats(color)
  
  if (!colorHistory.value.includes(color)) {
    colorHistory.value.unshift(color)
    if (colorHistory.value.length > 20) {
      colorHistory.value.pop()
    }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

watch(currentColor, (newColor) => {
  updateFormats(newColor)
}, { immediate: true })
</script>

<style scoped>
.color-tool-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 顶部区域：选择器 + 预览 + 格式 */
.top-section {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  transition: background-color 0.3s ease;
}

.picker-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.picker-area h3 {
  margin: 0;
  font-size: 14px;
  color: var(--text-color);
  padding: 4px 8px;
  border-radius: 4px; 
}
 
.formats-area {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.format-item label {
  display: block;
  font-size: 12px;
  color: var(--text-color);
  margin-bottom: 4px;
  font-weight: 500;
}

/* 下部区域：左侧输入，右侧颜色 */
.bottom-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

/* 颜色输入 */
.input-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.input-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.input-preview {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-color);
}

.preview-box {
  width: 60px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 右侧颜色区域 */
.colors-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.palette-area,
.history-area {
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.palette-area h3,
.history-area h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-color);
}

.color-palette,
.color-history {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.palette-color,
.history-color {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid var(--glass-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.palette-color:hover,
.history-color:hover {
  transform: scale(1.15);
}
</style>
