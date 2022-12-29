import React, { useEffect, useState } from 'react';
import EditorHeader from './Header';
import EditorComponents from './Components';
import EditorPlayground from './Playground';
import EditorConfig from './Config';
import { editorContext, ITreeItem } from './editorContext';
import './index.scss';
import componentMap, { componentTypeKeys } from './componentMap';
import { getConfById } from '../../apis/pageConfig';
import { useParams, useRoutes, useSearchParams } from 'react-router-dom';

interface IPageEditorProps {
  tree?: ITreeItem[];
}
function PageEditor(props: IPageEditorProps) {

  const root: ITreeItem = createComponent('container', 'root');
  const params = useParams();
  const [query] = useSearchParams();
  const [editorState, setEditorState] = useState({
    currentActiveComponentId: 'root',
    tree: [root]
  });
  const [cache, setCache] = useState<Record<string, ITreeItem>>({
    root
  });

  /**
   * 获取当前页面已有配置，并将配置组件化
   */
  useEffect(function () {
    let promise: Promise<ITreeItem[]>;
    if (props.tree) {
      promise = Promise.resolve(props.tree)
    }
    else {
      promise = getConfById<ITreeItem>(params.projectId as string, params.pageId as string, query.get('confId') || '')
        .then((res) => res.data.jsonConfig.components)
    }
    promise.then(res => {
      setEditorState({
        ...editorState,
        tree: res
      })
      setCache(initTreeCache(res, {}))
    })
  }, [params.pageId, params.projectId, query])

  /**
   * 添加组件
   * @param type 
   * @returns 
   */
  function addComponent(type: componentTypeKeys) {
    const parent = cache[editorState.currentActiveComponentId];
    if (!parent) return;
    if (!canAddToParent(parent.type, type)) return;
    const item = createComponent(type);
    parent.children.push(item)
    setCache({
      ...cache,
      [item.componentId]: item
    })
    setEditorState({ ...editorState });
  }

  /**
   * 更新组件props
   * @param props 
   * @returns 
   */
  function updateProps(props: any) {
    const parent = cache[editorState.currentActiveComponentId];
    if (!parent) return;
    parent.props = props;
    setEditorState({ ...editorState });
  }

  /**
   * 点击playground中的组件
   */
  function componentActiveHandler(componentId: string) {
    setEditorState({
      ...editorState,
      currentActiveComponentId: componentId
    })
  }

  return (
    <editorContext.Provider value={{ editorState, setEditorState }}>
      <div className="editor">
        <EditorHeader></EditorHeader>
        <div className="editor-main">
          <EditorComponents onAdd={addComponent}/>
          <EditorPlayground onComponentActive={componentActiveHandler} />
          <EditorConfig
            type={cache[editorState.currentActiveComponentId].type}
            activeId={editorState.currentActiveComponentId}
            activeProps={cache[editorState.currentActiveComponentId].props}
            onPropsChange={updateProps}
          />
        </div>
      </div>
    </editorContext.Provider>
  )
}

export default PageEditor;

/**
 * 根据 type 生成一个组件配置结构
 * @param type 
 * @param id 
 * @returns 
 */
function createComponent(type: componentTypeKeys, id = Date.now().toString()) {
  return {
    componentId: id,
    type,
    props: componentMap[type].defaultProps,
    children: []
  }
}

/**
 * 判断一个组件是否能被添加到当前活跃组件
 * @param parentType 
 * @param childType 
 * @returns 
 */
function canAddToParent(parentType: componentTypeKeys, childType: componentTypeKeys) {
  const contains = componentMap[parentType].contains;
  return (contains as componentTypeKeys[]).includes(childType);
}

/**
 * 从已有配置生成cache
 * @param tree 
 * @param cache 
 * @returns 
 */
function initTreeCache(tree: ITreeItem[], cache: Record<string, ITreeItem>) {
  tree.forEach(item => {
    cache[item.componentId] = item;
    if (item.children && item.children.length) {
      initTreeCache(item.children, cache);
    }
  })
  return cache;
}