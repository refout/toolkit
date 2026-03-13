<template>
  <div class="page-container">
    <p class="description">生成占位文本（Lorem Ipsum），用于设计、排版测试等场景</p>

    <div class="lorem-container">
      <div class="settings-section">
        <h3>生成设置</h3>
        
        <el-form :model="config" label-width="120px">
          <el-form-item label="文本类型">
            <el-radio-group v-model="config.type">
              <el-radio label="chinese">中文</el-radio>
              <el-radio label="english">英文</el-radio>
              <el-radio label="mixed">中英混合</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="生成单位">
            <el-radio-group v-model="config.unit">
              <el-radio label="paragraph">段落</el-radio>
              <el-radio label="sentence">句子</el-radio>
              <el-radio label="word">字/词</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="数量">
            <el-input-number v-model="config.count" :min="1" :max="100" />
            <span class="unit-label">
              {{ config.unit === 'paragraph' ? '段' : config.unit === 'sentence' ? '句' : '个' }}
            </span>
          </el-form-item>

          <el-form-item v-if="config.unit === 'paragraph'" label="每段字数">
            <el-slider
              v-model="config.wordsPerParagraph"
              :min="50"
              :max="500"
              :format-tooltip="(val: number) => val + ' 字'"
            />
          </el-form-item>

          <el-form-item v-if="config.unit === 'sentence'" label="每句字数">
            <el-slider
              v-model="config.wordsPerSentence"
              :min="10"
              :max="100"
              :format-tooltip="(val: number) => val + ' 字'"
            />
          </el-form-item>

          <el-form-item label="以经典开头">
            <el-switch 
              v-model="config.startWithClassic"
              :disabled="config.type !== 'english'"
            />
            <span class="hint" v-if="config.type !== 'english'">仅英文支持</span>
          </el-form-item>

          <el-form-item label="添加标点">
            <el-switch v-model="config.addPunctuation" />
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" @click="generateText" style="width: 100%;">
          <el-icon><Refresh /></el-icon>
          生成文本
        </el-button>
      </div>

      <div class="result-section">
        <div class="result-header">
          <h3>生成结果</h3>
          <div class="header-actions">
            <el-tag>{{ statistics }}</el-tag>
            <el-button type="primary" @click="copyText" :disabled="!generatedText">
              <el-icon><CopyDocument /></el-icon>
              复制
            </el-button>
            <el-button @click="clearText" :disabled="!generatedText">
              <el-icon><Delete /></el-icon>
              清空
            </el-button>
          </div>
        </div>

        <el-input
          v-model="generatedText"
          type="textarea"
          :rows="15"
          readonly
          placeholder="点击上方按钮生成占位文本"
          class="result-textarea"
        />

        <div v-if="generatedText" class="quick-actions">
          <el-button-group>
            <el-button size="small" @click="generateText">重新生成</el-button>
            <el-button size="small" @click="appendText">追加生成</el-button>
          </el-button-group>
        </div>
      </div>

      <div class="presets-section">
        <h3>快速预设</h3>
        <div class="presets-grid">
          <el-button @click="applyPreset('short')">短文本 (1段)</el-button>
          <el-button @click="applyPreset('medium')">中等文本 (3段)</el-button>
          <el-button @click="applyPreset('long')">长文本 (5段)</el-button>
          <el-button @click="applyPreset('article')">文章 (10段)</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Refresh, CopyDocument, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const config = ref({
  type: 'chinese',
  unit: 'paragraph',
  count: 3,
  wordsPerParagraph: 200,
  wordsPerSentence: 20,
  startWithClassic: true,
  addPunctuation: true
})

const generatedText = ref('')

// 中文词库
const chineseWords = [
  '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个',
  '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好',
  '自己', '这', '那', '什么', '他', '她', '它', '们', '这个', '那个', '可以',
  '时间', '时候', '地方', '东西', '问题', '工作', '生活', '感觉', '觉得',
  '因为', '所以', '但是', '如果', '虽然', '还是', '或者', '而且', '然后',
  '开始', '结束', '知道', '认为', '希望', '需要', '应该', '可能', '已经',
  '通过', '关于', '对于', '根据', '随着', '为了', '能够', '以及', '或者',
  '起来', '出来', '下去', '上来', '进来', '回来', '过来', '进去', '出去'
]

// 英文经典开头
const classicStart = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '

// 英文词库
const englishWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also'
]

const generateChineseSentence = (wordCount: number): string => {
  const words: string[] = []
  for (let i = 0; i < wordCount; i++) {
    words.push(chineseWords[Math.floor(Math.random() * chineseWords.length)])
  }
  return words.join('')
}

const generateEnglishSentence = (wordCount: number): string => {
  const words: string[] = []
  for (let i = 0; i < wordCount; i++) {
    words.push(englishWords[Math.floor(Math.random() * englishWords.length)])
  }
  
  // 首字母大写
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }
  
  return words.join(' ')
}

