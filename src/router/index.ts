import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/pdf-to-image'
  },
  {
    path: '/pdf-to-image',
    name: 'PdfToImage',
    component: () => import('@/views/PdfToImage.vue'),
    meta: { title: 'PDF转图片' }
  },
  {
    path: '/image-watermark',
    name: 'ImageWatermark',
    component: () => import('@/views/ImageWatermark.vue'),
    meta: { title: '图片水印' }
  },
  {
    path: '/color-picker',
    name: 'ColorPicker',
    component: () => import('@/views/ColorPicker.vue'),
    meta: { title: '颜色工具' }
  },
  {
    path: '/image-to-pdf',
    name: 'ImageToPdf',
    component: () => import('@/views/ImageToPdf.vue'),
    meta: { title: '图片合并PDF' }
  },
  {
    path: '/image-compress',
    name: 'ImageCompress',
    component: () => import('@/views/ImageCompress.vue'),
    meta: { title: '图片压缩' }
  },
  {
    path: '/image-crop',
    name: 'ImageCrop',
    component: () => import('@/views/ImageCrop.vue'),
    meta: { title: '图片剪裁' }
  },
  {
    path: '/image-format',
    name: 'ImageFormat',
    component: () => import('@/views/ImageFormat.vue'),
    meta: { title: '图片格式转换' }
  },
  {
    path: '/image-base64',
    name: 'ImageBase64',
    component: () => import('@/views/ImageBase64.vue'),
    meta: { title: '图片Base64转换' }
  },
  {
    path: '/password-generator',
    name: 'PasswordGenerator',
    component: () => import('@/views/PasswordGenerator.vue'),
    meta: { title: '密码生成器' }
  },
  {
    path: '/pdf-add-page-number',
    name: 'PdfAddPageNumber',
    component: () => import('@/views/PdfAddPageNumber.vue'),
    meta: { title: 'PDF添加页码' }
  },
  {
    path: '/lorem-generator',
    name: 'LoremGenerator',
    component: () => import('@/views/LoremGenerator.vue'),
    meta: { title: '占位文本生成' }
  },
  {
    path: '/regex-tester',
    name: 'RegexTester',
    component: () => import('@/views/RegexTester.vue'),
    meta: { title: '正则表达式测试' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 工具箱` : '工具箱'
  next()
})

export default router
