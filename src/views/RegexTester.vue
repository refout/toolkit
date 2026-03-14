<template>
  <div class="page-container">
    <p class="description">正则表达式在线测试工具，支持实时验证、常用正则表达式和学习资料</p>

    <el-tabs v-model="activeTab" class="regex-tabs">
      <!-- 测试区域 -->
      <el-tab-pane label="正则测试" name="test">
        <div class="input-group">
          <el-input v-model="regexPattern" placeholder="输入正则表达式，例如：\d+" @input="testRegex">
            <template #prepend>
              <span>/</span>
            </template>
            <template #append>
              <div class="flags-input">
                <el-checkbox-group v-model="flags" @change="testRegex">
                  <el-tooltip content="全局匹配" placement="top">
                    <el-checkbox-button label="g">g</el-checkbox-button>
                  </el-tooltip>
                  <el-tooltip content="忽略大小写" placement="top">
                    <el-checkbox-button label="i">i</el-checkbox-button>
                  </el-tooltip>
                  <el-tooltip content="多行模式" placement="top">
                    <el-checkbox-button label="m">m</el-checkbox-button>
                  </el-tooltip>
                  <el-tooltip content="单行模式" placement="top">
                    <el-checkbox-button label="s">s</el-checkbox-button>
                  </el-tooltip>
                </el-checkbox-group>
              </div>
            </template>
          </el-input>
        </div>

        <div v-if="regexError" class="error-message">
          <el-alert type="error" :closable="false">
            {{ regexError }}
          </el-alert>
        </div>

        <div class="test-input">
          <el-input v-model="testString" type="textarea" :rows="6" placeholder="输入测试文本" @input="testRegex" />
        </div>

        <div class="result-display">
          <div class="result-header">
            <span>匹配结果</span>
            <el-tag v-if="matches.length > 0">{{ matches.length }} 个匹配</el-tag>
            <el-tag v-else type="info">无匹配</el-tag>
          </div>
          <div class="result-content" v-html="highlightedText"></div>
        </div>

        <div v-if="matches.length > 0" class="match-details">
          <h4>匹配详情</h4>
          <el-table :data="matchDetails" stripe max-height="200">
            <el-table-column prop="index" label="#" width="60" />
            <el-table-column prop="match" label="匹配内容" />
            <el-table-column prop="start" label="起始位置" width="100" />
            <el-table-column prop="end" label="结束位置" width="100" />
          </el-table>
        </div>
      </el-tab-pane>

      <!-- 常用正则表达式 -->
      <el-tab-pane label="常用正则" name="patterns">
        <el-input v-model="searchPattern" placeholder="搜索正则表达式" clearable style="margin-bottom: 16px">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>

        <div class="patterns-list">
          <div v-for="pattern in filteredPatterns" :key="pattern.name" class="pattern-item"
            @click="usePattern(pattern)">
            <div class="pattern-header">
              <span class="pattern-name">{{ pattern.name }}</span>
              <el-tag size="small">{{ pattern.category }}</el-tag>
            </div>
            <code class="pattern-code">{{ pattern.regex }}</code>
            <p class="pattern-desc">{{ pattern.description }}</p>
          </div>
        </div>
      </el-tab-pane>

      <!-- 学习资料 -->
      <el-tab-pane label="学习资料" name="tutorial">
        <el-collapse accordion>
          <el-collapse-item title="基本语法" name="basic">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>符号</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>.</code></td>
                    <td>匹配任意单个字符（除换行符）</td>
                    <td><code>a.c</code> 匹配 "abc"、"adc"</td>
                  </tr>
                  <tr>
                    <td><code>\d</code></td>
                    <td>匹配数字，等价于 [0-9]</td>
                    <td><code>\d+</code> 匹配 "123"</td>
                  </tr>
                  <tr>
                    <td><code>\D</code></td>
                    <td>匹配非数字字符</td>
                    <td><code>\D+</code> 匹配 "abc"</td>
                  </tr>
                  <tr>
                    <td><code>\w</code></td>
                    <td>匹配字母、数字、下划线</td>
                    <td><code>\w+</code> 匹配 "abc_123"</td>
                  </tr>
                  <tr>
                    <td><code>\W</code></td>
                    <td>匹配非字母、数字、下划线</td>
                    <td><code>\W+</code> 匹配 "!@#"</td>
                  </tr>
                  <tr>
                    <td><code>\s</code></td>
                    <td>匹配空白字符</td>
                    <td><code>\s+</code> 匹配空格、制表符</td>
                  </tr>
                  <tr>
                    <td><code>\S</code></td>
                    <td>匹配非空白字符</td>
                    <td><code>\S+</code> 匹配 "abc"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>

          <el-collapse-item title="量词" name="quantifier">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>符号</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>*</code></td>
                    <td>匹配前一项 0 次或多次</td>
                    <td><code>ab*c</code> 匹配 "ac"、"abc"、"abbc"</td>
                  </tr>
                  <tr>
                    <td><code>+</code></td>
                    <td>匹配前一项 1 次或多次</td>
                    <td><code>ab+c</code> 匹配 "abc"、"abbc"</td>
                  </tr>
                  <tr>
                    <td><code>?</code></td>
                    <td>匹配前一项 0 次或 1 次</td>
                    <td><code>ab?c</code> 匹配 "ac"、"abc"</td>
                  </tr>
                  <tr>
                    <td><code>{n}</code></td>
                    <td>匹配前一项恰好 n 次</td>
                    <td><code>a{3}</code> 匹配 "aaa"</td>
                  </tr>
                  <tr>
                    <td><code>{n,}</code></td>
                    <td>匹配前一项至少 n 次</td>
                    <td><code>a{2,}</code> 匹配 "aa"、"aaa"...</td>
                  </tr>
                  <tr>
                    <td><code>{n,m}</code></td>
                    <td>匹配前一项 n 到 m 次</td>
                    <td><code>a{2,4}</code> 匹配 "aa"、"aaa"、"aaaa"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>

          <el-collapse-item title="定位符" name="anchor">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>符号</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>^</code></td>
                    <td>匹配字符串开头</td>
                    <td><code>^Hello</code> 匹配开头的 "Hello"</td>
                  </tr>
                  <tr>
                    <td><code>$</code></td>
                    <td>匹配字符串结尾</td>
                    <td><code>world$</code> 匹配结尾的 "world"</td>
                  </tr>
                  <tr>
                    <td><code>\b</code></td>
                    <td>匹配单词边界</td>
                    <td><code>\bword\b</code> 匹配独立单词</td>
                  </tr>
                  <tr>
                    <td><code>\B</code></td>
                    <td>匹配非单词边界</td>
                    <td><code>\Bword</code> 匹配非边界位置</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>

          <el-collapse-item title="分组与引用" name="group">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>符号</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>(...)</code></td>
                    <td>捕获分组</td>
                    <td><code>(ab)+</code> 匹配 "abab"</td>
                  </tr>
                  <tr>
                    <td><code>(?:...)</code></td>
                    <td>非捕获分组</td>
                    <td><code>(?:ab)+</code> 不捕获分组</td>
                  </tr>
                  <tr>
                    <td><code>\n</code></td>
                    <td>引用第 n 个分组</td>
                    <td><code>(\w)\1</code> 匹配重复字符</td>
                  </tr>
                  <tr>
                    <td><code>(?=...)</code></td>
                    <td>正向先行断言</td>
                    <td><code>\d(?=px)</code> 匹配后跟 "px" 的数字</td>
                  </tr>
                  <tr>
                    <td><code>(?!...)</code></td>
                    <td>负向先行断言</td>
                    <td><code>\d(?!px)</code> 匹配不跟 "px" 的数字</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>

          <el-collapse-item title="字符类" name="charclass">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>符号</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>[...]</code></td>
                    <td>匹配方括号中的任意字符</td>
                    <td><code>[abc]</code> 匹配 "a" 或 "b" 或 "c"</td>
                  </tr>
                  <tr>
                    <td><code>[^...]</code></td>
                    <td>匹配不在方括号中的字符</td>
                    <td><code>[^abc]</code> 匹配非 "a"、"b"、"c"</td>
                  </tr>
                  <tr>
                    <td><code>[a-z]</code></td>
                    <td>匹配小写字母范围</td>
                    <td><code>[a-z]+</code> 匹配 "hello"</td>
                  </tr>
                  <tr>
                    <td><code>[A-Z]</code></td>
                    <td>匹配大写字母范围</td>
                    <td><code>[A-Z]+</code> 匹配 "HELLO"</td>
                  </tr>
                  <tr>
                    <td><code>[0-9]</code></td>
                    <td>匹配数字范围</td>
                    <td><code>[0-9]+</code> 匹配 "123"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>

          <el-collapse-item title="修饰符" name="flags">
            <div class="tutorial-content">
              <table class="syntax-table">
                <thead>
                  <tr>
                    <th>修饰符</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>g</code></td>
                    <td>全局匹配，查找所有匹配</td>
                    <td><code>/abc/g</code> 匹配所有 "abc"</td>
                  </tr>
                  <tr>
                    <td><code>i</code></td>
                    <td>忽略大小写</td>
                    <td><code>/abc/i</code> 匹配 "ABC"、"abc"</td>
                  </tr>
                  <tr>
                    <td><code>m</code></td>
                    <td>多行模式</td>
                    <td><code>^abc$m</code> 多行匹配</td>
                  </tr>
                  <tr>
                    <td><code>s</code></td>
                    <td>让 . 匹配包括换行符</td>
                    <td><code>/a.b/s</code> 匹配 "a\nb"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('test')