const generateMixedSentence = (wordCount: number): string => {
  const chineseCount = Math.floor(wordCount * 0.6)
  const englishCount = wordCount - chineseCount
  
  const chinesePart = generateChineseSentence(chineseCount)
  const englishPart = generateEnglishSentence(englishCount)
  
  return Math.random() > 0.5 ? `${chinesePart}${englishPart}` : `${englishPart}${chinesePart}`
}

const addPunctuationToSentence = (sentence: string, isLast: boolean): string => {
  if (!config.value.addPunctuation) return sentence
  
  const punctuations = ['。', '！', '？', '；']
  const randomPunc = punctuations[Math.floor(Math.random() * punctuations.length)]
  
  if (config.value.type === 'english') {
    return sentence + (isLast ? '.' : (Math.random() > 0.7 ? '!' : '.'))
  }
  
  return sentence + randomPunc
}

const generateParagraph = (): string => {
  const sentences: string[] = []
  const sentenceCount = Math.floor(config.value.wordsPerParagraph / config.value.wordsPerSentence)
  
  for (let i = 0; i < sentenceCount; i++) {
    let sentence = ''
    
    if (config.value.type === 'chinese') {
      sentence = generateChineseSentence(config.value.wordsPerSentence)
    } else if (config.value.type === 'english') {
      sentence = generateEnglishSentence(config.value.wordsPerSentence)
    } else {
      sentence = generateMixedSentence(config.value.wordsPerSentence)
    }
    
    sentence = addPunctuationToSentence(sentence, i === sentenceCount - 1)
    sentences.push(sentence)
  }
  
  return sentences.join('')
}

const generateText = () => {
  let result: string[] = []
  
  if (config.value.unit === 'paragraph') {
    for (let i = 0; i < config.value.count; i++) {
      let paragraph = generateParagraph()
      
      // 如果是英文且第一段，添加经典开头
      if (i === 0 && config.value.type === 'english' && config.value.startWithClassic) {
        paragraph = classicStart + paragraph
      }
      
      result.push(paragraph)
    }
  } else if (config.value.unit === 'sentence') {
    for (let i = 0; i < config.value.count; i++) {
      let sentence = ''
      
      if (config.value.type === 'chinese') {
        sentence = generateChineseSentence(config.value.wordsPerSentence)
      } else if (config.value.type === 'english') {
        sentence = generateEnglishSentence(config.value.wordsPerSentence)
      } else {
        sentence = generateMixedSentence(config.value.wordsPerSentence)
      }
      
      sentence = addPunctuationToSentence(sentence, i === config.value.count - 1)
      result.push(sentence)
    }
  } else {
    for (let i = 0; i < config.value.count; i++) {
      if (config.value.type === 'chinese') {
        result.push(chineseWords[Math.floor(Math.random() * chineseWords.length)])
      } else if (config.value.type === 'english') {
        result.push(englishWords[Math.floor(Math.random() * englishWords.length)])
      } else {
        result.push(Math.random() > 0.5 
          ? chineseWords[Math.floor(Math.random() * chineseWords.length)]
          : englishWords[Math.floor(Math.random() * englishWords.length)]
        )
      }
    }
  }
  
  generatedText.value = result.join(config.value.unit === 'paragraph' ? '\n\n' : config.value.unit === 'sentence' ? ' ' : '')
  ElMessage.success('生成成功')
}

const appendText = () => {
  const oldText = generatedText.value
  generateText()
  generatedText.value = oldText + '\n\n' + generatedText.value
  ElMessage.success('已追加')
}

const copyText = async () => {
  if (!generatedText.value) return
  
  try {
    await navigator.clipboard.writeText(generatedText.value)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const clearText = () => {
  generatedText.value = ''
}

const applyPreset = (preset: string) => {
  const presets: Record<string, any> = {
    short: { count: 1, unit: 'paragraph', wordsPerParagraph: 150 },
    medium: { count: 3, unit: 'paragraph', wordsPerParagraph: 200 },
    long: { count: 5, unit: 'paragraph', wordsPerParagraph: 250 },
    article: { count: 10, unit: 'paragraph', wordsPerParagraph: 300 }
  }
  
  const presetConfig = presets[preset]
  if (presetConfig) {
    config.value = { ...config.value, ...presetConfig }
    generateText()
  }
}

const statistics = computed(() => {
  if (!generatedText.value) return '0 字'
  
  const charCount = generatedText.value.length
  const wordCount = generatedText.value.split(/\s+/).filter(w => w).length
  const lineCount = generatedText.value.split('\n').filter(l => l.trim()).length
  
  return `${charCount} 字 | ${wordCount} 词 | ${lineCount} 行`
})
</script>

<style scoped>
.lorem-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-section,
.result-section,
.presets-section {
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
}

.settings-section h3,
.result-section h3,
.presets-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-color);
}

.unit-label {
  margin-left: 8px;
  font-size: 13px;
  color: var(--text-color);
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

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.result-textarea {
  font-family: inherit;
}

.result-textarea :deep(textarea) {
  font-size: 14px;
  line-height: 1.8;
}

.quick-actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .presets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
