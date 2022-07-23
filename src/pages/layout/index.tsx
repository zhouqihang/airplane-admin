import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Menus from './Menus';
import './index.scss';

const { Sider, Header, Content } = Layout;

function LayoutPage() {
  return (
    <Layout className="air-layout">
      <Sider>
        <Menus />
      </Sider>
      <Layout>
        <Header></Header>
        <Content className="air-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage;