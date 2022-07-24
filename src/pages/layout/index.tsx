import React from 'react';
import { Outlet } from 'react-router-dom';
import { Dropdown, Layout, Menu } from 'antd';
import Menus from './Menus';
import { useCurrentUser } from '../../apis/users';
import { logout } from '../../apis/auth';
import './index.scss';

const { Sider, Header, Content } = Layout;

function LayoutPage() {

  const user = useCurrentUser();

  const userMenu = (
    <Menu items={[
      {
        key: 'logout',
        label: (<a onClick={logout}>注销</a>)
      }
    ]} />
  )

  return (
    <Layout className="air-layout">
      <Sider>
        <Menus />
      </Sider>
      <Layout>
        <Header className="air-layout__header">
          <span></span>
          <Dropdown overlay={userMenu}>
            <a>{user?.username}</a>
          </Dropdown>
        </Header>
        <Content className="air-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage;