export const plugins = {
  'postcss-px-to-viewport-8-plugin': {
    viewportWidth: 750, // 设计稿的视口宽度（你的 index.vue 是按 750 算的）
    unitPrecision: 3, // 转换后的精度，保留 3 位小数
    viewportUnit: 'vw', // 希望使用的单位
    selectorBlackList: ['.ignore'], // 哪些类名不进行转换
    minPixelValue: 1, // 小于或等于 1px 不转换
    mediaQuery: false, // 是否允许在媒体查询中转换 px
  },
};