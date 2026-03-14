<template>
  <div class="page-container">
    <p class="description">生成安全的随机密码，支持自定义长度和字符类型</p>

    <div class="generator-container">
      <div class="settings-section">
        <h3>密码设置</h3>
        
        <el-form label-width="120px">
          <el-form-item label="密码长度" class="length-item">
            <el-slider
              v-model="passwordLength"
              :min="6"
              :max="64"
              :format-tooltip="(val: number) => val + ' 位'"
            />
            <el-input-number
              v-model="passwordLength"
              :min="6"
              :max="64"
              class="length-input"
            />
          </el-form-item>

          <div class="inline-form-items">
            <el-form-item label="字符类型" class="char-types-item">
              <el-checkbox-group v-model="charTypes">
                <el-checkbox label="uppercase">大写字母 (A-Z)</el-checkbox>
                <el-checkbox label="lowercase">小写字母 (a-z)</el-checkbox>
                <el-checkbox label="numbers">数字 (0-9)</el-checkbox>
                <el-checkbox label="symbols">特殊符号 (!@#$%^&*)</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="排除相似字符" class="exclude-item">
              <el-switch v-model="excludeSimilar" />
              <span class="hint">排除 0O1lI 等容易混淆的字符</span>
            </el-form-item>

            <el-form-item label="生成数量" class="count-item">
              <el-input-number v-model="generateCount" :min="1" :max="20" />
            </el-form-item>
          </div>
        </el-form>

        <el-button type="primary" size="large" @click="generatePasswords" style="width: 100%;">
          <el-icon><Refresh /></el-icon>
          生成密码
        </el-button>
      </div>

      <div class="result-section">
        <div class="result-header">
          <h3>生成的密码</h3>
          <el-button type="success" @click="copyAllPasswords" :disabled="passwords.length === 0">
            <el-icon><CopyDocument /></el-icon>
            复制全部
          </el-button>
        </div>

        <div v-if="passwords.length > 0" class="passwords-list">
          <div v-for="(pwd, index) in passwords" :key="index" class="password-item">
            <div class="password-text">
              <span class="index">{{ index + 1 }}.</span>
              <code class="password">{{ pwd }}</code>
            </div>
            <div class="password-actions">
              <el-button size="small" @click="copyPassword(pwd)">
                <el-icon><CopyDocument /></el-icon>
              </el-button>
              <el-button size="small" type="danger" @click="removePassword(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        
        <el-empty v-else description="点击上方按钮生成密码" :image-size="100" />
      </div>

      <div class="strength-section">
        <h3>密码强度检测</h3>
        <el-input
          v-model="testPassword"
          placeholder="输入密码测试强度"
          show-password
          @input="checkStrength"
        />
        <div v-if="testPassword" class="strength-result">
          <el-progress
            :percentage="strengthScore"
            :color="strengthColor"
            :stroke-width="12"
          />
          <div class="strength-info">
            <span class="strength-label" :style="{ color: strengthColor }">
              {{ strengthLabel }}
            </span>
            <span class="strength-details">{{ strengthDetails }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Refresh, CopyDocument, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const passwordLength = ref(8)
const charTypes = ref(['uppercase', 'lowercase', 'numbers', 'symbols'])
const excludeSimilar = ref(true)
const generateCount = ref(5)
const passwords = ref<string[]>([])

const testPassword = ref('')
const strengthScore = ref(0)

const charSets = {
  uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lowercase: 'abcdefghjkmnpqrstuvwxyz',
  numbers: '23456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}

const similarChars = '0O1lI'

const generatePasswords = () => {
  if (charTypes.value.length === 0) {
    ElMessage.warning('请至少选择一种字符类型')
    return
  }

  passwords.value = []
  
  for (let i = 0; i < generateCount.value; i++) {
    const password = generateSinglePassword()
    passwords.value.push(password)
  }
  
  ElMessage.success(`已生成 ${generateCount.value} 个密码`)
}

const generateSinglePassword = (): string => {
  let chars = ''
  
  charTypes.value.forEach(type => {
    let charSet = charSets[type as keyof typeof charSets]
    if (excludeSimilar.value) {
      charSet = charSet.split('').filter(c => !similarChars.includes(c)).join('')
    }
    chars += charSet
  })
  
  if (chars.length === 0) return ''
  
  let password = ''
  const array = new Uint32Array(passwordLength.value)
  crypto.getRandomValues(array)
  
  for (let i = 0; i < passwordLength.value; i++) {
    password += chars[array[i] % chars.length]
  }
  
  return password
}

const copyPassword = async (password: string) => {
  try {
    await navigator.clipboard.writeText(password)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const copyAllPasswords = async () => {
  try {
    const text = passwords.value.join('\n')
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制全部密码到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const removePassword = (index: number) => {
  passwords.value.splice(index, 1)
}

const checkStrength = () => {
  if (!testPassword.value) {
    strengthScore.value = 0
    return
  }
  
  let score = 0
  const pwd = testPassword.value
  
  // 长度评分
  if (pwd.length >= 8) score += 20
  if (pwd.length >= 12) score += 20
  if (pwd.length >= 16) score += 10
  
  // 字符类型评分
  if (/[a-z]/.test(pwd)) score += 10
  if (/[A-Z]/.test(pwd)) score += 10
  if (/[0-9]/.test(pwd)) score += 10
  if (/[^a-zA-Z0-9]/.test(pwd)) score += 20
  
  // 复杂度评分
  const uniqueChars = new Set(pwd.split('')).size
  if (uniqueChars >= pwd.length * 0.7) score += 10
  
  strengthScore.value = Math.min(100, score)
}

const strengthColor = computed(() => {
  if (strengthScore.value < 40) return '#f56c6c'
  if (strengthScore.value < 70) return '#e6a23c'
  return '#67c23a'
})

const strengthLabel = computed(() => {
  if (strengthScore.value < 40) return '弱'
  if (strengthScore.value < 70) return '中等'
  if (strengthScore.value < 90) return '强'
  return '非常强'
})

const strengthDetails = computed(() => {
  const pwd = testPassword.value
  const details: string[] = []
  
  if (pwd.length < 8) details.push('长度不足8位')
  if (pwd.length >= 16) details.push('长度充足')
  if (!/[a-z]/.test(pwd)) details.push('缺少小写字母')
  if (!/[A-Z]/.test(pwd)) details.push('缺少大写字母')
  if (!/[0-9]/.test(pwd)) details.push('缺少数字')
  if (!/[^a-zA-Z0-9]/.test(pwd)) details.push('缺少特殊字符')
  
  return details.length > 0 ? details.join('，') : '密码强度良好'
})
</script>

<style scoped>
.generator-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-section,
.strength-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.result-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  max-height: 420px;
  display: flex;
  flex-direction: column;
}

.settings-section h3,
.result-section h3,
.strength-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.inline-form-items {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.char-types-item {
  flex: 0 0 auto;
  min-width: auto;
  max-width: 100%;
}

.char-types-item :deep(.el-checkbox-group) {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 16px;
  width: fit-content;
}

.char-types-item :deep(.el-checkbox) {
  margin-right: 0 !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.exclude-item {
  flex-shrink: 0;
  min-width: 200px;
}

.count-item {
  flex-shrink: 0;
  min-width: 150px;
}

.length-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.length-item :deep(.el-slider) {
  flex: 1;
  min-width: 0;
}

.hint {
  margin-left: 8px;
  font-size: 12px;
  color: #909399;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-header h3 {
  margin: 0;
}

.passwords-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
}

.password-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  background: var(--bg-color);
}

.password-text {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.index {
  font-size: 12px;
  color: #909399;
  min-width: 24px;
}

.password {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--text-color);
  background: transparent;
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;
}

.password-actions {
  display: flex;
  gap: 4px;
}

.strength-result {
  margin-top: 12px;
}

.strength-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.strength-label {
  font-weight: 500;
  font-size: 14px;
}

.strength-details {
  font-size: 12px;
  color: #909399;
}

.length-input {
  width: 100px;
  margin-left: 12px;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .length-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .length-item :deep(.el-slider) {
    width: 100% !important;
  }
  
  .length-item :deep(.el-slider__runway) {
    width: 100% !important;
  }
  
  .length-item :deep(.el-slider__button-wrapper) {
    display: none !important;
  }
  
  .length-item :deep(.el-slider__input-wrapper) {
    display: none !important;
  }
  
  .length-input {
    width: 100% !important;
    margin-left: 0 !important;
    margin-top: 12px;
  }
  
  .inline-form-items {
    flex-direction: column;
  }
  
  .char-types-item {
    max-width: 100%;
  }
  
  .char-types-item :deep(.el-checkbox-group) {
    flex-wrap: wrap !important;
  }
  
  .char-types-item :deep(.el-checkbox) {
    flex-shrink: 1 !important;
  }
  
  .exclude-item,
  .count-item {
    min-width: auto;
    width: 100%;
  }
}
</style>
