import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory('/toolkit/'),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 工具箱` : '工具箱'
  next()
})

export default router
