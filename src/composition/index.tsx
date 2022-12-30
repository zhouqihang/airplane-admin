import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompositionLayout from './Layout';
import 'antd/dist/antd.css';
import '../assets/styles/common.scss';
import { IProjectConf } from '../types/projects';
import PageRender from './PageRender';


interface ICompositionProps {
  config?: IProjectConf;
}
export default function Composition(props: ICompositionProps) {

  function renderPages() {
    let pages: IProjectConf["pagesConfig"]["children"] = [];
    if (props.config && props.config.pagesConfig.children) {
      pages = props.config.pagesConfig.children
    }
    return pages.map((page) => {
      return (
        <Route key={page.pageRouter} path={formatPath(page.pagePath)} element={<PageRender tree={page.jsonConfig.components} />} />
      )
    })
  }

  function getPagePathByPageId(pageId: number) {
    const page = props.config?.pagesConfig.children.find(page => page.id === pageId);
    return page?.pagePath || '';
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:projectId" element={<CompositionLayout menus={props.config?.menusConfig.children} getPagePath={getPagePathByPageId} />}>
          {renderPages()}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/**
 * 将页面路径前面的'/'删除
 * eg: /path/sub -> path/sub
 * @param path 
 * @returns 
 */
function formatPath(path: string) {
  if (path.startsWith('/')) {
    return path.replace('/', '');
  }
  return path;
}