const regexPattern = ref('')
const testString = ref('')
const flags = ref(['g'])
const matches = ref<RegExpMatchArray[]>([])
const regexError = ref('')
const searchPattern = ref('')

interface Pattern {
  name: string
  category: string
  regex: string
  description: string
}

const commonPatterns: Pattern[] = [
  // 中国相关
  { name: '手机号码', category: '中国', regex: '^1[3-9]\\d{9}$', description: '匹配中国大陆手机号码' },
  { name: '身份证号', category: '中国', regex: '^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$', description: '匹配18位身份证号码' },
  { name: '邮政编码', category: '中国', regex: '^[1-9]\\d{5}$', description: '匹配中国邮政编码' },
  { name: '车牌号', category: '中国', regex: '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$', description: '匹配中国车牌号' },
  { name: 'QQ号', category: '中国', regex: '^[1-9][0-9]{4,10}$', description: '匹配QQ号码' },

  // 互联网
  { name: '邮箱地址', category: '互联网', regex: '^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$', description: '匹配电子邮件地址' },
  { name: '网址', category: '互联网', regex: '^https?://[\\w-]+(\\.[\\w-]+)+[/#?]?.*$', description: '匹配HTTP/HTTPS网址' },
  { name: 'IP地址', category: '互联网', regex: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$', description: '匹配IPv4地址' },
  { name: '域名', category: '互联网', regex: '^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$', description: '匹配域名' },

  // 编程相关
  { name: '数字', category: '编程', regex: '^-?\\d+(\\.\\d+)?$', description: '匹配整数和小数' },
  { name: '整数', category: '编程', regex: '^-?\\d+$', description: '匹配整数' },
  { name: '正整数', category: '编程', regex: '^[1-9]\\d*$', description: '匹配正整数' },
  { name: '十六进制颜色', category: '编程', regex: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', description: '匹配十六进制颜色值' },
  { name: '时间格式', category: '编程', regex: '^([01]?\\d|2[0-3]):[0-5]\\d:[0-5]\\d$', description: '匹配HH:MM:SS格式时间' },
  { name: '日期格式', category: '编程', regex: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', description: '匹配YYYY-MM-DD格式日期' },

  // 文本处理
  { name: '中文字符', category: '文本', regex: '^[\\u4e00-\\u9fa5]+$', description: '匹配中文字符' },
  { name: '空白行', category: '文本', regex: '^\\s*$', description: '匹配空白行' },
  { name: 'HTML标签', category: '文本', regex: '<[^>]+>', description: '匹配HTML标签' },
  { name: '用户名', category: '文本', regex: '^[a-zA-Z][a-zA-Z0-9_]{4,15}$', description: '匹配用户名（字母开头，5-16位）' },
  { name: '密码强度', category: '文本', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', description: '至少8位，包含大小写字母和数字' }
]

const filteredPatterns = computed(() => {
  if (!searchPattern.value) return commonPatterns

  const search = searchPattern.value.toLowerCase()
  return commonPatterns.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.category.toLowerCase().includes(search) ||
    p.description.toLowerCase().includes(search)
  )
})

const testRegex = () => {
  if (!regexPattern.value || !testString.value) {
    matches.value = []
    regexError.value = ''
    return
  }

  try {
    const flag = flags.value.join('')
    const regex = new RegExp(regexPattern.value, flag)

    if (flag.includes('g')) {
      const allMatches = [...testString.value.matchAll(new RegExp(regexPattern.value, flag))]
      matches.value = allMatches
    } else {
      const match = testString.value.match(regex)
      matches.value = match ? [match] : []
    }

    regexError.value = ''
  } catch (error: any) {
    regexError.value = error.message
    matches.value = []
  }
}

const highlightedText = computed(() => {
  if (!testString.value || matches.value.length === 0) {
    return testString.value
  }

  let html = testString.value
  const positions: Array<{ start: number; end: number }> = []

  matches.value.forEach(match => {
    if (match.index !== undefined) {
      positions.push({
        start: match.index,
        end: match.index + match[0].length
      })
    }
  })

  // 从后向前替换，避免索引偏移
  positions.sort((a, b) => b.start - a.start)

  positions.forEach(pos => {
    const matched = html.substring(pos.start, pos.end)
    html = html.substring(0, pos.start) +
      `<mark class="highlight">${matched}</mark>` +
      html.substring(pos.end)
  })

  return html.replace(/\n/g, '<br>')
})

const matchDetails = computed(() => {
  return matches.value.map((match, index) => ({
    index: index + 1,
    match: match[0],
    start: match.index || 0,
    end: (match.index || 0) + match[0].length
  }))
})

const usePattern = (pattern: Pattern) => {
  regexPattern.value = pattern.regex
  flags.value = ['g']
  activeTab.value = 'test'
  testRegex()
  ElMessage.success(`已应用: ${pattern.name}`)
}
</script>

<style scoped>
.regex-tabs {
  display: flex;
  flex-direction: column;
}

.regex-tabs :deep(.el-tabs--border-card) {
  background-color: transparent !important;
  border: none !important;
}

.regex-tabs :deep(.el-tabs__header) {
  background-color: transparent !important;
  border-bottom: 1px solid var(--glass-border) !important;
}

.regex-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.regex-tabs :deep(.el-tabs__item) {
  background-color: transparent !important;
  border: none !important;
  color: var(--text-color) !important;
}

.regex-tabs :deep(.el-tabs__item.is-active) {
  border: none !important;
  color: #67C23A !important;
}

.regex-tabs :deep(.el-tabs__item:hover) {
  color: #67C23A !important;
}

.regex-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow-y: auto;
  background-color: transparent !important;
  border: none !important;
}

.regex-tabs :deep(.el-tab-pane) {
  background-color: transparent !important;
}

.input-group {
  margin-bottom: 16px;
}

.flags-input {
  display: flex;
  gap: 4px;
}

.error-message {
  margin-bottom: 16px;
}

.test-input {
  margin-bottom: 16px;
}

.result-display {
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  margin-bottom: 16px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--glass-border);
  font-size: 13px;
  color: var(--text-color);
}

.result-content {
  padding: 12px;
  min-height: 100px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
  white-space: pre-wrap;
}

.result-content :deep(.highlight) {
  background: #67C23A;
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
}

.match-details h4 {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--text-color);
}

.patterns-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.pattern-item {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: all 0.3s;
}

.pattern-item:hover {
  border-color: #67C23A;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.2);
}

.pattern-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pattern-name {
  font-weight: 500;
  font-size: 14px;
  color: var(--text-color);
}

.pattern-code {
  display: block;
  padding: 8px;
  background: var(--bg-color);
  border-radius: 4px;
  font-size: 12px;
  color: #67C23A;
  margin: 8px 0;
  word-break: break-all;
}

.pattern-desc {
  margin: 0;
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.tutorial-content {
  padding: 8px 0;
}

.syntax-table {
  width: 100%;
  border-collapse: collapse;
}

.syntax-table th,
.syntax-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--glass-border);
}

.syntax-table th {
  font-weight: 500;
  font-size: 13px;
  color: var(--text-color);
  background: var(--bg-color);
}

.syntax-table td {
  font-size: 12px;
  color: var(--text-color);
}

.syntax-table code {
  padding: 2px 6px;
  background: var(--bg-color);
  border-radius: 3px;
  font-size: 12px;
  color: #67C23A;
}

:deep(.el-collapse-item__header) {
  background-color: transparent !important;
}

:deep(.el-collapse-item__wrap) {
  background-color: transparent !important;
}
</style>
