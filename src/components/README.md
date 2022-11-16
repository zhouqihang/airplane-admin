# 添加新组件

## 创建组件文件

1. 创建组件文件夹 `example`
2. 创建组件文件 `Component.tsx`
3. 创建组件配置文件 `ConfigBoard.tsx`
4. 创建入口文件 `index.ts`

## 各文件作用

### Component.tsx

`Component.tsx` 文件是组件文件，组件相关的业务逻辑都在这个文件处理；在发布时，这个文件会被构建到最终的项目中去。

### ConfigBoard.tsx

`ConfigBoard.tsx` 文件是组件在编辑器中显示的配置组件，作用是在编辑器中配置组件并生成参数。在后续的发布和构建中不用使用到这个组件。

### index.ts

`index.ts` 文件是组件的入口文件，文件导出一个默认对象，结构如下：

``` javascript
export default {
  Component: ExampleComponent,
  ConfigBoard: ExampleConfigBoard,
  EditorComponent: HOCEditorContainer(ExampleComponent)({}),
  defaultProps: {
    style: {
      margin: '0px'
    },
    content: 'content param',
    type: 'type param'
  },
  contains: []
}
```

#### 属性说明
* `Component` ：要添加的组件。
* `ConfigBoard` ：编辑配置组件。
* `EditorComponent` ：编辑器中使用和渲染的组件。这是一个高阶组件，其中包含了组件在编辑器中的选中、props预处理等能力。
* `defaultProps` ：配置组件的默认属性。
* `contains` ：可作为当前组件的子组件类型，比如将 `Container` 组件的这个属性设置为 `['example']` ，那么就可以将 `Example` 组件添加到 `Container` 组件中（成为子组件）。

## 最后添加到编辑器

找到 `/src/pages/editor/componentMap.ts` 文件，将组件的入口文件添加到默认导出的 `componentMap` 对象，同时在 `componentTable` 变量中添加组件名即可。