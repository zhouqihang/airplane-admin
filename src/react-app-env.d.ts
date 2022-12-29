/// <reference types="react-scripts" />

interface Window {
  __AIRPLANE_ENV: {
    IN_EDITOR: boolean; // 是否处于编辑模式
    IS_PREVIEW: boolean; // 是否处于预览模式
    IS_BUILDER: boolean; // 是否处于正式版构建模式
  }
}