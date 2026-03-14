<template>
  <el-container :class="{ 'dark-mode': isDark }">
    <!-- 移动端顶部导航栏 -->
    <div class="mobile-header" v-if="isMobile">
      <el-button
        class="menu-btn"
        :icon="Menu"
        @click="drawerVisible = true"
        circle
      />
      <h1 class="mobile-title">工具箱</h1>
      <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleDark"
        size="small"
      />
    </div>

    <!-- PC端侧边栏 -->
    <el-aside v-if="!isMobile" width="200px">
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
              <el-menu-item index="/markdown-preview">Markdown预览</el-menu-item>
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

    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      :size="280"
      :show-close="false"
      class="mobile-drawer"
    >
      <div class="drawer-content">
        <el-menu
          :default-active="activeMenu"
          router
          @select="handleMenuSelect"
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
            <el-menu-item index="/markdown-preview">Markdown预览</el-menu-item>
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
      </div>
    </el-drawer>
    
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Moon, Sunny, Tools, Menu } from '@element-plus/icons-vue'

const route = useRoute()
const isDark = ref(false)
const isMobile = ref(false)
const drawerVisible = ref(false)

const activeMenu = computed(() => route.path)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const toggleDark = (value: boolean) => {
  if (value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const handleMenuSelect = () => {
  drawerVisible.value = false
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
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

/* 移动端顶部导航栏 */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-shadow: var(--glass-shadow);
}

.menu-btn {
  background: transparent !important;
  border: 1px solid var(--glass-border) !important;
  color: var(--text-color) !important;
}

.mobile-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

/* 移动端抽屉菜单样式 */
.drawer-content {
  height: 100%;
  padding: 20px 0;
}

.drawer-content .el-menu {
  border-right: none;
}

.drawer-content .el-menu-item {
  color: var(--aside-text);
  border-radius: 6px;
  margin: 4px 8px;
  height: 48px;
  line-height: 48px;
}

.drawer-content .el-sub-menu__title {
  color: var(--aside-text);
  border-radius: 6px;
  margin: 4px 8px;
  height: 52px;
  line-height: 52px;
}

/* 移动端布局调整 */
@media (max-width: 768px) {
  .el-container {
    padding-top: 72px !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-bottom: 8px !important;
    gap: 8px;
  }
  
  .el-aside {
    display: none;
  }
  
  .el-main {
    padding: 12px !important;
  }
}

/* 移动端抽屉菜单全局样式 */
:deep(.mobile-drawer) {
  background: var(--glass-bg) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

:deep(.mobile-drawer .el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--glass-border);
}

:deep(.mobile-drawer .el-drawer__body) {
  padding: 0;
}
</style>
