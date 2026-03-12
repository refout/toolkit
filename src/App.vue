<template>
  <el-container :class="{ 'dark-mode': isDark }">
    <el-aside width="200px">
      <div class="sidebar-content">
        <el-menu
          :default-active="activeMenu"
          router
        >
          <el-menu-item index="/pdf-to-image">
            <el-icon><Document /></el-icon>
            <span>PDF转图片</span>
          </el-menu-item>
          
          <el-menu-item index="/image-watermark">
            <el-icon><PictureFilled /></el-icon>
            <span>图片水印</span>
          </el-menu-item>
          
          <el-menu-item index="/color-picker">
            <el-icon><Brush /></el-icon>
            <span>颜色工具</span>
          </el-menu-item>
          
          <el-menu-item index="/image-to-pdf">
            <el-icon><Files /></el-icon>
            <span>图片合并PDF</span>
          </el-menu-item>
        </el-menu>
        
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
import { Moon, Sunny } from '@element-plus/icons-vue'

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
  justify-content: space-between;
}

.el-menu {
  border-right: none;
  background-color: transparent;
}

.el-menu .el-menu-item {
  color: var(--aside-text);
  border-radius: 6px;
  margin: 4px 8px;
}

.el-menu .el-menu-item:hover {
  background-color: var(--menu-hover-bg);
}

.el-menu .el-menu-item.is-active {
  background-color: var(--menu-active-bg);
  color: var(--menu-active-text) !important;
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
