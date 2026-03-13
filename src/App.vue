<template>
  <el-container :class="{ 'dark-mode': isDark }">
    <el-aside width="200px">
      <div class="sidebar-content">
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            router
          >
            <!-- PDF工具 -->
            <el-sub-menu index="pdf">
              <template #title>
                <el-icon><Document /></el-icon>
                <span>PDF工具</span>
              </template>
              <el-menu-item index="/pdf-to-image">PDF转图片</el-menu-item>
              <el-menu-item index="/pdf-add-page-number">PDF添加页码</el-menu-item>
              <el-menu-item index="/image-to-pdf">图片合并PDF</el-menu-item>
            </el-sub-menu>
            
            <!-- 图片工具 -->
            <el-sub-menu index="image">
              <template #title>
                <el-icon><PictureFilled /></el-icon>
                <span>图片工具</span>
              </template>
              <el-menu-item index="/image-watermark">图片水印</el-menu-item>
              <el-menu-item index="/image-compress">图片压缩</el-menu-item>
              <el-menu-item index="/image-crop">图片剪裁</el-menu-item>
              <el-menu-item index="/image-format">图片格式转换</el-menu-item>
              <el-menu-item index="/image-base64">图片Base64转换</el-menu-item>
            </el-sub-menu>
            
            <!-- 文本工具 -->
            <el-sub-menu index="text">
              <template #title>
                <el-icon><DocumentCopy /></el-icon>
                <span>文本工具</span>
              </template>
              <el-menu-item index="/lorem-generator">占位文本生成</el-menu-item>
              <el-menu-item index="/regex-tester">正则表达式测试</el-menu-item>
            </el-sub-menu>
            
            <!-- 其他工具 -->
            <el-sub-menu index="other">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>其他工具</span>
              </template>
              <el-menu-item index="/color-picker">颜色工具</el-menu-item>
              <el-menu-item index="/password-generator">密码生成器</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
        
        <div class="theme-switch">
          <el-switch
            v-model="isDark"
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="toggleDark"
          />
        </div>
      </div>
    </el-aside>
    
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Moon, Sunny, Tools } from '@element-plus/icons-vue'

const route = useRoute()
const isDark = ref(false)

const activeMenu = computed(() => route.path)

const toggleDark = (value: boolean) => {
  if (value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-scrollbar {
  flex: 1;
}

.el-menu {
  border-right: none;
  background-color: transparent;
}

.el-menu .el-menu-item {
  color: var(--aside-text);
  border-radius: 6px;
  margin: 4px 8px;
  height: 40px;
  line-height: 40px;
}

.el-menu .el-sub-menu__title {
  color: var(--aside-text);
  border-radius: 6px;
  margin: 4px 8px;
  height: 44px;
  line-height: 44px;
}

.el-menu .el-menu-item:hover,
.el-menu .el-sub-menu__title:hover {
  background-color: var(--menu-hover-bg);
}

.el-menu .el-menu-item.is-active .el-icon {
  color: var(--menu-active-text) !important;
}

:deep(.el-menu-item.is-active) {
  background-color: var(--menu-active-bg) !important;
  color: var(--menu-active-text) !important;
}

.theme-switch {
  padding: 16px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--glass-border);
}
</style>
