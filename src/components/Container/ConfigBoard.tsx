import { Tabs } from 'antd';
import React from 'react';

export default function ContainerConfigBoard() {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="项目 1" key="item-1">
          内容 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="项目 2" key="item-2">
          内容 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}