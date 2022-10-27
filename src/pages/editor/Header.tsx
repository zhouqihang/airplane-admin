import { Button } from 'antd';
import React from 'react';
import './header.scss';

function EditorHeader() {
  return (
    <div className="editor-header p-x-16">
      <Button>返回上一页</Button>
      <div className="m-l-auto">
        <Button type="primary">保存</Button>
        <Button type="primary">发布</Button>
      </div>
    </div>
  )
}

export default EditorHeader;